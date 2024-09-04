import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import globalStyles from '../../assets/styles/globalStyles';
import colors from '../../assets/styles/colors';

interface UserStatisticsProps {
  data: {
    username: string,
    nbrace: string,
    nbvictory: string,
    avgduration: string,
    avgdurationpertour: string,
  },
  username: string
}

const UserStatistics: React.FC<UserStatisticsProps> = ({data, username}) => {
  const rowsStats = [
    {
      label: 'Courses',
      value: data.nbrace,
    },
    {
      label: 'Victoires',
      value: data.nbvictory,
    },
    {
      label: 'Durée moyenne d’une course',
      value: data.avgduration || "0",
    },
    {
      label: 'Durée moyenne d’un tour',
      value: data.avgdurationpertour || "0",
    },
  ];
  
  return (
    <ScrollView
      style={styles.statPersoContainer}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <Text style={[globalStyles.title4, styles.statPersoTitle]}>
        {username}
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
