import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  PermissionsAndroid,
  ToastAndroid,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import { DrawerActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import HeaderComponent from './Components/Header';
import FooterComponent from './Components/Footer';
import Sound from 'react-native-sound';
import pause from '../assets/images/pause.png';
import menu from '../assets/images/menu.png';
import download from '../assets/images/download.png';
import playarrow from '../assets/images/play.png';
import { Card, Image } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import audioFilesMap from './audioFileMap';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import * as Animatable from 'react-native-animatable';
import audio from '../assets/audio/Akash/Akash.mp4';

interface AudioFile {
  name: string;
  path: string;
  isFile: () => boolean;
  duration: number;
}

function ListingScreen() {
  const navigation = useNavigation();
  const audioLists = useSelector((state) => state.audioService.data);
  const name = useSelector((state) => state.audioService.name);
  const [audioList, setAudioList] = useState<AudioFile[]>(audioLists || []);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [position, setPosition] = useState<number | null>(null);
  const [frequencyText, setFrequencyText] = useState<string>('');
  const animatableTextRef = useRef<Animatable.Text>(null);
  const playSound = async (filePath: string, index: number, heading: string) => {
    if (sound && playingIndex === index) {
      sound.stop(() => {
        setIsPlaying(false);
        setSound(null);
        setPlayingIndex(null);
        setPosition(null);
        setFrequencyText('');
      });
    } else {
      if (sound) {
        sound.stop();
        sound.release();
      }

      try {
        let soundPath;
        if (filePath.startsWith('http') || filePath.startsWith('file')) {
          soundPath = filePath;
        } else {
          if (heading === 'Prithvi 1.mp4') {
            soundPath = require('../assets/audio/Prithvi/Prithvi.mp4');
          } else if (heading === 'Prithvi 2.mp4') {
            soundPath = require('../assets/audio/Prithvi/Prithvi_2.mp4');
          } else if (heading === 'Jal.mp4') {
            soundPath = require('../assets/audio/Jal/Jal.mp4');
          } else if (heading === 'Akash.mp4') {
            soundPath = require('../assets/audio/Akash/Akash.mp4');
          } else if (heading === 'Tej.mp4') {
            soundPath = require('../assets/audio/Tej/Tej.mp4');
          } else {
            soundPath = require('../assets/audio/Prithvi/Prithvi_2.mp4');
            return;
          }
        }

        const newSound = new Sound(soundPath, (error) => {
          if (error) {
            console.error('Error loading sound:', error);
            return;
          }

          setSound(newSound);
          setPlayingIndex(index);
          setIsPlaying(true);
          setFrequencyText('Frequency for this sound is between 350Hz to 450Hz.');

          newSound.play((success) => {
            if (success) {
              console.log('Successfully finished playing');
            } else {
              console.error('Playback failed due to audio decoding errors');
            }
            newSound.release();
            setIsPlaying(false);
            setSound(null);
            setPlayingIndex(null);
            setPosition(null);
            setFrequencyText('');
          });
        });
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.stop();
        sound.release();
      }
    };
  }, [sound]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (sound) {
          sound.stop();
          sound.release();
        }
      };
    }, [sound])
  );

  useEffect(() => {
    if (isPlaying && playingIndex !== null && sound) {
      const timer = setInterval(() => {
        sound.getCurrentTime((seconds: number, isPlaying: boolean) => {
          if (!isPlaying) {
            clearInterval(timer);
            setPosition(null);
          } else {
            setPosition(seconds);
          }
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, playingIndex, sound]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderAudioItem = ({ item, index }: { item: AudioFile, index: number }) => {
    return (
      <View style={styles.audioItemContainer}>
        <View style={styles.cardContainer}>
          <Card containerStyle={styles.card}>
            <View style={styles.audioItem}>
              <TouchableOpacity onPress={() => playSound(item.path, index, item.name)}>
                <Image source={isPlaying && playingIndex === index ? pause : playarrow} style={styles.play} />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.cardText}>{item.name.replace(/\.(mp3|mp4)$/, '')}</Text>
                <Text style={styles.cardduration}>
                  {isPlaying && playingIndex === index
                    ? `${formatTime(position ?? 0)} / ${formatTime(item.duration)}`
                    : formatTime(item.duration)}
                </Text>
              </View>
              <TouchableOpacity style={styles.dot}>
                <Image source={menu} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </View>
    )
  };

  const handleDrawerNavigation = () => {
    navigation.navigate('About');
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View>
        <HeaderComponent onPressHamburger={handleDrawerNavigation} />
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>{name}</Text>
        <Animatable.Text ref={animatableTextRef} animation="pulse" iterationCount="infinite" direction="alternate" style={styles.paragraph}>
          {frequencyText}
        </Animatable.Text>
        <FlatList
          data={audioList}
          renderItem={renderAudioItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.scrollView}
        />
      </View>
      <View style={styles.footer}>
        <FooterComponent />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    fontFamily: 'Poppins',
    fontSize: 25,
    color: '#000',
    fontWeight: '800',
    lineHeight: 30,
    letterSpacing: -0.02,
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  paragraph: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.02,
    textAlign: 'left',
    color: '#4C526A',
    marginTop: 25,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  footer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  audioItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#EEEE',
  },
  card: {
    padding: 0,
    paddingBottom: 10,
    borderWidth: 0,
    shadowColor: 'transparent',
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  cardText: {
    fontSize: 16,
    width: '90%',
    height: 20,
    overflow: 'hidden',
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    marginTop: 10,
  },
  cardduration: {
    fontSize: 16,
    color: '#4C526A',
    textAlign: 'center',
    marginTop: 10,
  },
  audioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    paddingStart: 20,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 'auto',
  },
  play: {
    width: 40,
    height: 40,
  },
});

export default ListingScreen;
