import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RootStackParamList} from '../types/types.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import globalStyles from '../assets/styles/globalStyles';
import Card from '../components/Card.tsx';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <View style={globalStyles.background}>
      <View style={styles.textContainer}>
        <Text style={[globalStyles.title1, styles.title1]}>
          Vroum vroum 2024
        </Text>
        <Text style={globalStyles.paragraph}>
          Choisis si tu veux piloter une voiture selon différents modes de
          conduite, ou si tu préfères organiser une course en tant qu’arbitre.
        </Text>
      </View>
      <View style={styles.boxContainer}>
        <Card
          style={styles.card}
          navigationScreen={{
              screenName: 'Login',
          }}
          navigation={navigation}
          text1="je souhaite"
          text2="piloter la voiture"
          imageSource={require('../assets/images/piloter.png')}
        />
        <Card
          style={styles.card}
          navigationScreen={{
            screenName: 'RacingForm',
          }}
          navigation={navigation}
          text1="je souhaite"
          text2="arbitrer une course"
          imageSource={require('../assets/images/arbitre.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 40,
  },
  title1: {
    marginBottom: 8,
  },
  boxContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  card: {
    width: '48%',
  },
});

export default HomeScreen;
