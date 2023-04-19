import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HEADER_TITLE } from './src/constants/HeaderConstants';
import HomeScreen from './src/screens/HomeScreen';
import ItemForm from './src/screens/ItemForm';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: HEADER_TITLE }}
        />
        <Stack.Screen
          name="NewItem"
          component={ItemForm}
          options={{ title: 'Agregar Item' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;