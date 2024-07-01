import React from 'react';
import {View, StyleSheet} from 'react-native';
import Joystick from '../utils/joystick.tsx';

const ControlScreen = () => {
  return (
    <View style={styles.container}>
      <Joystick radius={100} innerRadius={80} />
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

export default ControlScreen;
