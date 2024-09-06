import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../types/types.ts';
import {WebSocketProvider} from '../context/WebSocketContext.tsx';
import ButtonLeave from '../components/buttons/ButtonLeave.tsx';
import Joystick from '../utils/joystick.tsx';
import KlaxonButton from '../utils/klaxonButton.tsx';
import Camera from '../utils/camera.tsx';
import colors from '../assets/styles/colors.tsx';
import {StyleSheet, Text, View} from 'react-native';

type RacingScreenRouteProp = RouteProp<RootStackParamList, 'Racing'>;

const Racing: React.FC = () => {
  // Static page with fake data
  const route = useRoute<RacingScreenRouteProp>();
  const {raceId, tourCount} = route.params;
  const players = '2';

  const [raceStarted, setRaceStarted] = useState(false);
  const [counter, setCounter] = useState('');
  const [raceFinished, setRaceFinished] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState('');

  const start = true;

  useEffect(() => {
    if (start) {
      setTimeout(() => {
        setCounter('3');
        setRaceStarted(true);
      }, 4000);

      setTimeout(() => {
        setCounter('2');
      }, 5000);

      setTimeout(() => {
        setCounter('1');
      }, 6000);

      setTimeout(() => {
        setCounter('GO !');
      }, 7000);

      setTimeout(() => {
        setRaceStarted(false);
      }, 8000);

      setTimeout(() => {
        setRaceFinished(true);
      }, 12000);
    }
  }, [start]);

  useEffect(() => {
    if (raceFinished) {
      const winner = 'JF_le_crack_du_77';
      setWinnerMessage(`🏆 ${winner}`);
    }
  }, [raceFinished]);

  return (
    <WebSocketProvider camera={true} track={false} nbPlayer={players}>
      {raceStarted && (
        <View style={styles.messageContainer}>
          <Text style={[styles.message, styles.messageCounter]}>{counter}</Text>
        </View>
      )}

      {raceFinished && (
        <View style={styles.messageContainer}>
          <Text style={[[styles.messageWinner, styles.message]]}>
            {winnerMessage}
          </Text>
        </View>
      )}

      <View style={styles.leaveButton}>
        <ButtonLeave />
      </View>
      <View style={styles.joystick}>
        <Joystick radius={60} innerRadius={45} />
      </View>
      <View style={styles.klaxon}>
        <KlaxonButton />
      </View>
      <View style={styles.camera}>
        <Camera />
      </View>
    </WebSocketProvider>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    zIndex: 2,
  },

  message: {
    color: colors.lightBlue,
    fontStyle: 'italic',
    fontWeight: '700',
    lineHeight: 113,
    textShadowColor: 'rgba(227, 227, 246, 0.40)',
    textShadowOffset: {width: -1.408, height: -1.408},
    textShadowRadius: 7.039,
    textAlign: 'center',
  },

  messageCounter: {
    fontSize: 113,
  },

  messageWinner: {
    fontSize: 60,
  },

  leaveButton: {
    position: 'absolute',
    right: '5%',
    top: '5%',
    width: 'auto',
    zIndex: 2,
  },

  joystick: {
    zIndex: 2,
    width: 'auto',
    position: 'absolute',
    bottom: '8%',
    left: '5%',
  },

  klaxon: {
    zIndex: 2,
    position: 'absolute',
    bottom: '10%',
    right: '5%',
    width: 70,
    height: 70,
  },

  camera: {
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    width: '100%',
    backgroundColor: colors.background,
    top: 0,
    left: 0,
  },
});

export default Racing;
