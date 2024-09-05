import React from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import colors from '../../assets/styles/colors.tsx';
import {useNavigation} from '@react-navigation/native';

const ButtonLeave = () => {
  const navigation = useNavigation();

  const handleLeave = () => {
    navigation.goBack();
    console.log(
      'je me tire, me demande pas pourquoi je suis partis sans motif',
    );
  };

  return (
    <TouchableOpacity style={styles.button} onPressIn={() => handleLeave()}>
      <Image
        source={require('../../assets/images/icons/icon-cross.png')}
        style={styles.buttonIconImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderColor: colors.lightBlue,
    borderRadius: 90,
    borderWidth: 1,
    backgroundColor: 'rgba(227, 227, 246, 0.15)',
    shadowColor: '#E3E3F6',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  buttonIconImage: {
    width: 12,
    height: 12,
    objectFit: 'contain',
  },
});

export default ButtonLeave;
