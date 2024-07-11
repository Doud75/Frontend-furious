import React from 'react';
import Login from '../utils/login.tsx';
import {Button, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types.ts';
import globalStyles from '../assets/styles/globalStyles.tsx';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  return (
    <View style={globalStyles.background}>
      <Text style={[globalStyles.title1, styles.title]}>
        Se connecter à la voiture
      </Text>
      {/* <Text style={[globalStyles.paragraph, styles.paragraph]}>
        Se connecter à la voiture
      </Text> */}
      <Login navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 20,
  },
});

export default LoginScreen;
