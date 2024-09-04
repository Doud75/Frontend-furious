import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RootStackParamList} from '../types/types.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import globalStyles from '../assets/styles/globalStyles';
import colors from '../assets/styles/colors.tsx';
import UserStatistics from '../components/statistics/UserStatistics.tsx';
import GeneralStatistics from '../components/statistics/GeneralStatistics.tsx';
import BackButton from '../components/BackButton.tsx';
import { getFetch } from '../helpers/fetch.js';
import {apiUrlBack} from '../config.json';
import { useSelector } from 'react-redux';
import { RootState } from '../reducer/store.tsx';


type StatisticsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Statistics'
>;

interface Stats{
  player: {
    username: string,
    nbrace: string,
    nbvictory: string,
    avgduration: string,
    avgdurationpertour: string,
  },
  statsGeneral:{
    username: string,
    nbrace: string,
    nbvictory: string,
    avgduration: string,
  }[]
}

const initStats = {
  player: {
    username: '',
    nbrace: '',
    nbvictory: '',
    avgduration: '',
    avgdurationpertour: '',
  },
  statsGeneral: [],
}

const StatisticsScreen: React.FC<StatisticsScreenProps> = () => {
  const [tab, setTab] = useState('perso');
  const [stats, setStats] = useState<Stats>(initStats);

  const handleTab = (tab: string) => {
    setTab(tab);
  };

  const formData = useSelector((state: RootState) => state.formData);
  const playerId = formData.id
  const playerUsername = formData.username

  useEffect(() => {
    getFetch(`${apiUrlBack}/get-stats/${playerId}`)
      .then(data => {
        setStats(data);
        console.log({data});
      })
      .catch(error => {
        console.error('Erreur :', error);
    });
  }, [])

  return (
    <View style={[globalStyles.background, styles.page]}>
      <BackButton />

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tabButton, tab === 'perso' && styles.tabButtonActive]}
          onPress={() => handleTab('perso')}>
          <Text style={[globalStyles.paragraph, styles.tabText]}>
            Mes statistiques
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            tab === 'general' && styles.tabButtonActive,
          ]}
          onPress={() => handleTab('general')}>
          <Text style={[globalStyles.paragraph, styles.tabText]}>
            Statistiques globales
          </Text>
        </TouchableOpacity>
      </View>

      {tab === 'perso' && <UserStatistics data={stats.player} username={playerUsername} />}

      {tab === 'general' && <GeneralStatistics data={stats.statsGeneral} />}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    position: 'relative',
  },
  tabs: {
    padding: 6,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 16,
  },
  tabButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 90,
    backgroundColor: colors.background,
  },
  tabButtonActive: {
    backgroundColor: colors.grey,
  },
  tabText: {},
});

export default StatisticsScreen;
