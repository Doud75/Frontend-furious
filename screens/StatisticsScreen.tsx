import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RootStackParamList} from '../types/types.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import globalStyles from '../assets/styles/globalStyles';
import colors from '../assets/styles/colors.tsx';
import UserStatistics from '../components/statistics/UserStatistics.tsx';
import GeneralStatistics from '../components/statistics/GeneralStatistics.tsx';
import BackButton from '../components/BackButton.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../reducer/store.tsx';
import UserStatisticsNotLoged from '../components/statistics/UserStatisticsNotLoged.tsx';

type StatisticsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Statistics'
>;

const StatisticsScreen: React.FC<StatisticsScreenProps> = () => {
  const [tab, setTab] = useState('perso');
  const [isPlayerLogin, setIsPlayerLogin] = useState(false);

  const formData = useSelector((state: RootState) => state.formData);
  const playerId = formData.id 

  useEffect(() => {
    setIsPlayerLogin(!!playerId);
  }, [playerId])

  const handleTab = (tab: string) => {
    setTab(tab);
  };

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
      {
        tab === 'perso' 
          && (isPlayerLogin 
              ? <UserStatistics /> 
              : <UserStatisticsNotLoged />) 
      }
      {tab === 'general' && <GeneralStatistics />}
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
