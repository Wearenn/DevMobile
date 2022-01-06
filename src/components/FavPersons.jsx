import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const FavPersons = ({navigation}) => {


  return (
    <View style={styles.container}>
      <Text>Coucou</Text>
    </View>
  );
};

export default FavPersons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
});