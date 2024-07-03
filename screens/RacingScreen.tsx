import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import io from 'socket.io-client';

const Racing = () => {
  useEffect(() => {
    console.log('start');
    const socket = io('http://192.168.43.114:4500');
    console.log('start');

    socket.emit('joinGroup', 'idCourse');

    socket.on('newMessage', message => {
      console.log(message);
    });
    return () => {
      console.log('return');
      socket.disconnect();
    };
  }, []);
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
