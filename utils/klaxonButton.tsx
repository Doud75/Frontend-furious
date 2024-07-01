import React, {useEffect, useRef} from 'react';
import {TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';

const KlaxonButton = () => {
  const ON = "on"
  const OFF = "off"
  
  const ws = useRef<WebSocket | null>(null);
  const Klaxon = (active : string) => {
    if (ws.current && ws.current?.readyState === WebSocket.OPEN) {
      const message = {
        cmd: 7,
        data: active == ON ? 1 : 0,
      }
     ws.current.send(JSON.stringify(message));
    }
  };

  useEffect(() => {
    ws.current = new WebSocket('ws://192.168.13.12/grp4');

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = e => {
      console.log('Received message: ', e.data);
    };

    ws.current.onerror = e => {
      console.log('WebSocket error: ', e.message);
    };

    ws.current.onclose = e => {
      console.log('WebSocket closed: ', e.code, e.reason);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  return (
    <TouchableOpacity style={styles.button} onPressIn={() => Klaxon(ON)} onPressOut={() => Klaxon(OFF)}>
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
