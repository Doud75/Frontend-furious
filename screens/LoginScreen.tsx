import React from 'react';
import Login from '../utils/login.tsx';
import {Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types.ts';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  return (
    <>
      <Login navigation={navigation} />
      <Button
        title="Mode course"
        onPress={() => navigation.navigate('RacingForm')}
      />
    </>
  );
};
export default LoginScreen;
