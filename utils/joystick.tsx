import React, {useState, useEffect, useRef} from 'react';
import {View, PanResponder, StyleSheet} from 'react-native';

// @ts-ignore
const Joystick = ({radius, innerRadius}) => {
  const [position, setPosition] = useState({x: 0, y: 0});
  const ws = useRef<WebSocket | null>(null);

  const effectiveRadius = radius - innerRadius;

  const calculatePower = (x: number, y: number) => {
    const maxPower = 4095;
    const normX = -x / 20;
    const normY = -y / 20;
    const motor1Power = Math.round(maxPower * (normY - normX));
    const motor2Power = Math.round(maxPower * (normY - normX));
    const motor3Power = Math.round(maxPower * (normY + normX));
    const motor4Power = Math.round(maxPower * (normY + normX));

    return [motor1Power, motor2Power, motor3Power, motor4Power];
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      const newX = position.x + gesture.dx;
      const newY = position.y + gesture.dy;

      // Calculate distance from center
      const distance = Math.sqrt(Math.pow(newX, 2) + Math.pow(newY, 2));

      // If the move is within the effective radius, update position
      if (distance < effectiveRadius) {
        setPosition({x: newX, y: newY});
        const power = calculatePower(newX, newY);
        // Envoyer les données via WebSocket
        if (ws.current && ws.current?.readyState === WebSocket.OPEN) {
          const message = {
            cmd: 1,
            data: power,
          };
          console.log(power);
          ws.current.send(JSON.stringify(message));
        }
      } else {
        // Limit movement to stay within the effective radius
        const angle = Math.atan2(newY, newX);
        setPosition({
          x: Math.cos(angle) * effectiveRadius,
          y: Math.sin(angle) * effectiveRadius,
        });
        const power = calculatePower(
          Math.cos(angle) * effectiveRadius,
          Math.sin(angle) * effectiveRadius,
        );
        // Envoyer les données via WebSocket
        if (ws.current && ws.current?.readyState === WebSocket.OPEN) {
          const message = {
            cmd: 1,
            data: power,
          };
          console.log(power);
          ws.current.send(JSON.stringify(message));
        }
      }
    },
    onPanResponderRelease: () => {
      // Reset position when the touch is released
      setPosition({x: 0, y: 0});
      const power = calculatePower(0, 0);
      // Envoyer les données via WebSocket
      if (ws.current && ws.current?.readyState === WebSocket.OPEN) {
        const message = {
          cmd: 1,
          data: power,
        };
        console.log(power);
        ws.current.send(JSON.stringify(message));
      }
    },
  });

  useEffect(() => {
    ws.current = new WebSocket('ws://192.168.43.12/grp4');

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = e => {
      console.log('Received message: ', e.data);
    };

    ws.current.onerror = e => {
      console.log('WebSocket error: ', e.message);
    };

    ws.current.onclose = e => {
      console.log('WebSocket closed: ', e.code, e.reason);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  return (
    <View
      style={[
        styles.container,
        {width: radius * 2, height: radius * 2, borderRadius: radius},
      ]}
      {...panResponder.panHandlers}>
      <View
        style={[
          styles.innerCircle,
          {
            width: innerRadius * 2,
            height: innerRadius * 2,
            borderRadius: innerRadius,
            transform: [{translateX: position.x}, {translateY: position.y}],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  innerCircle: {
    backgroundColor: 'blue',
    position: 'absolute',
  },
});

export default Joystick;
