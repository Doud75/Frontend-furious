import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {setFormData} from '../reducer/actions';
import {useDispatch, useSelector} from 'react-redux';
import {apiUrlBack} from '../config.json';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types.ts';

interface StateProps {
  formData: FormDataProps;
}

interface FormDataProps {
  ip: string;
  ws: string;
  username: string;
}

type LoginProps = {
  navigation: NativeStackScreenProps<RootStackParamList, 'Login'>['navigation'];
};

const Login: React.FC<LoginProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const formData = useSelector((state: StateProps) => state.formData);
  const [formState, setFormState] = useState<FormDataProps>(formData);

  const handleChange = (name: string, value: string) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const signIn = async () => {
    const username = formState.username;
    const ip = formState.ip;
    console.log(username);
    console.log(ip);
    try {
      const response = await fetch(`${apiUrlBack}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          ip,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    } catch (error) {
      console.log('Error submitting data:', error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(setFormData(formState));
    const dataRace = await signIn();
    console.log(dataRace);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="IP"
        value={formState.ip || ''}
        onChangeText={text => handleChange('ip', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ws"
        value={formState.ws || ''}
        onChangeText={text => handleChange('ws', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formState.username || ''}
        onChangeText={text => handleChange('username', text)}
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
});

export default Login;
