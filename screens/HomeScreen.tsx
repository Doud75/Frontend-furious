import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// @ts-ignore
const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home Screen</Text>
            <Button
                title="Mode libre"
                onPress={() => navigation.navigate('FreeRace')}
            />
            <Button
                title="Mode course"
                onPress={() => navigation.navigate('Racing')}
            />
            <Button
                title="Personnalisation"
                onPress={() => navigation.navigate('Custom')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
    },
});

export default HomeScreen;
