import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Joystick from '../utils/joystick.tsx';
import Camera from '../utils/camera.tsx';
import {WebSocketProvider} from '../context/WebSocketContext.tsx';
import Klaxon from '../utils/klaxonButton.tsx';
import io from 'socket.io-client';
import {socketUrl} from '../config.json';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../types/types.ts';
import {useSelector} from 'react-redux';
import {RootState} from '../reducer/store.tsx';
import {apiUrlBack} from '../config.json';

type ControlScreenRouteProp = RouteProp<RootStackParamList, 'FreeRace'>;
const ControlScreen = () => {
  const formData = useSelector((state: RootState) => state.formData);
  const route = useRoute<ControlScreenRouteProp>();
  const {raceId} = route.params;
  useEffect(() => {
    const socket = io(socketUrl);
    console.log('socketUrl from Control', formData.name, socketUrl);

    socket.emit('joinGroup', raceId);

    if (raceId) {
      fetch(`${apiUrlBack}/join-race`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          raceId,
          formData,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Réponse HTTP : ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Erreur :', error);
        });
    }

    socket.on('newMessage', message => {
      console.log(message);
    });
    return () => {
      console.log('return');
      socket.disconnect();
    };
  }, [formData, raceId]);

  return (
    <WebSocketProvider camera={true}>
      <View style={styles.container}>
        <Joystick radius={100} innerRadius={80} />
        <Klaxon />
      </View>
      <View style={styles.camera}>
        <Camera />
      </View>
    </WebSocketProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
  },
  camera: {
    zIndex: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
  },
});

export default ControlScreen;
