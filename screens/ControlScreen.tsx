import {StyleSheet, View, Text, Pressable} from 'react-native';
import {useEffect, useRef} from 'react';

export default function () {
  let inMotion: string = '';
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

  const handlePress = (data: Array<number>, motion: string) => {
    inMotion = motion;
    console.log(data);
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        cmd: 1,
        data: data,
      };
      ws.current.send(JSON.stringify(message));
    }
  };

  const handlePressTurn = (direction: string) => {
    console.log(inMotion);
    const powerTurnSide: number = 2095;
    let data: Array<number> = [];
    if (inMotion === 'front') {
      if (direction === 'right') {
        data = [
          powerTurnSide + 2000,
          powerTurnSide + 2000,
          powerTurnSide,
          powerTurnSide,
        ];
      } else if (direction === 'left') {
        data = [
          powerTurnSide,
          powerTurnSide,
          powerTurnSide + 2000,
          powerTurnSide + 2000,
        ];
      } else {
        data = [
          powerTurnSide + 2000,
          powerTurnSide + 2000,
          powerTurnSide + 2000,
          powerTurnSide + 2000,
        ];
      }
    } else if (inMotion === 'back') {
      if (direction === 'right') {
        data = [
          -powerTurnSide + 2000,
          -powerTurnSide + 2000,
          -powerTurnSide,
          -powerTurnSide,
        ];
      } else if (direction === 'left') {
        data = [
          -powerTurnSide,
          -powerTurnSide,
          -powerTurnSide + 2000,
          -powerTurnSide + 2000,
        ];
      } else {
        data = [
          -powerTurnSide + 2000,
          -powerTurnSide + 2000,
          -powerTurnSide + 2000,
          -powerTurnSide + 2000,
        ];
      }
    } else {
      if (direction === 'right') {
        data = [powerTurnSide, powerTurnSide, -powerTurnSide, -powerTurnSide];
      } else if (direction === 'left') {
        data = [-powerTurnSide, -powerTurnSide, powerTurnSide, powerTurnSide];
      } else {
        data = [0, 0, 0, 0];
      }
    }
    console.log(data);
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        cmd: 1,
        data: data,
      };
      ws.current.send(JSON.stringify(message));
    }
  };

  return (
    <View style={styles.conversationItem}>
      <Pressable
        style={styles.button}
        onPressIn={() => handlePress([4095, 4095, 4095, 4095], 'front')}
        onPressOut={() => handlePress([0, 0, 0, 0], '')}>
        <Text style={styles.text}>Avancer</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPressIn={() => handlePress([-4095, -4095, -4095, -4095], 'back')}
        onPressOut={() => handlePress([0, 0, 0, 0], '')}>
        <Text style={styles.text}>Reculer</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPressIn={() => handlePressTurn('right')}
        onPressOut={() => handlePressTurn('straight')}>
        <Text style={styles.text}>Droite</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPressIn={() => handlePressTurn('left')}
        onPressOut={() => handlePressTurn('straight')}>
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
