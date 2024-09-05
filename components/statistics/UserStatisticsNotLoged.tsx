import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import globalStyles from '../../assets/styles/globalStyles';

const UserStatisticsNotLoged = () => {  
  return (
    <View>
      <Text style={[globalStyles.paragraph, styles.statPersoTitle]}>
        Connecte toi pour voir tes stats !
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statPersoTitle: {
    marginBottom: 12,
  },
});

export default UserStatisticsNotLoged;
