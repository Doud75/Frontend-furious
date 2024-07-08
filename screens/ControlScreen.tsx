import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Joystick from '../utils/joystick.tsx';
import Camera from '../utils/camera.tsx';
import {WebSocketProvider} from '../context/WebSocketContext.tsx';
import Klaxon from '../utils/klaxonButton.tsx';
import io from 'socket.io-client';
import config from '../config.json';

const ControlScreen = () => {
  useEffect(() => {
    console.log('webSocket started on ', config.socketUrl);
    const socket = io('config.socketUrl');

    socket.emit('joinGroup', 'idCourse');

    socket.on('newMessage', message => {
      console.log(message);
      console.log('from Control Screen');
    });
    return () => {
      console.log('return');
      socket.disconnect();
    };
  }, []);

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
