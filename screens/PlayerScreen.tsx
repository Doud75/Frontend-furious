import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import {RootStackParamList} from '../types/types.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import globalStyles from '../assets/styles/globalStyles';
import Card from '../components/Card.tsx';
import BackButton from '../components/BackButton.tsx';
import colors from '../assets/styles/colors.tsx';
import ButtonIcon from '../components/buttons/ButtonIcon.tsx';

type PlayerScreenProps = NativeStackScreenProps<RootStackParamList, 'Player'>;

const {height: screenHeight} = Dimensions.get('window');
const cardHeight = screenHeight * 0.37;

const PlayerScreen: React.FC<PlayerScreenProps> = ({navigation}) => {
  const onPressButton = () => {
    () => navigation.navigate('Custom');
  };

  return (
    <View style={[globalStyles.background, styles.page]}>
      <BackButton />

      <View style={styles.textContainer}>
        <Text style={[globalStyles.title1, styles.title1]}>
          Modes de conduite
        </Text>
        <Text style={globalStyles.paragraph}>
          Choisis ton mode de conduite et bla bla bla blabuucdl jkuklszb
          fzviafjioef zefkgufzlfzie faugaofgie
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <Card
          style={styles.card}
          navigationScreen={{
            screenName: 'FreeRace',
            params: {
              raceId: '',
            },
          }}
          navigation={navigation}
          text1="mode"
          text2="libre"
          imageSource={require('../assets/images/mode-libre.png')}
        />
        <Card
          style={styles.card}
          navigationScreen={{
            screenName: 'RaceList',
          }}
          navigation={navigation}
          text1="mode"
          text2="course"
          imageSource={require('../assets/images/mode-course.png')}
        />
        <Card
          style={styles.card}
          navigationScreen={{
            screenName: 'TrackRace',
          }}
          navigation={navigation}
          text1="mode"
          text2="automatique"
          imageSource={require('../assets/images/mode-auto.png')}
        />
      </View>
      <ButtonIcon
        iconSource={require('../assets/images/icons/icon-settings.png')}
        link={'Statistics'}
        style={styles.buttonIcon}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    position: 'relative',
  },
  textContainer: {
    marginBottom: 32,
  },
  title1: {
    marginBottom: 8,
  },
  cardContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  card: {
    maxWidth: 194,
    flex: 1,
    height: cardHeight,
  },
  buttonIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default PlayerScreen;
