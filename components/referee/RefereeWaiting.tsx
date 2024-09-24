import React, {useEffect, useState} from 'react';
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
  const [playersUsernames, setPlayersUsernames] = useState('');

  const handleStartRace = () => {
    setRaceStartTime(Date.now());
    return onNextStep();
  };

  useEffect(() => {
    if (players.length > 0) {
      const playersUsernames = players.map((player: {username: string}) => player.username).join(", ");
      setPlayersUsernames(playersUsernames);
    } else{
      setPlayersUsernames("Aucun joueur n'a encore rejoint la course");
    }
  }, [players]);

  return (
    <View style={styles.statGeneralContainer}>
      <Text style={[globalStyles.paragraph, styles.text]}>
        Nombre de tours : {tourCount}
      </Text>
      <Text style={[globalStyles.paragraph, styles.text]}>
        Joueur(s) : {playersUsernames}
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
