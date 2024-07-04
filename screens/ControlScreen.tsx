import React from 'react';
import {View, StyleSheet} from 'react-native';
import Joystick from '../utils/joystick.tsx';
import Camera from '../utils/camera.tsx';
import {WebSocketProvider} from '../context/WebSocketContext.tsx';
import Klaxon from "../utils/klaxonButton.tsx";

const ControlScreen = () => {
  return (
    <WebSocketProvider camera={true}>
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
    backgroundColor: 'yellow',
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
