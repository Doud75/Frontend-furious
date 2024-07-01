import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from '../screens/HomePage.tsx';

const Stack = createNativeStackNavigator();

export default function () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Control">
        <Stack.Screen name="Control" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
