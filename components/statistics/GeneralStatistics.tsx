import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import globalStyles from '../../assets/styles/globalStyles';
import colors from '../../assets/styles/colors';

interface GeneralStatisticsProps {
  data: {
    username: string,
    nbrace: string,
    nbvictory: string,
    avgduration: string,
  }[];
}

interface Stat {
  stat: {
    username: string;
    nbrace: string;
    nbvictory: string;
    avgduration: string;
  }
}

interface StatRowProps {
  label: string;
  value: string;
}

const StatRow = ({ label, value }: StatRowProps) => (
  <View style={styles.statGeneralItemRow}>
    <Text style={[globalStyles.paragraph14, styles.statGeneralItemLabel]}>
      {label}
    </Text>
    <Text style={[globalStyles.paragraph14, styles.statGeneralItemValue]}>
      {value}
    </Text>
  </View>
);


const StatGeneralItem = ({ stat }: Stat) => {
 const getAverageDuration = (durationInMs: string) => {
    const duration = parseInt(durationInMs, 10);
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    const formattedDuration = `${minutes}'${seconds < 10 ? '0' : ''}${seconds}''`;

    return formattedDuration;
  }  

  return (
    <View style={styles.statGeneralItem}>
      <Text style={[globalStyles.paragraph18, styles.statGeneralName]}>
        {stat.username}
      </Text>
      <View style={styles.statGeneralItemText}>
        <StatRow 
          label="Courses" 
          value={stat.nbrace} 
        />
        <StatRow 
          label="Victoires" 
          value={stat.nbvictory} 
        />
        <StatRow 
          label="Durée moyenne d’une course" 
          value={getAverageDuration(stat.avgduration)} 
        />
      </View>
    </View>
  );
}
const GeneralStatistics: React.FC<GeneralStatisticsProps> = ({data}) => {
  return (
    <ScrollView
      style={styles.statGeneralContainer}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <Text style={[globalStyles.paragraph, styles.statGeneralTitle]}>
        Statistiques des 3 meilleurs joueurs
      </Text>
      <View style={styles.statGeneralList}>
        {data.map((stat, index) => (
          <StatGeneralItem key={index} stat={stat} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  statGeneralContainer: {
    marginBottom: -28,
  },
  statGeneralTitle: {
    padding: 12,
  },
  statGeneralList: {
    flexDirection: 'row',
    gap: 28,
  },
  statGeneralItem: {
    padding: 20,
    borderRadius: 24,
    backgroundColor: colors.grey,
    marginBottom: 12,
    flex: 1,
  },
  statGeneralName: {
    fontFamily: 'Roboto-Bold',
    marginBottom: 16,
  },
  statGeneralItemText: {
    flexDirection: 'column',
    gap: 12,
  },
  statGeneralItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statGeneralItemLabel: {
    fontSize: 14,
    fontFamily: 'Roboto-Light',
    flexShrink: 1,
  },
  statGeneralItemValue: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    flexGrow: 1,
    textAlign: 'right',
  },
});

export default GeneralStatistics;
