import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types.ts';
import {useIsFocused} from '@react-navigation/native';
import globalStyles from '../assets/styles/globalStyles.tsx';
import BackButton from '../components/BackButton.tsx';
import colors from '../assets/styles/colors.tsx';
import {getFetch} from '../helpers/fetch.js';
import {apiUrlBack} from '../config.json';

type RaceListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RaceList'
>;

interface Race {
  id: string;
  name: string;
  tourCount: string;
}
const RaceListScreen: React.FC<RaceListScreenProps> = ({navigation}) => {
  const [races, setRace] = useState<Race[]>([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    /*fetch(`${apiUrlBack}/race`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Réponse HTTP : ${response.status}`);
        }
        return response.json();
      })*/
    getFetch(`${apiUrlBack}/race`)
      .then(data => {
        setRace(data ?? []);
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
  }, [isFocused]);

  return (
    <View style={[globalStyles.background]}>
      <BackButton />

      <Text style={[globalStyles.title1, styles.title]}>
        Rejoindre une course
      </Text>

      {races?.length ? (
        <SafeAreaView style={styles.safeArea}>
          <FlatList
            data={races}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.raceRowContainer} key={item.id}>
                <Text style={[globalStyles.paragraph, styles.raceRowLabel]}>
                  {item.name}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Racing', {
                      raceId: item.id,
                      tourCount: item.tourCount,
                    });
                  }}>
                  <Text style={styles.raceRowButton}>Rejoindre</Text>
                </TouchableOpacity>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            bounces={false}
            overScrollMode="never"
          />
        </SafeAreaView>
      ) : (
        <View style={styles.noRaceContainer}>
          <Text style={styles.noRaceText}>
            Aucune course à rejoindre pour le moment
          </Text>
        </View>
      )}
    </View>
  );
};

export default RaceListScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginBottom: -28,
  },

  title: {
    marginBottom: 12,
  },

  raceRowContainer: {
    marginBottom: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: colors.grey,
  },

  raceRowLabel: {
    fontFamily: 'Roboto-Light',
  },

  raceRowButton: {
    color: colors.primary,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },

  noRaceContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },

  noRaceText: {
    color: colors.greyLight,
    fontFamily: 'Roboto-Light',
    fontSize: 16,
  },
});
