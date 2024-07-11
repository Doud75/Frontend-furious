import React from 'react';
import {View, Text, Button, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {RootStackParamList} from '../types/types.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import globalStyles from '../assets/styles/globalStyles';
import Card from '../components/Card.tsx';

type RefereeScreenProps = NativeStackScreenProps<RootStackParamList, 'Referee'>;

const RefereeScreen: React.FC<RefereeScreenProps> = ({navigation}) => {
  return (
    <View style={globalStyles.background}>
        <Text style={[globalStyles.title1, styles.title1]}>
          Calme toi la page n'est pas encore faite
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 32,
  },
  title1: {
    marginBottom: 8,
  },
});

export default RefereeScreen;
