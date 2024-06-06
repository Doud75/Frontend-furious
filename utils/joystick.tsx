import React, {useState} from 'react';
import {View, PanResponder, StyleSheet} from 'react-native';

// @ts-ignore
const Joystick = ({radius, innerRadius}) => {
  const [position, setPosition] = useState({x: 0, y: 0});

  const effectiveRadius = radius - innerRadius;

  const logPosition = (x: number, y: number) => {
    console.log({x: x.toFixed(1), y: y.toFixed(1)});
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      const newX = position.x + gesture.dx;
      const newY = position.y + gesture.dy;

      const distance = Math.sqrt(Math.pow(newX, 2) + Math.pow(newY, 2));

      if (distance < effectiveRadius) {
        setPosition({x: newX, y: newY});
        logPosition(newX, newY);
      } else {
        const angle = Math.atan2(newY, newX);
        setPosition({
          x: Math.cos(angle) * effectiveRadius,
          y: Math.sin(angle) * effectiveRadius,
        });
        logPosition(
          Math.cos(angle) * effectiveRadius,
          Math.sin(angle) * effectiveRadius,
        );
      }
    },
    onPanResponderRelease: () => {
      setPosition({x: 0, y: 0});
      logPosition(0, 0);
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
