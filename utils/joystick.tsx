import React, {useState} from 'react';
import {View, PanResponder, StyleSheet} from 'react-native';
import {useWebSocket} from '../context/WebSocketContext';

interface JoystickProps {
  radius: number;
  innerRadius: number;
}

const Joystick: React.FC<JoystickProps> = ({radius, innerRadius}) => {
  const [position, setPosition] = useState({x: 0, y: 0});
  const [ws] = useWebSocket();

  const effectiveRadius = radius - innerRadius;

  const calculatePower = (x: number, y: number) => {
    const maxPower = 4095;
    const normX = x / 20;
    const normY = -y / 20;

    let leftMotorPower = Math.round(maxPower * (normY + normX));
    let rightMotorPower = Math.round(maxPower * (normY - normX));
    leftMotorPower = Math.max(Math.min(leftMotorPower, maxPower), -maxPower);
    rightMotorPower = Math.max(Math.min(rightMotorPower, maxPower), -maxPower);

    return [leftMotorPower, leftMotorPower, rightMotorPower, rightMotorPower];
  };

  let lastSentTime = 0;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      const newX = position.x + gesture.dx;
      const newY = position.y + gesture.dy;

      const distance = Math.sqrt(Math.pow(newX, 2) + Math.pow(newY, 2));

      if (distance < effectiveRadius) {
        setPosition({x: newX, y: newY});
        const power = calculatePower(newX, newY);
        if (
          ws &&
          ws.readyState === WebSocket.OPEN &&
          Date.now() - lastSentTime > 1000
        ) {
          const message = {
            cmd: 1,
            data: power,
          };
          ws.send(JSON.stringify(message));
          lastSentTime = Date.now();
        }
      } else {
        const angle = Math.atan2(newY, newX);
        setPosition({
          x: Math.cos(angle) * effectiveRadius,
          y: Math.sin(angle) * effectiveRadius,
        });
        const power = calculatePower(
          Math.cos(angle) * effectiveRadius,
          Math.sin(angle) * effectiveRadius,
        );
        if (
          ws &&
          ws.readyState === WebSocket.OPEN &&
          Date.now() - lastSentTime > 1000
        ) {
          const message = {
            cmd: 1,
            data: power,
          };
          ws.send(JSON.stringify(message));
          lastSentTime = Date.now();
        }
      }
    },
    onPanResponderRelease: () => {
      setPosition({x: 0, y: 0});
      const power = calculatePower(0, 0);
      if (
        ws &&
        ws.readyState === WebSocket.OPEN &&
        Date.now() - lastSentTime > 1000
      ) {
        const message = {
          cmd: 1,
          data: power,
        };
        ws.send(JSON.stringify(message));
        lastSentTime = Date.now();
      }
    },
  });

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
