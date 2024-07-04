import React, { useEffect } from "react";
import {Dimensions, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import {useWebSocket} from '../context/WebSocketContext.tsx';
import {useSelector} from "react-redux";
import {RootState} from "../reducer/store.tsx";

const {width, height} = Dimensions.get('window');
console.log({width});
console.log({height});


const Camera: React.FC = () => {
    const formData = useSelector((state: RootState) => state.formData);

    return (
    <WebView
      scalesPageToFit={true}
      bounces={false}
      javaScriptEnabled
      style={{height: height, width: width}}
      // class={styles.camera}
      source={{
        html: `
            <img 
              style="
                display: block; 
                -webkit-user-select: none; 
                margin: auto;
                padding: 5px;
                background-color: green;
                width: 100%;
                height: 100%;
                object-fit: cover;
              "
              src="http://${formData.ip}:7000/" 
              alt=""
              width="100%"
            >
        `,
      }}
      automaticallyAdjustContentInsets={false}
    />
  );
};

const styles = StyleSheet.create({
  camera: {
    width: 300,
    padding: 30,
    backgroundColor: 'red'
  }
});

export default Camera;
