import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Custom = () => {
    return(
        <View style={styles.container}>
            <Text>Custom</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

export default Custom;
