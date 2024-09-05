import React from 'react';
import colors from '../assets/styles/colors.tsx';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useWebSocket} from '../context/WebSocketContext.tsx';

const tokyoDrift = [
  {
    hz: 466.32, // Bb
    duration: 400,
    pause: 50,
  },
  {
    hz: 466.32, // Bb
    duration: 400,
    pause: 50,
  },
  {
    hz: 466.32, // Bb
    duration: 400,
    pause: 50,
  },
  {
    hz: 466.32, // Bb
    duration: 400,
    pause: 50,
  },
  {
    hz: 466.32, // Bb
    duration: 400,
    pause: 50,
  },
  {
    hz: 493.88, // B
    duration: 300,
    pause: 50,
  },
  {
    hz: 622.26, // Eb
    duration: 300,
    pause: 50,
  },
  {
    hz: 466.16, // Bb
    duration: 400,
    pause: 50,
  },
  {
    hz: 466.16, // Bb
    duration: 400,
    pause: 50,
  },
  {
    hz: 466.16, // Bb
    duration: 400,
    pause: 50,
  },
  {
    hz: 493.88, // B
    duration: 300,
    pause: 50,
  },
  {
    hz: 622.26, // Eb
    duration: 300,
    pause: 50,
  },
  {
    hz: 466.16, // Bb
    duration: 400,
    pause: 50,
  },
  {
    hz: 466.16, // Bb
    duration: 400,
    pause: 50,
  },
  {
    hz: 466.16, // Bb
    duration: 400,
    pause: 50,
  },
];

const KlaxonButton = () => {
  const ON = 'on';
  const OFF = 'off';

  const {ws, messageReceived, setMessageReceived} = useWebSocket();

  const Klaxon = (active: string, frequency: number = 0) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const isActive = active === ON ? 1 : 0;
      const message = {
        cmd: 8,
        data: [isActive, frequency],
      };
      ws.send(JSON.stringify(message));
    }
  };

  const playMelody = async () => {
    for (let i = 0; i < tokyoDrift.length; ) {
      Klaxon(ON, tokyoDrift[i]?.hz);

      let messageCheckInterval;
      let timeout;

      try {
        // Wait for messageReceived or timeout
        await new Promise<void>((resolve, reject) => {
          messageCheckInterval = setInterval(() => {
            if (messageReceived) {
              setMessageReceived(false);
              resolve();
            }
          }, 50);

          // Set a timeout to prevent indefinite waiting
          timeout = setTimeout(() => {
            reject(new Error('Timeout waiting for messageReceived'));
          }, 5000); // Adjust timeout duration as needed
        });

        // Klaxon duration
        await new Promise(resolve =>
          setTimeout(resolve, tokyoDrift[i]?.duration),
        );
        Klaxon(OFF);
        // Pause between notes
        await new Promise(resolve => setTimeout(resolve, tokyoDrift[i]?.pause));
        i++;
      } catch (error) {
        Klaxon(OFF);
        break; // Exit the loop on error
      } finally {
        clearInterval(messageCheckInterval);
        clearTimeout(timeout);
      }
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPressIn={() => playMelody()}>
      <Image
        source={require('../assets/images/icons/icon-horn.png')}
        style={styles.buttonIconImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderColor: colors.lightBlue,
    borderRadius: 90,
    borderWidth: 1,
    backgroundColor: 'rgba(227, 227, 246, 0.15)',
    shadowColor: '#E3E3F6',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  buttonIconImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
});

export default KlaxonButton;
