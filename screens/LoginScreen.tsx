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

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
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
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 20,
  },
});

export default LoginScreen;
