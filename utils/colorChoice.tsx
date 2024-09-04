import React, {useState} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import ScrollView = Animated.ScrollView;
import {useWebSocket} from '../context/WebSocketContext.tsx';


type ColorTuple = [string, number[]];
type ColorArray = ColorTuple[];

const colors: ColorArray = [['red', [1, 255, 0, 0]], ['green', [1, 0, 255, 0]], ['blue', [1, 0, 0, 255]], ['yellow', [1, 255, 255, 0]], ['orange', [1, 255, 79, 0]], ['purple', [1, 255, 0, 255]]];


const changeAllLedColor = (ws: WebSocket, itemValue: number[]) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        let compt = 1
        while (compt <= 2048) {
            itemValue[0] = compt
            changeLedColor(ws,itemValue)
            compt = compt * 2
        }
    }
};

const changeLedColor = (ws : WebSocket,itemValue: number[]) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        console.log(itemValue)
        const message = {
            cmd: 5,
            data: itemValue,
        };
        ws.send(JSON.stringify(message));

    }
}

const ColorChoice: React.FC = () => {
    const [selectedColor, setSelectedColor] = useState<ColorTuple | undefined>(undefined);
    const [ws] = useWebSocket();
    const handleSubmit = (itemValue: ColorTuple) => {
        if (ws){
        changeAllLedColor(ws,itemValue[1])
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Choisissez une couleur pour toute les led:</Text>
            <Picker
                selectedValue={selectedColor}
                onValueChange={(itemValue: ColorTuple | undefined) => {
                    setSelectedColor(itemValue);
                    if (itemValue) handleSubmit(itemValue);
                }}
                style={styles.picker}
            >
                <Picker.Item label="Choisissez une couleur pour toute les led:" value={undefined}/>
                {colors.map((color) => (
                    <Picker.Item key={color[0]} label={color[0]} value={color}/>
                ))}
            </Picker>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,

    },
    title: {
        color: 'black',
        fontSize: 24,
        marginBottom: 16,
    },
    picker: {
        color: 'black',
        height: 50,
        width: 250,
        marginBottom: 16,
    },
    selectedColorText: {
        color: 'black',
        marginTop: 16,
        fontSize: 18,
    },
});

export default ColorChoice;
