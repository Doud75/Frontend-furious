import React from 'react';
import {Dimensions} from 'react-native';
import WebView from 'react-native-webview';
import {useWebSocket} from '../context/WebSocketContext.tsx';

const {width, height} = Dimensions.get('window');

const Camera: React.FC = () => {
  const [ws] = useWebSocket();
  if (ws && ws.readyState === WebSocket.OPEN) {
    const message = {
      cmd: 9,
      data: 1,
    };
    ws.send(JSON.stringify(message));
  }
  return (
    <WebView
      scalesPageToFit={true}
      bounces={false}
      javaScriptEnabled
      style={{height: width, width: height}}
      source={{
        html: `
          <img style="display: block;-webkit-user-select: none;margin: auto;" src="http://192.168.13.12:7000/" width="100%" alt="">
        `,
      }}
      automaticallyAdjustContentInsets={false}
    />
  );
};
export default Camera;
