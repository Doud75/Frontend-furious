import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import globalStyles from '../../assets/styles/globalStyles';
import colors from '../../assets/styles/colors';

interface ButtonSecondaryProps {
  navigationScreen?: {
    screenName: string;
    params?: object;
  };
  navigation?: any;
  text: string;
  onPress: any;
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({text, onPress}) => {
  const handleSubmit = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button]} onPress={handleSubmit}>
        <Text style={[globalStyles.paragraph, styles.text]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: colors.white,
    borderWidth: 1,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
});

export default ButtonSecondary;
