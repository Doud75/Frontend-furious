// ColorPicker.tsx
import React from 'react';
import {View} from 'react-native';
import ColorChoice from "../utils/colorChoice.tsx";
import {WebSocketProvider} from "../context/WebSocketContext.tsx";

const CustomScreen: React.FC = () => {
    return (
        <WebSocketProvider camera={true} track={false} nbPlayer={"0"}>
            <View>
                <ColorChoice/>
            </View>
        </WebSocketProvider>
    );
};

export default CustomScreen;