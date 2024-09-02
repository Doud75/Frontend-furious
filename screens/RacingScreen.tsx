import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Button,
} from 'react-native';
import io from 'socket.io-client';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../types/types.ts';
import {socketUrl, apiUrlBack} from '../config.json';
import {postFetch} from '../helpers/fetch';

type RacingScreenRouteProp = RouteProp<RootStackParamList, 'Racing'>;

interface ConnectedProps {
  id: string;
  username: string;
  ip: string;
  topic: string;
}

const Racing: React.FC = () => {
  const route = useRoute<RacingScreenRouteProp>();
  const {raceId, tourCount} = route.params;
  const [connectedPlayer, setConnectedPlayer] = useState<ConnectedProps[]>([]);
  const [startRace, setStartRace] = useState(false);
  const [winner, setWinner] = useState('');
  const socketRef = useRef<any>(null);
  const [nbOfTour, setNbOfTour] = useState<number[]>([]);
  const [raceStartTime, setRaceStartTime] = useState(Date.now);

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
          setNbOfTour(new Array(newPlayers.length).fill(0));
          return newPlayers;
        });
      }
    });

    return () => {
      console.log('return from referee');
      const cleanUp = async () => {
        const response = await closeRace(raceId);
        console.log('close race from referee', response);
        socket.disconnect();
      };
      cleanUp();
    };
  }, [raceId]);

  const incrementTour = (index: number, userName: string) => {
    console.log('inIncrement');
    if (nbOfTour[index] + 1 <= Number(tourCount)) {
      setNbOfTour(prevTours => {
        const updatedTours = [...prevTours];
        updatedTours[index] += 1;
        return updatedTours;
      });
    }
    console.log('nbOfTour', nbOfTour[index] + 1);
    console.log('tourCount', tourCount);
    console.log('winner', winner);
    if (nbOfTour[index] + 1 === Number(tourCount) && winner === '') {
      console.log('shouldSetWinner', userName);
      setWinner(userName);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={connectedPlayer}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <View style={styles.conversationDetails} key={item.id}>
            <View style={styles.nameContentContainer}>
              {startRace && (
                <>
                  <Button
                    onPress={() => {
                      incrementTour(index, item.username);
                    }}
                    title="+1 tour"
                    color="#841584"
                  />
                  <Text style={styles.conversationName}>
                    {nbOfTour[index]}/{tourCount}
                  </Text>
                </>
              )}
              <Text style={styles.conversationName}>{item.username}</Text>
            </View>
          </View>
        )}
      />
      {connectedPlayer.length > 0 && !startRace && (
        <Button
          onPress={() => {
            setStartRace(true);
            setRaceStartTime(Date.now);
          }}
          title="start race"
          color="#841584"
        />
      )}
      {startRace && (
        <Button
          onPress={async () => {
            await stopRace(raceId, winner, raceStartTime);
            setStartRace(false);
          }}
          title="stop race"
          color="#841584"
        />
      )}
    </SafeAreaView>
  );
};

async function closeRace(raceId: string) {
  console.log('from close race : ', raceId);
  return await postFetch(`${apiUrlBack}/close-race`, {raceId});
  /*const response = await fetch(`${apiUrlBack}/close-race`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raceId,
    }),
  });
  if (!response.ok) {
    throw new Error(`Reponse HTTP : ${response.status}`);
  }
  return response.json();*/
}

async function stopRace(raceId: string, winner: string, raceStartTime: number) {
  console.log('from stop race : ', winner);
  const raceDuration = Date.now() - raceStartTime;
  return await postFetch(`${apiUrlBack}/stop-race`, {
    raceId,
    winner,
    raceDuration,
  });
  /*const response = await fetch(`${apiUrlBack}/stop-race`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raceId,
      winner,
      raceDuration,
    }),
  });
  if (!response.ok) {
    throw new Error(`Reponse HTTP : ${response.status}`);
  }
  return response.json();*/
}

const styles = StyleSheet.create({
  touchable: {
    bottom: 24,
  },
  tinyLogo: {
    width: 65,
    height: 65,
    borderRadius: 400,
    left: '100%',
    transform: [{translateX: -80}],
  },
  container: {
    flex: 1,
    padding: 16,
  },
  conversationItem: {
    paddingVertical: 16,
  },
  conversationDetails: {
    flex: 1,
  },
  nameContentContainer: {
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  updatedAt: {
    fontSize: 14,
  },
  conversationContent: {
    fontSize: 16,
    marginBottom: 6,
  },
});

export default Racing;
