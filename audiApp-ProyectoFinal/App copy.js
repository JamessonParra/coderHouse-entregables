import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './src/screens/LoginFormScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddUserScreen from './src/screens/AddUserScreen';

import { store, persistor } from './src/store/store';

const Stack = createStackNavigator();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginForm} />
          <Stack.Screen name="Welcome" component={HomeScreen} />
          <Stack.Screen name="AddUser" component={AddUserScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default App;
