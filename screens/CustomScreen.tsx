// ColorPicker.tsx
import React from 'react';
import {View} from 'react-native';
import ColorChoice from "../utils/colorChoice.tsx";
import {WebSocketProvider} from "../context/WebSocketContext.tsx";
import globalStyles from '../assets/styles/globalStyles.tsx';

const CustomScreen: React.FC = () => {
    return (
        <WebSocketProvider camera={true} track={false} nbPlayer={"0"}>
            <View style={[globalStyles.background]}>
                <ColorChoice/>
            </View>
        </WebSocketProvider>
    );
};

export default CustomScreen;
