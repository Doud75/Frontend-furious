import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {useWebSocket} from "../context/WebSocketContext.tsx";

const Custom = () => {
    const [ws] = useWebSocket();

    const Color = () => {
        
    }
    
    return(
        <View style={styles.container}>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        color: 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

export default Custom;
