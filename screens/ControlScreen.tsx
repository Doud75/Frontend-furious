import React, { useEffect, useState } from "react";
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
import { WebSocketProvider } from "../context/WebSocketContext.tsx";
import colors from '../assets/styles/colors.tsx';

type ControlScreenRouteProp = RouteProp<RootStackParamList, 'FreeRace'>;
const ControlScreen = () => {
  const formData = useSelector((state: RootState) => state.formData);
  const route = useRoute<ControlScreenRouteProp>();
  const {raceId} = route.params;
  /*const [ws] = useWebSocket();*/
  const [nbPlayer, setnbPlayer] = useState('');
  useEffect(() => {
    if (raceId) {
      const socket = io(socketUrl);
      console.log('socketUrl from Control', formData.username, socketUrl);
      socket.emit('joinGroup', raceId);
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
          if (data.numberOfPlayer) {
            setnbPlayer(data.numberOfPlayer);
          }
        })
        .catch(error => {
          console.error('Erreur :', error);
        });

      socket.on('newMessage', message => {
        console.log(message);
        /*if (message.courseStatus === 'close') {
          console.log('je suis dans le close if');
          if (ws && ws.readyState === WebSocket.OPEN) {
            console.log('je suis dans le 2eme close if');
            const message = {
              cmd: 4,
              data: 0,
            };
            ws.send(JSON.stringify(message));
          }
        }*/
      });
      return () => {
        console.log('return');
        socket.disconnect();
      };
    }
  }, [formData, raceId]);

  return (
    <WebSocketProvider camera={true} nbPlayer={nbPlayer}>
        <View style={styles.joystick}>
          <Joystick radius={60} innerRadius={45} />
        </View>
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
    bottom: "10%",
    left: "5%",
  },
  klaxon: {
    zIndex: 2,
    backgroundColor: 'yellow',
    position: 'absolute',
    bottom: "10%",
    right: "5%",
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
    backgroundColor:'red',
    top: 0,
    left: 0,
  },
});

export default ControlScreen;
