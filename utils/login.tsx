import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import {setFormData} from "../reducer/actions";
import {Provider, useDispatch, useSelector} from "react-redux";
import store from "../reducer/store.tsx";
const Login = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const formData = useSelector(state => state.formData);
    const [formState, setFormState] = useState(formData);

    const handleChange = (name: string, value: string) => {
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        dispatch(setFormData(formState));

        console.log(formState)
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="IP"
                value={formState.ip || ''}
                onChangeText={(text) => handleChange('ip', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Ws"
                value={formState.ws || ''}
                onChangeText={(text) => handleChange('ws', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={formState.username || ''}
                onChangeText={(text) => handleChange('username', text)}
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
