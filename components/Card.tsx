import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import globalStyles from '../assets/styles/globalStyles';
import colors from '../assets/styles/colors';

interface CardProps {
  navigationScreen?: {
    screenName: string;
    params?: object;
  };
  navigation: any;
  text1: string;
  text2: string;
  imageSource: any;
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({
  text1,
  text2,
  imageSource,
  navigationScreen,
  navigation,
  style,
}) => {
  const handlePress = () => {
    if (navigationScreen) {
      const {screenName, params} = navigationScreen;
      navigation.navigate(screenName, params);
    }
  };

  return (
    <TouchableOpacity style={[styles.card, style]} onPress={handlePress}>
      <View>
        <Text style={[globalStyles.paragraph, styles.text1]}>{text1}</Text>
        <Text style={[globalStyles.title3, styles.text2]}>{text2}</Text>
      </View>
      <Image
        source={imageSource}
        style={styles.boxImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.grey,
    padding: 20,
    borderRadius: 24,
    borderColor: colors.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 60,
  },
  text1: {
    textAlign: 'center',
    fontFamily: 'Ruda-Regular',
  },
  text2: {
    textAlign: 'center',
  },
  boxImage: {
    width: '80%',
    position: 'absolute',
    bottom: -30,
  },
});

export default Card;
