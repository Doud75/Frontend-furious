// ButtonComponent.js
import React, {useEffect, useRef} from 'react';
import {TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';

const Klaxon = () => {
    const ws = useRef<WebSocket | null>(null);
    const showAlert = () => {
        
        if ( ws.current && ws.current?.readyState === WebSocket.OPEN){
            const message = [1,10000]
            console.log(JSON.stringify(message))
            ws.current.send(JSON.stringify(message));
            setTimeout(stop,200)
        }
    
    };
    
    const stop = () => {
        if ( ws.current && ws.current?.readyState === WebSocket.OPEN) {
            const messages2 = [0,1]
            console.log(messages2)
            ws.current.send(JSON.stringify(messages2));
        }
    }

    useEffect(() => {
        ws.current = new WebSocket('ws://192.168.13.12/grp4');

        ws.current.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.current.onmessage = e => {
            console.log('Received message: ', e.data);
        };

        ws.current.onerror = e => {
            console.log('WebSocket error: ', e.message);
        };

        ws.current.onclose = e => {
            console.log('WebSocket closed: ', e.code, e.reason);
        };

        return () => {
            ws.current?.close();
        };
    }, []);
    
    return (
        <TouchableOpacity style={styles.button} onPress={showAlert}>
            <Text style={styles.buttonText}>Klaxon</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Klaxon;
