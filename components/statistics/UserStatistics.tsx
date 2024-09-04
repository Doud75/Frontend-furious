import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import globalStyles from '../../assets/styles/globalStyles';
import colors from '../../assets/styles/colors';

interface UserStatisticsProps {
  data: any;
}

const UserStatistics: React.FC<UserStatisticsProps> = ({data}) => {
  const rowsStats = [
    {
      label: 'Courses',
      value: data.nbCourses,
    },
    {
      label: 'Victoires',
      value: data.nbVictoires,
    },
    {
      label: 'Durée moyenne d’une course',
      value: data.raceDuration,
    },
    {
      label: 'Durée moyenne d’un tour',
      value: data.tourDuration,
    },
  ];
  return (
    <ScrollView
      style={styles.statPersoContainer}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <Text style={[globalStyles.title4, styles.statPersoTitle]}>
        Nom du joueur
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
