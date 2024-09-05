import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import globalStyles from '../../assets/styles/globalStyles';
import colors from '../../assets/styles/colors';
import { getFetch } from '../../helpers/fetch';
import {apiUrlBack} from '../../config.json';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer/store';

interface playerStats{
  player: {
    username: string,
    nbrace: string,
    nbvictory: string,
    avgduration: string,
    avgdurationpertour: string,
  },
}

const initPlayerStats = {
  player: {
    username: '',
    nbrace: '',
    nbvictory: '',
    avgduration: '',
    avgdurationpertour: '',
  }
}

const UserStatistics = () => {
  const [playerStats, setPlayerStats] = useState<playerStats>(initPlayerStats);
  const formData = useSelector((state: RootState) => state.formData);
  const playerId = formData.id  
  const playerUsername = formData.username

  useEffect(() => {
    getFetch(`${apiUrlBack}/get-stats/${playerId}`)
      .then(data => {
        setPlayerStats(data);
      })
      .catch(error => {
        console.error('Erreur :', error);
    });
  }, [])
  const rowsStats = [
    {
      label: 'Courses',
      value: playerStats.player.nbrace,
    },
    {
      label: 'Victoires',
      value: playerStats.player.nbvictory,
    },
    {
      label: 'Durée moyenne d’une course',
      value: playerStats.player.avgduration || "0",
    },
    {
      label: 'Durée moyenne d’un tour',
      value: playerStats.player.avgdurationpertour || "0",
    },
  ];
  
  return (
    <ScrollView
      style={styles.statPersoContainer}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <Text style={[globalStyles.title4, styles.statPersoTitle]}>
        {playerUsername}
      </Text>

      <View>
        {rowsStats.map((row, index) => {
          return (
            <View key={index} style={styles.statPersoItem}>
              <Text style={[globalStyles.paragraph, styles.statPersoPara1]}>
                {row.label}
              </Text>
              <Text style={[globalStyles.paragraph, styles.statPersoPara2]}>
                {row.value}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  statPersoContainer: {
    flex: 1,
    marginBottom: -28,
  },
  statPersoTitle: {
    marginBottom: 12,
  },
  statPersoPara1: {
    fontFamily: 'Roboto-Light',
  },
  statPersoPara2: {
    fontFamily: 'Roboto-Bold',
  },
  statPersoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: colors.grey,
    marginBottom: 12,
  },
});

export default UserStatistics;
