import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RootStackParamList} from '../types/types.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import globalStyles from '../assets/styles/globalStyles';
import colors from '../assets/styles/colors.tsx';
import UserStatistics from '../components/statistics/UserStatistics.tsx';
import GeneralStatistics from '../components/statistics/GeneralStatistics.tsx';
import BackButton from '../components/BackButton.tsx';

type StatisticsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Statistics'
>;

const StatisticsScreen: React.FC<StatisticsScreenProps> = () => {
  const [tab, setTab] = useState('perso');
  const handleTab = (tab: string) => {
    setTab(tab);
  };
  const statsPerso = {
    nbCourses: 7,
    nbVictoires: 7,
    raceDuration: 7685,
    tourDuration: 976,
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

      {tab === 'perso' && <UserStatistics data={statsPerso} />}

      {tab === 'general' && <GeneralStatistics data={{}} />}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    position: 'relative',
  },
  tabs: {
    padding: 8,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 16,
  },
  tabButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 90,
    backgroundColor: colors.background,
  },
  tabButtonActive: {
    backgroundColor: colors.grey,
  },
  tabText: {},
});

export default StatisticsScreen;
