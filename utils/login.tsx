import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {setFormData} from '../reducer/actions';
import {useDispatch, useSelector} from 'react-redux';
import {apiUrlBack} from '../config.json';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types.ts';
import colors from '../assets/styles/colors.tsx';
import {postFetch} from '../helpers/fetch';
import ButtonPrimary from '../components/buttons/ButtonPrimary.tsx';

interface StateProps {
  formData: FormDataProps;
}

interface FormDataProps {
  ip: string;
  topic: string;
  username: string;
  id: number;
}

type LoginProps = {
  navigation: NativeStackScreenProps<RootStackParamList, 'Login'>['navigation'];
};

const Login: React.FC<LoginProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const formData = useSelector((state: StateProps) => state.formData);
  const [formState, setFormState] = useState<FormDataProps>(formData);
  const [required, setRequired] = useState(false);

  // const onPressButton = () => {
  //   () => navigation.navigate('Custom')
  // };

  const handleChange = (name: string, value: string) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const signIn = async () => {
    const username = formState.username;
    const ip = formState.ip;
    const topic = formState.topic;

    if (username == null || ip == null || topic == null) {
      setRequired(true);
      return;
    }
    try {
      return await postFetch(`${apiUrlBack}/signin`, {
        username,
        ip,
      });
      /*const response = await fetch(`${apiUrlBack}/signin`, {
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

      return response.json();*/
    } catch (error) {
      console.log('Error submitting data:', error);
    }
  };

  const handleSubmit = async () => {
    setRequired(false);
    if (!formState.username || !formState.ip || !formState.topic) {
      setRequired(true);
      return;
    }
    const loginResponse = await signIn();
    formState.id = loginResponse.data.id;
    dispatch(setFormData(formState));
    navigation.navigate('Player');
  };

  return (
    <View>
      {required && (
        <Text style={styles.requiredText}>
          Veuillez remplir tout les champs
        </Text>
      )}

      <TextInput
        placeholderTextColor="grey"
        style={styles.input}
        placeholder="IP"
        value={formState.ip || ''}
        onChangeText={text => handleChange('ip', text)}
      />

      <TextInput
        placeholderTextColor="grey"
        style={styles.input}
        placeholder="Topic"
        value={formState.topic || ''}
        onChangeText={text => handleChange('topic', text)}
      />

      <TextInput
        placeholderTextColor="grey"
        style={styles.input}
        placeholder="Username"
        value={formState.username || ''}
        onChangeText={text => handleChange('username', text)}
      />

      <ButtonPrimary
        text="Se connecter"
        onPress={handleSubmit}
        iconSource={require('../assets/images/icons/icon-lightning.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: colors.white,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 8,
  },
  requiredText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default Login;
