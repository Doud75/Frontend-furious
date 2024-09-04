import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import globalStyles from '../../assets/styles/globalStyles';
import colors from '../../assets/styles/colors';

interface GeneralStatisticsProps {
  data: any
}

const GeneralStatistics: React.FC<GeneralStatisticsProps> = ({
  data,
}) => {
  const dataStats = [
    {
      name: 'Jules',
      courses: {
        label: "Courses", 
        value : '72'
      },
      victoires: {
        label: "Victoires", 
        value : '87'
      },
      courseDuree: {
        label: "Durée moyenne d’une course", 
        value : '80'
      },
    },
    {
      name: 'Jérémy',
      courses: {
        label: "Courses", 
        value : '23'
      },
      victoires: {
        label: "Victoires", 
        value : '65'
      },
      courseDuree: {
        label: "Durée moyenne d’une course", 
        value : '13'
      },
    },
    {
      name: 'Jean jean',
      courses: {
        label: "Courses", 
        value : '05'
      },
      victoires: {
        label: "Victoires", 
        value : '05'
      },
      courseDuree: {
        label: "Durée moyenne d’une course", 
        value : '050'
      },
    },
  ]
  return (
    <ScrollView style={styles.statGeneralContainer} bounces={false} showsVerticalScrollIndicator={false}>
      <Text style={[globalStyles.paragraph, styles.statGeneralTitle]}>
        Statistiques des 3 meilleurs joueurs
      </Text>
      <View style={styles.statGeneralList}>
        {
          dataStats.map((card, index) => {
            return (
              <View key={index} style={styles.statGeneralItem}>
                <Text style={[globalStyles.paragraph18, styles.statGeneralName]}>
                  Nom
                </Text>
                <View style={styles.statGeneralItemText}>
                  <View style={styles.statGeneralItemRow}>
                    <Text style={[globalStyles.paragraph14, styles.statGeneralItemLabel]}>Courses</Text>
                    <Text style={[globalStyles.paragraph14, styles.statGeneralItemValue]}>{card.courses.value}</Text>
                  </View>
                  <View style={styles.statGeneralItemRow}>
                    <Text style={[globalStyles.paragraph14, styles.statGeneralItemLabel]}>Victoires</Text>
                    <Text style={[globalStyles.paragraph14, styles.statGeneralItemValue]}>{card.victoires.value}</Text>
                  </View>
                  <View style={styles.statGeneralItemRow}>
                    <Text style={[globalStyles.paragraph14, styles.statGeneralItemLabel]}>Durée moyenne d’une course</Text>
                    <Text style={[globalStyles.paragraph14, styles.statGeneralItemValue]}>{card.courseDuree.value}</Text>
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  statGeneralContainer: {

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
    alignItems: 'flex-start'
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
