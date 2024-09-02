import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useWebSocket} from '../context/WebSocketContext.tsx';

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
      <Text style={styles.buttonText}>Klaxon</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default KlaxonButton;
