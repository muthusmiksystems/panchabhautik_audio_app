import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Sound from 'react-native-sound';
import pause from '../assets/images/pause.png';
import playarrow from '../assets/images/play-button.png';
import next from '../assets/images/pause.png';
import back from '../assets/images/play-button.png';

const FullScreenPlayer = ({ audio }: { audio: AudioFile }) => {
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    // Load the selected audio file when the component mounts
    if (audio && audio.path) {
      const newSound = new Sound(audio.path, '', error => {
        if (error) {
          console.error('Error loading sound:', error);
          return;
        }
        setSound(newSound);
      });
    }

    // Cleanup function to release the sound when the component unmounts
    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  const playPause = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipToNext = () => {
    // Logic to skip to the next track
  };

  const skipToPrevious = () => {
    // Logic to skip to the previous track
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{audio.name}</Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={skipToPrevious}>
          <Image source={back} style={styles.controlButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={playPause}>
          <Image source={isPlaying ? pause : playarrow} style={styles.controlButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToNext}>
          <Image source={next} style={styles.controlButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
});

export default FullScreenPlayer;
