import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Joystick from '../utils/joystick.tsx';
import Camera from '../utils/camera.tsx';
import Klaxon from '../utils/klaxonButton.tsx';
import io from 'socket.io-client';
import {socketUrl} from '../config.json';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../types/types.ts';
import {useSelector} from 'react-redux';
import {RootState} from '../reducer/store.tsx';
import {apiUrlBack} from '../config.json';
import {WebSocketProvider} from '../context/WebSocketContext.tsx';
import colors from '../assets/styles/colors.tsx';

type TrackRaceScreenProp = RouteProp<RootStackParamList, 'TrackRace'>;
const TrackRaceScreen = () => {
  const route = useRoute<TrackRaceScreenProp>();

  return (
    <WebSocketProvider camera={true} track={true} nbPlayer={''}>
      <View style={styles.klaxon}>
        <Klaxon />
      </View>
      <View style={styles.camera}>
        <Camera />
      </View>
    </WebSocketProvider>
  );
};

const styles = StyleSheet.create({
  joystick: {
    zIndex: 2,
    width: 'auto',
    backgroundColor: colors.black,
    position: 'absolute',
    bottom: '10%',
    left: '5%',
  },
  klaxon: {
    zIndex: 2,
    backgroundColor: 'yellow',
    position: 'absolute',
    bottom: '10%',
    right: '5%',
    width: '20%',
  },
  camera: {
    zIndex: 1,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    backgroundColor: 'red',
    top: 0,
    left: 0,
  },
});

export default TrackRaceScreen;
