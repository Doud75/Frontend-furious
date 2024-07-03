import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ControlScreen from '../screens/ControlScreen.tsx';
import LoginScreen from '../screens/LoginScreen.tsx';
import {Provider} from 'react-redux';
import store from '../reducer/store.tsx';
import RacingScreen from '../screens/RacingScreen.tsx';
import HomeScreen from '../screens/HomeScreen.tsx';
import CustomScreen from '../screens/CustomScreen.tsx'; // Importer WebSocketProvider

const Stack = createNativeStackNavigator();

export default function () {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="FreeRace" component={ControlScreen} />
          <Stack.Screen name="Racing" component={RacingScreen} />
          <Stack.Screen name="Custom" component={CustomScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
