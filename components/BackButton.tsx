import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../assets/styles/colors';
import {useNavigation} from '@react-navigation/native';

const BackButton: React.FC = () => {
  const navigation = useNavigation();

  const handleButtonClick = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
        <Image
          source={require('../assets/images/icons/prev.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.text}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingBottom: 12,
  },

  button: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },

  image: {
    marginRight: 4,
  },

  text: {
    color: colors.greyDark,
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default BackButton;
