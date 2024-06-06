import {StyleSheet, View, Text, Pressable} from 'react-native';
import {useEffect, useRef} from 'react';

export default function () {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://192.168.43.12/grp4');

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

  const handlePressIn = () => {
    console.log('onPressIn');
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        cmd: 1,
        data: [4095, 4095, 4095, 4095],
      };
      ws.current.send(JSON.stringify(message));
    }
  };

  const handlePressOut = () => {
    console.log('onPressOut');
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        cmd: 1,
        data: [0, 0, 0, 0],
      };
      ws.current.send(JSON.stringify(message));
    }
  };

  const handleReverseIn = () => {
    console.log('onReverseIn');
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        cmd: 1,
        data: [-4095, -4095, -4095, -4095],
      };
      ws.current.send(JSON.stringify(message));
    }
  };

  const handleReverseOut = () => {
    console.log('onReverseOut');
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        cmd: 1,
        data: [0, 0, 0, 0],
      };
      ws.current.send(JSON.stringify(message));
    }
  };

  const handleRightIn = () => {
    console.log('onRightIn');
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        cmd: 1,
        data: [4095, 4095, -4095, -4095],
      };
      ws.current.send(JSON.stringify(message));
    }
  };

  const handleRightOut = () => {
    console.log('onRightOut');
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        cmd: 1,
        data: [0, 0, 0, 0],
      };
      ws.current.send(JSON.stringify(message));
    }
  };

  const handleLeftIn = () => {
    console.log('onLeftIn');
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        cmd: 1,
        data: [-4095, -4095, 4095, 4095],
      };
      ws.current.send(JSON.stringify(message));
    }
  };

  const handleLeftOut = () => {
    console.log('onLeftOut');
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        cmd: 1,
        data: [0, 0, 0, 0],
      };
      ws.current.send(JSON.stringify(message));
    }
  };

  return (
    <View style={styles.conversationItem}>
      <Pressable
        style={styles.button}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <Text style={styles.text}>Avancer</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPressIn={handleReverseIn}
        onPressOut={handleReverseOut}>
        <Text style={styles.text}>Reculer</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPressIn={handleRightIn}
        onPressOut={handleRightOut}>
        <Text style={styles.text}>Droite</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPressIn={handleLeftIn}
        onPressOut={handleLeftOut}>
        <Text style={styles.text}>Gauche</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  conversationItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
