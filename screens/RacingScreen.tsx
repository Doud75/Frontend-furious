import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import io from 'socket.io-client';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../types/types.ts';
import {socketUrl} from '../config.json';

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
    });

    return () => {
      console.log('return');
      socket.disconnect();
    };
  }, [raceId]);
  return (
    <View style={styles.container}>
      <Text>Racing</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default Racing;
