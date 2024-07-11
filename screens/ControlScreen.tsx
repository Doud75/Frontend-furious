import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Joystick from '../utils/joystick.tsx';
import Camera from '../utils/camera.tsx';
import {useWebSocket, WebSocketProvider} from '../context/WebSocketContext.tsx';
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
  return (
    <WebSocketProvider camera={true}>
      <_ControlScreen />
    </WebSocketProvider>
  );
};

const _ControlScreen = () => {
  const formData = useSelector((state: RootState) => state.formData);
  const route = useRoute<ControlScreenRouteProp>();
  const {raceId} = route.params;
  const [ws] = useWebSocket();
  useEffect(() => {
    const socket = io(socketUrl);
    console.log('socketUrl from Control', formData.username, socketUrl);

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
          console.log('response from Control', data);
          if (data.numberOfPlayer == 1) {
            console.log('je suis dans le if');
            if (ws && ws.readyState === WebSocket.OPEN) {
              const message = {
                cmd: 4,
                data: 1,
              };
              ws.send(JSON.stringify(message));
              let itemValue =
                data.numberOfPlayer === '1' ? [1, 255, 0, 0] : [1, 0, 0, 255];
              while (itemValue[0] <= 2048) {
                const message = {
                  cmd: 5,
                  data: itemValue,
                };
                ws.send(JSON.stringify(message));
                itemValue[0] = itemValue[0] * 2;
              }
            }
          }
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
    <>
      <View style={styles.container}>
        <Joystick radius={100} innerRadius={80} />
        <Klaxon />
      </View>
      <View style={styles.camera}>
        <Camera />
      </View>
    </>
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
