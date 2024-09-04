import React, {useState} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import ScrollView = Animated.ScrollView;
import {useWebSocket} from '../context/WebSocketContext.tsx';
import globalStyles from '../assets/styles/globalStyles.tsx';
import colors from '../assets/styles/colors.tsx';

type ColorTuple = {
    color: string, 
    code: number[], 
    hexa: string
};
type ColorArray = ColorTuple[];

const colorsLed: ColorArray = [
    {
        color: 'Jaune', 
        code: [1, 255, 255, 0], 
        hexa: '#E7DC00'
    }, 
    {
        color: 'Orange', 
        code: [1, 255, 79, 0], 
        hexa: '#EF9800'
    }, 
    {
        color: 'Rouge', 
        code: [1, 255, 0, 0], 
        hexa: '#D00000'
    }, 
    {
        color: 'Violet', 
        code: [1, 255, 0, 255], 
        hexa: '#B05CFF'
    },
    {
        color: 'Bleu', 
        code: [1, 0, 0, 255], 
        hexa: '#00C8FF'
    }, 
    {
        color: 'Vert', 
        code: [1, 0, 255, 0], 
        hexa: '#01D72C'
    }, 
];


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

const changeLedColor = (ws : WebSocket, itemValue: number[]) => {
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
    const handlePress = (itemValue: ColorTuple) => {
        console.log({itemValue});
        setSelectedColor(itemValue)
        if (ws){
            changeAllLedColor(ws,itemValue.code)
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={[globalStyles.title32, styles.title]}>Personnalisation</Text>
            <Text style={[globalStyles.paragraph, styles.paragraph]}>Personnalise les couleurs des leds de ta voiture pour un maximum de style !</Text>
            <View style={styles.colorsList}>
                {
                    colorsLed.map((color, index) => {                       
                        return (
                            <TouchableOpacity key={index} style={[styles.button, selectedColor === color && styles.buttonActive]} onPress={() => handlePress(color)}>
                                <View style={[styles.round, {backgroundColor: color.hexa}]}></View>
                                <Text style={[globalStyles.paragraph, styles.textButton]}>{color.color}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    title: {
        marginBottom: 8,
    },
    paragraph: {
        marginBottom: 32,
    },
    picker: {
        color: 'black',
        height: 50,
        width: 250,
        marginBottom: 16,
    },
    colorsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 24,
        justifyContent: 'center',
    },
    selectedColorText: {
        color: 'black',
        marginTop: 16,
        fontSize: 18,
    },
    button: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        borderColor: colors.primary,
        borderWidth: 1,
    },
    buttonActive: {
        backgroundColor: colors.grey,
        shadowColor: '#576FEF', 
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 19, 
    },
    textButton: {
        lineHeight: 20,
    },
    round: {
        width: 10,
        height: 10,
        marginRight: 4,
        borderRadius: 90,
    },
});

export default ColorChoice;
