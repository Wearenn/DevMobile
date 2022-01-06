import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import Assets from '../definition/Assets';

const PersonListItem = ({item}) => {
    return (
        <View style={{ flexDirection: "row" , marginBottom: 10, marginTop: 10 }}>
            <Image style={{ width: 128, height: 128, borderRadius: 12}} source={Assets.icons.error}/>
            <View style={styles.container}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>{item.name}</Text>
                <Text style={{ marginTop: 10 }}>{item.known_for_department}</Text>
                <Text style={{ marginTop: 10 }}>{item.biography}</Text>
                <Text style={{ marginTop: 10 }}>{item.popularity}</Text>
            </View>
        </View>
    );
}

export default PersonListItem;

const styles = StyleSheet.create({
    container: {
        marginLeft: 20
    },
    text: {
        fontSize: 16
    }
});