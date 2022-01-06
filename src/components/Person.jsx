import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, Button  } from "react-native";
import { GetPersonByID } from '../api/tmdb';

import DisplayError from '../components/DisplayError';
import Toast from 'react-native-root-toast';

const Person = ({route, favPersons, dispatch}) => {
    const { id } = route.params;
    const [person, setPerson] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    
    const getPersonData = async () => {
        try {
            const PersonData = await GetPersonByID(id);
            setPerson(PersonData);
            setIsLoading(false);
        } catch (error) {
            setIsError(true);
        }
    };

    useEffect(() => {
        getPersonData();
    }, []);

    const savePerson = async () => {
        const action = { type: 'SAVE_PERSON', value: route.params.personID };
        dispatch(action);
        Toast.show('Personne ajouté aux favoris', {
          duration: Toast.durations.LONG,
        });
    }
    
    const unsavePerson= async () => {
        const action = { type: 'UNSAVE_PERSON', value: route.params.personID };
        dispatch(action);
        Toast.show('Personne retiré des favoris', {
            duration: Toast.durations.LONG,
        });
    }

    const displaySavePerson = () => {
        if (favPersons.findIndex(i => i === route.params.personID) !== -1) {
            return ( 
                <Button title='Retirer des favoris' onPress={unsavePerson} /> 
            );
        }
        return ( 
            <Button title='Ajouter aux favoris' onPress={savePerson} /> 
        );
      }

    return(
        <View style={styles.container}>
        {
            isError ?
            (<DisplayError message='Impossible de récupérer les données de la personne' />) :
                (isLoading ?
                (<View style={styles.containerLoading}>
                    <ActivityIndicator size="large" />
                </View>) :

                (<ScrollView style={styles.containerScroll}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>{person.name}</Text>
                    {displaySavePerson}
                    <Text style={{fontWeight: 'bold', fontSize: 12}}>Birth : </Text>
                    <Text>{person.birthday}</Text>

                    <Text style={{fontWeight: 'bold', fontSize: 12}}>Death : </Text>
                    <Text>{person.deathday}</Text>

                    <Text style={{fontWeight: 'bold', fontSize: 12}}>Play in : </Text>
                    <Text></Text>

                    <Text style={{fontWeight: 'bold', fontSize: 12}}>Bio : </Text>
                    <Text>{person.biography}</Text>
                </ScrollView>)
            )
        }
        </View>
    );
}

export default Person;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: 8,
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    containerScroll: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 16,
    },
});