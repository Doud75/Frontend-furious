import React, {
  createContext,
  useEffect,
  PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../reducer/store.tsx";

const WebSocketContext = createContext<
  | [WebSocket | undefined, Dispatch<SetStateAction<WebSocket | undefined>>]
  | undefined
>(undefined)



export const WebSocketProvider: React.FC<PropsWithChildren> = ({children, camera = false}) => {
  const [ws, setWs] = useState<WebSocket>();
  const formData = useSelector((state: RootState) => state.formData);
  
  useEffect(() => {
    console.log(formData.ip)

    const localWs = new WebSocket(`ws://${formData.ip}/${formData.ws}`);
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
      localWs.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={[ws, setWs]}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = React.useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
