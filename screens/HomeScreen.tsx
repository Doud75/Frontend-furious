import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {RootStackParamList} from '../types/types.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button
        title="Mode libre"
        onPress={() => navigation.navigate('FreeRace')}
      />
      <Button
        title="Personnalisation"
        onPress={() => navigation.navigate('Custom')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default HomeScreen;
