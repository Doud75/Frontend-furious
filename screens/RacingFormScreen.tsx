import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text, ScrollView} from 'react-native';
import {RootStackParamList} from '../types/types.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {apiUrlBack} from '../config.json';
import {postFetch} from '../helpers/fetch';
import BackButton from '../components/BackButton.tsx';
import globalStyles from '../assets/styles/globalStyles.tsx';
import ButtonPrimary from '../components/buttons/ButtonPrimary.tsx';

type RacingFormScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RacingForm'
>;
const RacingForm: React.FC<RacingFormScreenProps> = ({navigation}) => {
  const [raceName, setRaceName] = useState('');
  const [tourCount, setTourCount] = useState('2');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const dataRace = await createRace();
    navigation.navigate('Racing', {
      raceId: dataRace.raceId,
      tourCount,
    });
  };

  async function createRace() {
    if (raceName) {
      return await postFetch(`${apiUrlBack}/create-race`, {
        raceName,
        tourCount,
      });
      /*const response = await fetch(`${apiUrlBack}/create-race`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          raceName,
          tourCount,
        }),
      });

      if (!response.ok) {
        throw new Error(`Reponse HTTP : ${response.status}`);
      }

      return response.json();*/
    } else {
      setError('Veuillez remplir tout les champs');
    }
  }

  return (
    <View style={[globalStyles.background]}>
      <BackButton />

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <Text style={[globalStyles.title1, styles.title]}>
          Créer une course
        </Text>

        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <TextInput
          onChangeText={name => setRaceName(name)}
          placeholder="Nom de la course"
          placeholderTextColor="grey"
          style={styles.input}
          value={raceName || ''}
        />

        <TextInput
          onChangeText={tour => setTourCount(tour)}
          placeholder="Nombre de tours"
          placeholderTextColor="grey"
          style={styles.input}
          value={tourCount || ''}
        />

        <ButtonPrimary
          text="Créer"
          onPress={createRace}
          iconSource={require('../assets/images/icons/icon-lightning.png')}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginBottom: 12,
  },
  input: {
    color: 'white',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 8,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default RacingForm;
