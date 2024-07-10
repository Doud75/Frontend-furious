import React, {useEffect, useState} from 'react';
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

type RacingScreenRouteProp = RouteProp<RootStackParamList, 'Racing'>;

interface ConnectedProps {
  id: string;
  username: string;
  ip: string;
  topic: string;
}
const Racing: React.FC = () => {
  const route = useRoute<RacingScreenRouteProp>();
  const {raceId} = route.params;
  const [connectedPlayer, setConnectedPlayer] = useState<ConnectedProps[]>([]);
  const [startRace, setStartRace] = useState(false);
  useEffect(() => {
    const socket = io(socketUrl);
    console.log('socketUrl from referee', socketUrl);

    socket.emit('joinGroup', raceId);

    socket.on('newMessage', message => {
      console.log('new message from referee', message);
      if (message.numberOfPlayer) {
        setConnectedPlayer([...connectedPlayer, message.playerInfo]);
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
  }, [connectedPlayer, raceId]);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={connectedPlayer}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.conversationDetails} key={item.id}>
            {startRace && (
              <Button
                onPress={() => {
                  console.log('+1 tour');
                }}
                title="+1 tour"
                color="#841584"
              />
            )}
            <View style={styles.nameContentContainer}>
              <Text style={styles.conversationName}>{item.username}</Text>
            </View>
          </View>
        )}
      />
      {connectedPlayer.length > 0 && !startRace && (
        <Button
          onPress={() => {
            setStartRace(true);
          }}
          title="start race"
          color="#841584"
        />
      )}
      {startRace && (
        <Button
          onPress={() => {
            closeRace(raceId);
          }}
          title="stop race"
          color="#841584"
        />
      )}
    </SafeAreaView>
  );
};

async function closeRace(raceId: string) {
  const response = await fetch(`${apiUrlBack}/close-race`, {
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
  return response.json();
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
