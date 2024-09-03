import React from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useWebSocket} from '../context/WebSocketContext.tsx';
import colors from '../assets/styles/colors.tsx';

const KlaxonButton = () => {
  const ON = 'on';
  const OFF = 'off';

  const [ws] = useWebSocket();

  const Klaxon = (active: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = {
        cmd: 7,
        data: active == ON ? 1 : 0,
      };
      ws.send(JSON.stringify(message));
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPressIn={() => Klaxon(ON)}
      onPressOut={() => Klaxon(OFF)}>
      <Image
        source={require('../assets/images/icons/icon-horn.png')}
        style={styles.buttonIconImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderColor: colors.lightBlue,
    borderRadius: 90,
    borderWidth: 1,
    backgroundColor: 'rgba(227, 227, 246, 0.15)',
    shadowColor: '#E3E3F6', 
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  buttonIconImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  }
});

export default KlaxonButton;
