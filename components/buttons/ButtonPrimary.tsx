import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import globalStyles from '../../assets/styles/globalStyles';
import colors from '../../assets/styles/colors';

interface ButtonPrimaryProps {
  navigationScreen?: {
    screenName: string;
    params?: object;
  };
  navigation?: any;
  text: string;
  iconSource?: any;
  onPress: any;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  text,
  iconSource,
  onPress,
}) => {
  const handleSubmit = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button]} onPress={handleSubmit}>
        <Text style={[globalStyles.paragraph, styles.text]}>{text}</Text>
        {iconSource && (
          <Image source={iconSource} style={styles.icon} resizeMode="contain" />
        )}
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },
  icon: {
    height: 23,
    marginLeft: 8,
  },
});

export default ButtonPrimary;
