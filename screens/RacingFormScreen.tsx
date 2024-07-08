import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import {RootStackParamList} from '../types/types.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {apiUrlBack} from '../config.json';

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
      raceName: dataRace.raceName,
    });
  };

  async function createRace() {
    if (raceName) {
      const response = await fetch(`${apiUrlBack}/createRace`, {
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

      return response.json();
    } else {
      setError('Veuillez spécifier un nom de course.');
    }
  }

  return (
    <View style={styles.container}>
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Nom de la course"
        value={raceName || ''}
        onChangeText={name => setRaceName(name)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom de la course"
        value={tourCount || '2'}
        onChangeText={tour => setTourCount(tour)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    color: 'black',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  error: {
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default RacingForm;
