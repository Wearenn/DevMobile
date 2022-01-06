import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import Search from '../components/Search';
import FavPersons from '../components/FavPersons';

const SearchNavigation = createStackNavigator();
const FavNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

function searchStackScreens() {
  return (
    <SearchNavigation.Navigator
      initialRouteName="ViewSearch"
    >
      <SearchNavigation.Screen
        name="Rechercher"
        component={Search}
        options={{ title: 'Recherche' }}
      />
      <SearchNavigation.Screen
        name="Personnes"
        component={Person}
        options={{ title: 'Personnes' }}
      />
    </SearchNavigation.Navigator>
  )
};

function favStackScreens() {
  return (
    <FavNavigation.Navigator
      initialRouteName="ViewFav"
    >
      <FavNavigation.Screen
        name="ViewFav"
        component={FavPersons}
        options={{ title: 'Favoris' }}
      />
      <SearchNavigation.Screen
        name="Personnes"
        component={Person}
        options={{ title: 'Personnes' }}
      />
    </FavNavigation.Navigator>
  )
}

function RootStack() {
  return (
    <TabNavigation.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.mainGreen,
        headerShown: false
      }}>
      <TabNavigation.Screen
        name="Recherche"
        component={searchStackScreens}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return <Image source={Assets.icons.search} style={{ tintColor: color }} />;
          }
        })}
      />
      <TabNavigation.Screen
        name="Favoris"
        component={favStackScreens}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return <Image source={Assets.icons.favFull} style={{ tintColor: color }} />;
          }
        })}
      />
    </TabNavigation.Navigator>
  );
}

export default RootStack;