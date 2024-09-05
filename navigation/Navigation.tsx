import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ControlScreen from '../screens/ControlScreen.tsx';
import AutoScreen from '../screens/AutoScreen.tsx';
import LoginScreen from '../screens/LoginScreen.tsx';
import {Provider} from 'react-redux';
import store from '../reducer/store.tsx';
import RacingScreen from '../screens/RacingScreen.tsx';
import RacingFormScreen from '../screens/RacingFormScreen.tsx';
import HomeScreen from '../screens/HomeScreen.tsx';
import CustomScreen from '../screens/CustomScreen.tsx';
import {RootStackParamList} from '../types/types.ts';
import RaceList from '../screens/RaceList.tsx';
import PlayerScreen from '../screens/PlayerScreen.tsx';
import RefereeScreen from '../screens/RefereeScreen.tsx';
import TrackRaceScreen from '../screens/TrackRaceScreen.tsx';
import StatisticsScreen from '../screens/StatisticsScreen.tsx';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function () {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Player" component={PlayerScreen} />
          <Stack.Screen name="Referee" component={RefereeScreen} />
          <Stack.Screen name="FreeRace" component={ControlScreen} />
          <Stack.Screen name="AutoRace" component={AutoScreen} />
          <Stack.Screen name="RacingForm" component={RacingFormScreen} />
          <Stack.Screen name="Racing" component={RacingScreen} />
          <Stack.Screen name="Custom" component={CustomScreen} />
          <Stack.Screen name="RaceList" component={RaceList} />
          <Stack.Screen name="TrackRace" component={TrackRaceScreen} />
          <Stack.Screen name="Statistics" component={StatisticsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
