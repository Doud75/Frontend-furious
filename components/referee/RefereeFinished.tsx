import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import globalStyles from '../../assets/styles/globalStyles';

interface RefereeFinishedProps {
  winner: string;
  raceDuration: number;
}

const getDuration = (durationInMs: number) => {
  const duration = durationInMs;
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  const formattedDuration = `${minutes}'${seconds < 10 ? '0' : ''}${seconds}''`;

  return formattedDuration;
};

const RefereeFinished = ({winner, raceDuration}: RefereeFinishedProps) => {
  return (
    <View>
      <View style={styles.row}>
        <Text style={[globalStyles.paragraph, styles.paragraph]}>
          Vainqueur
        </Text>
        <Text style={[globalStyles.paragraph, styles.title]}>{winner}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[globalStyles.paragraph, styles.paragraph]}>
          Durée de la course
        </Text>
        <Text style={[globalStyles.paragraph, styles.title]}>
          {getDuration(raceDuration)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {

  // },
  row: {
    marginBottom: 32,
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 600,
    lineHeight: 60,
  },
  paragraph: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 8,
  },
});

export default RefereeFinished;
