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
        // Fake data
        // setRace([
        //   {id: '19', name: 'Nom de la course'},
        //   {id: '9', name: 'Nom de la course 2'},
        //   {id: '2', name: 'Nom de la course 3'},
        //   {id: '3', name: 'Nom de la course 4'},
        //   {id: '123', name: 'Nom de la course 5'},
        //   {id: '313', name: 'Nom de la course 6'},
        // ]);
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
        <SafeAreaView>
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
                    navigation.navigate('FreeRace', {
                      raceId: item.id,
                    });
                  }}>
                  <Text style={styles.raceRowButton}>Rejoindre</Text>
                </TouchableOpacity>
              </View>
            )}
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
