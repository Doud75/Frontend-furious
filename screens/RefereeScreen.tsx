import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RootStackParamList} from '../types/types.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import globalStyles from '../assets/styles/globalStyles';

type RefereeScreenProps = NativeStackScreenProps<RootStackParamList, 'Referee'>;

const RefereeScreen: React.FC<RefereeScreenProps> = () => {
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
