import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import ContactScreen from './src/screens/ContactScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) 
            {
              case 'Inicio':    iconName = 'home'; break;
              case 'Acerca de': iconName = 'info-circle'; break;
              case 'Contacto':  iconName = 'envelope'; break;            
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#FF6F61',
          inactiveTintColor: '#BEBEBE',
          style: {
            backgroundColor: '#F5DEB3',
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Acerca de" component={AboutScreen} />
        <Tab.Screen name="Contacto" component={ContactScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5DEB3',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
});

export default App;
