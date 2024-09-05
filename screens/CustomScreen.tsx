// ColorPicker.tsx
import React from 'react';
import {View} from 'react-native';
import ColorChoice from '../utils/colorChoice.tsx';
import {WebSocketProvider} from '../context/WebSocketContext.tsx';
import globalStyles from '../assets/styles/globalStyles.tsx';
import BackButton from '../components/BackButton.tsx';

const CustomScreen: React.FC = () => {
  return (
    <WebSocketProvider camera={false} track={false} nbPlayer={'0'}>
      <View style={[globalStyles.background]}>
        <BackButton />
        <ColorChoice />
      </View>
    </WebSocketProvider>
  );
};

export default CustomScreen;
