import React, { useState } from "react";
import { View, TextInput, Button, FlatList, StyleSheet, TouchableHighlight } from 'react-native';

import { GetPerson } from '../api/tmdb';
import Colors from '../definition/Colors';
import PersonListItem from "./PersonListItem";

const Search = ({ navigation, favPersons }) => {

    const [persons, setPersons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
	const [nextOffset, setNextOffset] = useState(0);
	const [isMoreResults, setIsMoreResults] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isError, setIsError] = useState(false);

    const requestPersons = async (prevPersons, offset) => {
        setIsRefreshing(true);
        setIsError(false);
		try {
			const tmdbSearchResult = await GetPerson(searchTerm, offset);
			setPersons([...prevPersons, ...tmdbSearchResult.results]);
			if (tmdbSearchResult.results_start + tmdbSearchResult.results_shown < tmdbSearchResult.results_found) {
				setIsMoreResults(true);
				setNextOffset(tmdbSearchResult.results_start + tmdbSearchResult.results_shown);
			} else {
				setIsMoreResults(false);
			}
		} catch (error) {
			setIsError(true);
            setPersons([]);
            setIsMoreResults(true);
            setNextOffset(0);
		}
        setIsRefreshing(false);
	};

    const searchPersons = () => {
		requestPersons([], 0);
	};

	const loadMorePersons = () => {
		if (isMoreResults) {
			requestPersons(persons, nextOffset);
		}
	};

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
			<TextInput placeholder='Name...' style={styles.input} onChangeText={researchText => setSearchTerm(researchText)}/>
			<Button title='Rechercher' onPress={ searchPersons } color={Colors.mainGreen} />
			<View style={styles.separator} />
            {
                isError ?
                (<DisplayError message='Impossible de récupérer les personnes' />) :
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
                    onEndReached={ loadMorePersons }
                    onEndReachedThreshold={ 0.5 }
                    refreshing={isRefreshing}
                    onRefresh={searchPersons}
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

export default connect(mapStateToProps)(Search);

const styles = StyleSheet.create({
	container: {
		marginLeft: 20, 
		marginRight: 20
	},
    input: {
		height: 40,
		marginTop: 12,
		marginBottom: 12,
		marginLeft: 50, 
		marginRight: 50,
		borderWidth: 1,
		padding: 10,
	},
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
});