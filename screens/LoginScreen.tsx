import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import {setFormData} from "../reducer/actions";
import {Provider, useDispatch} from "react-redux";
import store from "../reducer/store.tsx";
import Login from "../utils/login.tsx";
const LoginScreen = ({ navigation }:any) => {

    return (
        <>
            <Login></Login>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        color:'black',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
});

export default LoginScreen;
