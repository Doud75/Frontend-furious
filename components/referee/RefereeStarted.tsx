import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import globalStyles from '../../assets/styles/globalStyles';
import colors from '../../assets/styles/colors';
import {postFetch} from '../../helpers/fetch';
import {apiUrlBack} from '../../config.json';
import ButtonSecondary from '../buttons/ButtonSecondary';

interface RefereeStartedProps {
  raceId: number;
  tourCount: string;
  players: any;
  raceStartTime: any;
  onNextStep: any;
  setWinner: any;
  setRaceDuration: any;
}

const RefereeStarted = ({
  raceId,
  tourCount,
  players,
  raceStartTime,
  onNextStep,
  setWinner,
  setRaceDuration,
}: RefereeStartedProps) => {
  const [nbOfTour, setNbOfTour] = useState<number[]>([1, 1]);

  useEffect(() => {
    console.log({nbOfTour});
  }, [nbOfTour]);

  async function finishRace(
    raceId: number,
    winner: string,
    raceStartTime: number,
  ) {
    console.log('from stop race : ', winner);
    const raceDuration = Date.now() - raceStartTime;
    console.log({raceDuration});
    setRaceDuration(raceDuration);

    return await postFetch(`${apiUrlBack}/stop-race`, {
      raceId,
      winner,
      raceDuration,
    });
  }

  let winner: any;
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
    console.log({winner});
    if (nbOfTour[index] + 1 === Number(tourCount) && !winner) {
      console.log('shouldSetWinner', userName);
      setWinner(userName);
      winner = userName;
      finishRace(raceId, winner, raceStartTime);
      onNextStep();
    }
    console.log('winner let', winner);
  };

  // const playersRaw = [
  //   {
  //     name: 'Nom',
  //     tourCount: nbOfTour[0],
  //   },
  //   {
  //     name: 'Nom2',
  //     tourCount: nbOfTour[1],
  //   },
  // ];

  const getPlayerTourCount = (playerIndex: number) => {
    return nbOfTour[playerIndex];
  };

  return (
    <View style={styles.container}>
      {players.map((player: any, index: number) => (
        <View key={index} style={styles.row}>
          <Text style={[globalStyles.paragraph, styles.paragraph]}>
            {player.username}
          </Text>
          <Text style={[globalStyles.paragraph, styles.paragraph]}>
            Tour {getPlayerTourCount(index)}/{tourCount}
          </Text>
          <ButtonSecondary
            text={'Valider un tour'}
            onPress={() => incrementTour(index, player.username)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: colors.grey,
    marginBottom: 20,
  },
  paragraph: {
    padding: 8,
  },
});

export default RefereeStarted;
