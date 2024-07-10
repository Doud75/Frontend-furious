import React from 'react';
import {View, Text, Button, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {RootStackParamList} from '../types/types.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import globalStyles from '../assets/styles/globalStyles';
import colors from '../assets/styles/colors';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <View style={globalStyles.background}>
      <View style={styles.textContainer}>
        <Text style={[globalStyles.title1, styles.title1]}>
          Vroum vroum 2024
        </Text>
        <Text style={globalStyles.paragraph}>
          Choisis ton mode de conduite et bla bla bla blabuucdl jkuklszb fzviafjioef zefkgufzlfzie faugaofgie
        </Text>
      </View>
      <View style={styles.boxContainer}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('FreeRace')}>
          <View>
            <Text style={[globalStyles.paragraph, styles.boxText]}>
              mode
            </Text>
            <Text style={[globalStyles.paragraph, styles.boxTextMode]}>
              libre
            </Text>
          </View>
          <Image
            source={require('../assets/images/vroum1.png')}
            style={styles.boxImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.box}>
          <View>
            <Text style={[globalStyles.paragraph, styles.boxText]}>
              mode
            </Text>
            <Text style={[globalStyles.paragraph, styles.boxTextMode]}>
              course
            </Text>
          </View>
          <Image
            source={require('../assets/images/vroum1.png')}
            style={styles.boxImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.box}>
          <View>
            <Text style={[globalStyles.paragraph, styles.boxText]}>
              mode
            </Text>
            <Text style={[globalStyles.paragraph, styles.boxTextMode]}>
              automatique
            </Text>
          </View>
          <Image
            source={require('../assets/images/vroum1.png')}
            style={styles.boxImage}
            resizeMode="contain"
          />
        </View>
      </View>
      
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button
        title="Mode libre"
        onPress={() =>
          navigation.navigate('FreeRace', {
            raceId: '',
          })
        }
      />
      <Button
        title="Personnalisation"
        onPress={() => navigation.navigate('Custom')}
      />
      <Button
        title="Liste des courses"
        onPress={() => navigation.navigate('RaceList')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 40,
  },
  title1: {
    marginBottom: 8,
  },
  boxContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  box: {
    backgroundColor: colors.grey,
    padding: 20,
    borderRadius: 24,
    borderColor: colors.primary,
    borderWidth: 1,
    justifyContent: 'center',
    width: '30%',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 70
  },
  boxTextMode: {
    fontSize: 24,
    fontWeight: 800,
    textAlign: 'center',
  },
  boxText: {
    textAlign: 'center',
  },
  boxImage: {
    width: '80%',
    position: 'absolute',
    bottom: -30,
  }
});

export default HomeScreen;
