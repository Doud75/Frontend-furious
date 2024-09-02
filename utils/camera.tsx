import React from 'react';
import {Dimensions} from 'react-native';
import WebView from 'react-native-webview';
import {useSelector} from 'react-redux';
import {RootState} from '../reducer/store.tsx';

const {width, height} = Dimensions.get('window');

const Camera: React.FC = () => {
  const formData = useSelector((state: RootState) => state.formData);

  return (
    <WebView
      scalesPageToFit={true}
      bounces={false}
      javaScriptEnabled
      style={{height: width, width: height}}
      source={{
        html: `
          <img style="display: block;-webkit-user-select: none;margin: auto;" src="http://${formData.ip}:7000/" width="100%" alt="">
        `,
      }}
      automaticallyAdjustContentInsets={false}
    />
  );
};
export default Camera;
