import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import globalStyles from '../../assets/styles/globalStyles';
import ButtonPrimary from '../buttons/ButtonPrimary';

interface RefereeWaitingProps {
  raceId: number;
  tourCount: string;
  players: any;
  onNextStep: any;
  setRaceStartTime: any;
}

const RefereeWaiting = ({
  tourCount,
  players,
  onNextStep,
  setRaceStartTime,
}: RefereeWaitingProps) => {
  const handleStartRace = () => {
    console.log('startRace');
    console.log('date now', Date.now());
    setRaceStartTime(Date.now());
    return onNextStep();
  };

  const getPlayersName = () => {
    console.log({players});
    return players.length > 0
      ? players.map((player: {username: string}) => player.username)
      : "Aucun joueur n'a encore rejoint la course";
  };

  return (
    <View style={styles.statGeneralContainer}>
      <Text style={[globalStyles.paragraph, styles.text]}>
        Nombre de tours : {tourCount}
      </Text>
      <Text style={[globalStyles.paragraph, styles.text]}>
        Joueur(s) : {getPlayersName()}
      </Text>
      <ButtonPrimary
        text="Lancer la course"
        onPress={handleStartRace}
        iconSource={require('../../assets/images/icons/icon-lightning.png')}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statGeneralContainer: {
    marginBottom: -28,
  },
  text: {
    marginBottom: 16,
  },
  button: {
    alignSelf: 'flex-start',
    marginTop: 14,
  },
});

export default RefereeWaiting;
