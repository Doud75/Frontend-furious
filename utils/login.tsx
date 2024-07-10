import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
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
  topic: string;
  username: string;
  id : number;
}

type LoginProps = {
  navigation: NativeStackScreenProps<RootStackParamList, 'Login'>['navigation'];
};

const Login: React.FC<LoginProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const formData = useSelector((state: StateProps) => state.formData);
  const [formState, setFormState] = useState<FormDataProps>(formData);
  const [required, setRequired] = useState('');
  const [loginResponse, setLoginResponse] = useState('');
  
  
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
    
    
    if(username == null || ip == null || topic == null){
      let requiredString = "Veuillez remplir tout les champs"
      setRequired(requiredString)
      
      return
    }
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

      setLoginResponse(await response.json())
      dispatch(setFormData(loginResponse));
      navigation.navigate('Home');      
    } catch (error) {
      console.log('Error submitting data:', error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signIn();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {required}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="IP"
        value={formState.ip || ''}
        onChangeText={text => handleChange('ip', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="topic"
        value={formState.topic || ''}
        onChangeText={text => handleChange('topic', text)}
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
  text: {
    color: 'red',
    height: 40,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default Login;
