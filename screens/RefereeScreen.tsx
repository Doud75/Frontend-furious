import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RootStackParamList} from '../types/types.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import globalStyles from '../assets/styles/globalStyles';
import {RouteProp, useRoute} from '@react-navigation/native';
import {getFetch, postFetch} from '../helpers/fetch.js';
import {socketUrl, apiUrlBack} from '../config.json';
import RefereeWaiting from '../components/referee/RefereeWaiting.tsx';
import RefereeStarted from '../components/referee/RefereeStarted.tsx';
import RefereeFinished from '../components/referee/RefereeFinished.tsx';
import {io} from 'socket.io-client';
import ButtonIcon from '../components/buttons/ButtonIcon.tsx';

type RefereeScreenProps = NativeStackScreenProps<RootStackParamList, 'Referee'>;
type RefereeScreenRouteProp = RouteProp<RootStackParamList, 'Referee'>;

interface Race {
  id: number;
  duration: string | null;
  name: string;
  status: string;
  tourCount: string;
  winner: string | null;
}

const initRace: Race = {
  duration: null,
  id: 0,
  name: '',
  status: 'pending',
  tourCount: '0',
  winner: null,
};

interface ConnectedProps {
  id: string;
  username: string;
  ip: string;
  topic: string;
}

const RefereeScreen: React.FC<RefereeScreenProps> = ({navigation}) => {
  const route = useRoute<RefereeScreenRouteProp>();
  const {raceId} = route.params;
  const [race, setRace] = useState<Race>(initRace);

  const [step, setStep] = useState(1);
  const [winner, setWinner] = useState('Trop fort');

  const socketRef = useRef<any>(null);
  const [connectedPlayer, setConnectedPlayer] = useState<ConnectedProps[]>([]);

  const [raceStartTime, setRaceStartTime] = useState(0);
  const [raceDuration, setRaceDuration] = useState(0);

  const closeRace = async () => {
    try {
      const response = await postFetch(`${apiUrlBack}/close-race`, {raceId});

      console.log('close race from referee', response);
      if (socketRef.current) {
        socketRef.current.disconnect();
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error closing race:', error);
    }
  };

  useEffect(() => {
    const socket = io(socketUrl);
    socketRef.current = socket;

    console.log('socketUrl from referee', socketUrl);

    socket.emit('joinGroup', raceId);

    socket.on('newMessage', message => {
      console.log('new message from referee', message);
      if (message.numberOfPlayer) {
        setConnectedPlayer(prevPlayers => {
          const newPlayers = [...prevPlayers, message.playerInfo];
          return newPlayers;
        });
      }
    });
  }, [raceId]);

  useEffect(() => {
    console.log({step});
  }, [step]);

  useEffect(() => {
    console.log({winner});
  }, [winner]);

  useEffect(() => {
    getFetch(`${apiUrlBack}/race`)
      .then(data => {
        const currentRace = data.filter(
          (raceData: Race) => raceId === raceData.id,
        );
        console.log('currentRace', currentRace[0]);
        setRace(currentRace[0]);
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
    console.log({race});
  }, []);

  return (
    <View style={globalStyles.background}>
      <ButtonIcon
        iconSource={require('../assets/images/icons/icon-cross-blue.png')}
        handlePress={closeRace}
        style={styles.buttonIcon}
      />
      <Text style={[globalStyles.title1, styles.title1]}>{race.name}</Text>
      {step === 1 && (
        <RefereeWaiting
          raceId={race.id}
          tourCount={race.tourCount}
          players={connectedPlayer}
          onNextStep={() => setStep(2)}
          setRaceStartTime={(startTime: number) => setRaceStartTime(startTime)}
        />
      )}
      {step === 2 && (
        <RefereeStarted
          raceId={race.id}
          tourCount={race.tourCount}
          players={connectedPlayer}
          raceStartTime={raceStartTime}
          onNextStep={() => setStep(3)}
          setWinner={(winnerName: string) => setWinner(winnerName)}
          setRaceDuration={(duration: number) => setRaceDuration(duration)}
        />
      )}
      {step === 3 && (
        <RefereeFinished winner={winner} raceDuration={raceDuration} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 32,
  },
  title1: {
    marginBottom: 40,
  },
  buttonIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
});

export default RefereeScreen;
