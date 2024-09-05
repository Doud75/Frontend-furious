import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../assets/styles/colors.tsx';

interface ButtonAutoModeProps {
  active: boolean;
}

const ButtonAutoMode: React.FC<ButtonAutoModeProps> = ({active}) => {
  const [buttonText, setButtonText] = useState('Go');

  useEffect(() => {
    setButtonText(active ? 'Stop' : 'Go');
  }, [active]);

  return (
    <View style={styles.button}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderColor: colors.lightBlue,
    borderRadius: 90,
    borderWidth: 1,
    backgroundColor: 'rgba(227, 227, 246, 0.15)',
    shadowColor: '#E3E3F6',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  buttonText: {
    color: colors.lightBlue,
    fontStyle: 'italic',
    fontSize: 26,
  },
});

export default ButtonAutoMode;
