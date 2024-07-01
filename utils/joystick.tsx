import React, {useState, useEffect, useRef} from 'react';
import {View, PanResponder, StyleSheet} from 'react-native';

// @ts-ignore
const Joystick = ({radius, innerRadius}) => {
  const [position, setPosition] = useState({x: 0, y: 0});
  const ws = useRef<WebSocket | null>(null);

  const effectiveRadius = radius - innerRadius;

  /*const calculatePower = (x: number, y: number) => {
    const maxPower = 4095;
    const normX = -x / 20;
    const normY = -y / 20;
    let motor1Power = Math.round(maxPower * (normY - normX));
    let motor2Power = Math.round(maxPower * (normY - normX));
    let motor3Power = Math.round(maxPower * (normY + normX));
    let motor4Power = Math.round(maxPower * (normY + normX));
    /!*motor1Power = motor1Power > maxPower ? maxPower : motor1Power;
    motor1Power = motor1Power < -maxPower ? -maxPower : motor1Power;
    motor2Power = motor2Power > maxPower ? maxPower : motor2Power;
    motor2Power = motor2Power < -maxPower ? -maxPower : motor2Power;
    motor3Power = motor3Power > maxPower ? maxPower : motor3Power;
    motor3Power = motor3Power < -maxPower ? -maxPower : motor3Power;
    motor4Power = motor4Power > maxPower ? maxPower : motor4Power;
    motor4Power = motor4Power < -maxPower ? -maxPower : motor4Power;*!/

    return [motor1Power, motor2Power, motor3Power, motor4Power];
  };*/

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

  /*const calculatePower = (x: number, y: number) => {
    const maxPower = 4095;
    const minPower = 500;
    if (x === 0 && y === 0) {
      return [0, 0, 0, 0];
    }

    let motor1Power = 0;
    let motor2Power = 0;
    let motor3Power = 0;
    let motor4Power = 0;

    if (x >= -18 && x <= -2) {
      const scale = (maxPower - minPower) / 20;
      motor1Power = Math.round(maxPower + x * scale);
      motor2Power = motor1Power / 2;
      motor3Power = maxPower;
      motor4Power = maxPower;
    } else if (x >= +2 && x <= 18) {
      const scale = (maxPower - minPower) / 20;
      motor1Power = maxPower;
      motor2Power = maxPower;
      motor3Power = Math.round(maxPower - x * scale);
      motor4Power = motor3Power / 2;
    } else if (x < 2 && x > -2) {
      motor1Power = maxPower;
      motor2Power = maxPower;
      motor3Power = maxPower;
      motor4Power = maxPower;
    } else if (x > 18) {
      motor1Power = maxPower;
      motor2Power = maxPower;
      motor3Power = -maxPower;
      motor4Power = -maxPower;
    } else if (x < -18) {
      motor1Power = -maxPower;
      motor2Power = -maxPower;
      motor3Power = +maxPower;
      motor4Power = +maxPower;
    }
    if (y < 0) {
      return [motor1Power, motor2Power, motor3Power, motor4Power];
    } else {
      return [-motor1Power, -motor2Power, -motor3Power, -motor4Power];
    }
  };*/

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
          ws.current &&
          ws.current?.readyState === WebSocket.OPEN &&
          Date.now() - lastSentTime > 1000
        ) {
          const message = {
            cmd: 1,
            data: power,
          };
          ws.current.send(JSON.stringify(message));
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
          ws.current &&
          ws.current?.readyState === WebSocket.OPEN &&
          Date.now() - lastSentTime > 1000
        ) {
          const message = {
            cmd: 1,
            data: power,
          };
          ws.current.send(JSON.stringify(message));
          lastSentTime = Date.now();
        }
      }
    },
    onPanResponderRelease: () => {
      setPosition({x: 0, y: 0});
      const power = calculatePower(0, 0);
      if (
        ws.current &&
        ws.current?.readyState === WebSocket.OPEN &&
        Date.now() - lastSentTime > 1000
      ) {
        const message = {
          cmd: 1,
          data: power,
        };
        ws.current.send(JSON.stringify(message));
        lastSentTime = Date.now();
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
