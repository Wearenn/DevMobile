import React from 'react';
import { View, StyleSheet} from 'react-native';
import { GetPersonByID } from '../api/tmdb';

const FavPersons = ({navigation, favPersons}) => {

	const [persons, setPersons] = useState([]);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		requestPersons();
	}, [favPersons]); 

	const requestPersons = async () => {
		setIsRefreshing(true);
		setIsError(false);
		try {
		  for (const id of favPersons) {
			const Result = await GetPersonByID(id)
			persons.push(Result);
		  }
		  setPersons(persons);
		} catch (error) {
		  setIsError(true);
		  setPersons([]);
		}
		setIsRefreshing(false);
	}

    const goToNextScreen = (id) => {
		navigation.navigate('Person', {
			id: id
		});
	}

    const amIaFavPerson = (personID) => {
        if (favPersons.findIndex(i => i === personID) !== -1) {
          return true;
        }
        return false;
    };

    return (
		<View style={styles.container}>
            {
                isError ?
                (<DisplayError message='Impossible de récupérer les personnes favorites' />) :
                (<FlatList
                    data={persons}
                    extraData={favPersons}
                    keyExtractor={(item) => item.person.id.toString()}
                    renderItem={({item}) => {
                        return(
                            <TouchableHighlight onPress={() => goToNextScreen(item.person.id)}>
                                <PersonListItem item={item.person} isFav={amIaFavPerson(item.person.id)}/>
                            </TouchableHighlight>
                        )
                    }}
                    refreshing={isRefreshing}
                    onRefresh={requestPersons}
                />)
            }
		</View>
	);
}

const mapStateToProps = (state) => {
    return {
      favPersons: state.favPersonsID
    }
}

export default connect(mapStateToProps)(FavPersons);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
});