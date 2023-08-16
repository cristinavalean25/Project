/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {PersistGate} from 'reduxjs-toolkit-persist/integration/react';
import Home from './src/components/Home';
import ProductPage from './src/Produse/ProductPage';
import Login from './src/components/Login';
import Register from './src/components/Register';
import UserProfile from './src/components/UserProfile';
import {store, persistor} from './src/redux/store';

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProductPage"
              component={ProductPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserProfile"
              component={UserProfile}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
