import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import io from 'socket.io-client';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../types/types.ts';
import {socketUrl, apiUrlBack} from '../config.json';

type RacingScreenRouteProp = RouteProp<RootStackParamList, 'Racing'>;
const Racing: React.FC = () => {
  const route = useRoute<RacingScreenRouteProp>();
  const {raceId} = route.params;
  useEffect(() => {
    const socket = io(socketUrl);
    console.log(socketUrl);

    socket.emit('joinGroup', raceId);
    console.log(raceId);

    socket.on('newMessage', message => {
      console.log(message);
      console.log('from me');
    });

    return () => {
      console.log('return');
      const response = closeRace(raceId);
      console.log(response);
      socket.disconnect();
    };
  }, [raceId]);
  return (
    <View style={styles.container}>
      <Text>Racing</Text>
    </View>
  );
};

async function closeRace(raceId: string): Promise<string> {
  const response = await fetch(`${apiUrlBack}/close-race`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raceId,
    }),
  });
  if (!response.ok) {
    throw new Error(`Reponse HTTP : ${response.status}`);
  }
  return await response.json();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default Racing;
