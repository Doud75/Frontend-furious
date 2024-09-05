import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import colors from '../../assets/styles/colors.tsx';

const ButtonAutoMode = () => {
  const [buttonText, setButtonText] = useState('Go');

  const handleAutoMode = () => {
    if (buttonText === 'Go') {
      setButtonText('Stop');
      console.log('c parti mon kiki');
    } else {
      setButtonText('Go');
      console.log('c finit bouuh');
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPressIn={() => handleAutoMode()}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
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
    fontSize: 2,
  },
});

export default ButtonAutoMode;
