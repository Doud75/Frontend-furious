import React, {
  createContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../reducer/store.tsx';

const WebSocketContext = createContext<
  | [WebSocket | undefined, Dispatch<SetStateAction<WebSocket | undefined>>]
  | undefined
>(undefined);

interface webSocketProps {
  children: ReactNode;
  camera: boolean;
  track: boolean;
  nbPlayer: string;
}

export const WebSocketProvider: React.FC<webSocketProps> = ({
  children,
  camera = false,
  track = false,
  nbPlayer = '',
}) => {
  const [ws, setWs] = useState<WebSocket>();
  const formData = useSelector((state: RootState) => state.formData);

  useEffect(() => {
    console.log(formData.ip);

    const localWs = new WebSocket(`ws://${formData.ip}/${formData.topic}`);
    setWs(localWs);

    localWs.onopen = () => {
      console.log('WebSocket connected');
      if (camera) {
        const message = {
          cmd: 9,
          data: 1,
        };
        localWs.send(JSON.stringify(message));
        console.log('camera on');
      }
      if (track) {
        const message2 = {
          cmd: 10,
          data: 1,
        };
        localWs.send(JSON.stringify(message2));
        console.log('track on');
      }
      if (nbPlayer !== '') {
        const message3 = {
          cmd: 4,
          data: 0,
        };
        localWs.send(JSON.stringify(message3));
        console.log('led off');
        const message4 = {
          cmd: 4,
          data: 1,
        };
        localWs.send(JSON.stringify(message4));
        console.log('led ready');
        let itemValue = nbPlayer === '1' ? [1, 255, 0, 0] : [1, 0, 0, 255];
        while (itemValue[0] <= 2048) {
          const message5 = {
            cmd: 5,
            data: itemValue,
          };
          localWs.send(JSON.stringify(message5));
          itemValue[0] = itemValue[0] * 2;
        }
      }
    };

    localWs.onmessage = e => {
      console.log('Received message: ', e.data);
    };

    localWs.onerror = e => {
      console.log('WebSocket error: ', (e as any).message);
    };

    localWs.onclose = e => {
      console.log('WebSocket closed: ', e.code, e.reason);
    };

    return () => {
      stopCamAndTrack(localWs);
      localWs.close();
    };
  }, [camera, formData.ip, formData.topic, nbPlayer, track]);

  return (
    <WebSocketContext.Provider value={[ws, setWs]}>
      {children}
    </WebSocketContext.Provider>
  );
};

function stopCamAndTrack(localWs: WebSocket) {
  const message = {
    cmd: 9,
    data: 0,
  };
  localWs.send(JSON.stringify(message));
  console.log('camera on');
  const message2 = {
    cmd: 10,
    data: 0,
  };
  localWs.send(JSON.stringify(message2));
  console.log('track on');
}

export const useWebSocket = () => {
  const context = React.useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
