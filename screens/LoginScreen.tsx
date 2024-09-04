import React from 'react';
import Login from '../utils/login.tsx';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types.ts';
import globalStyles from '../assets/styles/globalStyles.tsx';
import BackButton from '../components/BackButton.tsx';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  return (
    <View style={globalStyles.background}>
      <BackButton />

      <ScrollView>
        <Text style={[globalStyles.title1, styles.title]}>
          Se connecter à la voiture
        </Text>

        <Login navigation={navigation} />
      </ScrollView>
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
