import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types.ts';
import {apiUrlBack} from '../config.json';
import {useIsFocused} from '@react-navigation/native';
import {getFetch} from '../helpers/fetch';

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
        setRace(data);
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={races}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              navigation.navigate('FreeRace', {
                raceId: item.id,
              });
            }}
            style={styles.conversationItem}>
            <View style={styles.conversationDetails}>
              <View style={styles.nameContentContainer}>
                <Text style={styles.conversationName}>{item.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};
export default RaceListScreen;

const styles = StyleSheet.create({
  touchable: {
    bottom: 24,
  },
  tinyLogo: {
    width: 65,
    height: 65,
    borderRadius: 400,
    left: '100%',
    transform: [{translateX: -80}],
  },
  container: {
    flex: 1,
    padding: 16,
  },
  conversationItem: {
    paddingVertical: 16,
  },
  conversationDetails: {
    flex: 1,
  },
  nameContentContainer: {
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  updatedAt: {
    fontSize: 14,
  },
  conversationContent: {
    fontSize: 16,
    marginBottom: 6,
  },
});
