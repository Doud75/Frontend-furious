import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Camera from '../utils/camera.tsx';
import Klaxon from '../utils/klaxonButton.tsx';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../types/types.ts';
import {WebSocketProvider} from '../context/WebSocketContext.tsx';
import colors from '../assets/styles/colors.tsx';
import ButtonAutoMode from '../components/buttons/ButtonAutoMode.tsx';
import ButtonLeave from '../components/buttons/ButtonLeave.tsx';

type TrackRaceScreenProp = RouteProp<RootStackParamList, 'TrackRace'>;

const TrackRaceScreen = () => {
  const route = useRoute<TrackRaceScreenProp>();
  const [track, setTrack] = useState(false);

  const handleAutoMode = () => {
    console.log(track);
    setTrack(!track);
  };

  return (
    <WebSocketProvider camera={true} track={true} nbPlayer="1">
      <View style={styles.leaveButton}>
        <ButtonLeave />
      </View>
      <TouchableOpacity style={styles.autoMode} onPress={handleAutoMode}>
        <ButtonAutoMode active={track} />
      </TouchableOpacity>

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
  leaveButton: {
    position: 'absolute',
    right: '5%',
    top: '5%',
    width: 'auto',
    zIndex: 2,
  },
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
    position: 'absolute',
    bottom: '10%',
    right: '5%',
    width: 70,
    height: 70,
  },
  autoMode: {
    zIndex: 2,
    width: 'auto',
    position: 'absolute',
    bottom: '9%',
    left: '5%',
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
