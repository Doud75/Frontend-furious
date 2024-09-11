import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import colors from '../../assets/styles/colors';

interface ButtonIconProps {
  navigationScreen?: {
    screenName: string;
    params?: object;
  };
  navigation?: any;
  iconSource?: any;
  style?: any;
  link?: string;
  handlePress?: any;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  iconSource,
  style,
  navigation,
  link,
  handlePress,
}) => {
  const onPress = () => {
    link && navigation.navigate(link);

    handlePress && handlePress();
  };

  return (
    <TouchableOpacity style={[style, styles.container]} onPress={onPress}>
      <Image source={iconSource} style={styles.icon} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primary,
    padding: 10,
    borderRadius: 90,
    borderWidth: 1,
    backgroundColor: colors.grey,
    shadowColor: '#576FEF',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 19,
    width: 50,
    height: 50,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});

export default ButtonIcon;
