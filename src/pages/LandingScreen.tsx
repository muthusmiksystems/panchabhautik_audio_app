

import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  PermissionsAndroid,
  ImageBackground,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import HeaderComponent from './Components/Header';
import FooterComponent from './Components/Footer';
import Sound from 'react-native-sound';
import { setAudioList, setName } from '../store/services/AudioService';
import { useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import audioFilesMap from './audioFileMap';

interface AudioFile {
  name: string;
  path: string;
  isFile: () => boolean;
}
const windowWidth = Dimensions.get('window').width;

// Calculate the width for each column based on the screen width
const columnWidth = windowWidth <= 600 ? '100%' : '50%';
// Define array of background images with associated text
const backgroundImageData = [
  {
    image: require('../assets/images/pritvinew.jpeg'),
    text: 'Prithvi',
  },
  {
    image: require('../assets/images/jalnew.jpeg'),
    text: 'Jal',
  },
  {
    image: require('../assets/images/teja.jpeg'),
    text: 'Tej',
  },
  {
    image: require('../assets/images/vayunew.jpeg'),
    text: 'Vayu',
  },
  {
    image: require('../assets/images/akashnew.jpeg'),
    text: 'Akash',
  },
];

function LandingScreen() {
  const navigation = useNavigation();
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    requestStoragePermission(); // Request storage permission when the component mounts
  }, []);
  const getAndroidAssetsPath = async () => {
    try {
      const assetsPath = `${RNFS.ExternalDirectoryPath}/assets`;
      return assetsPath;
    } catch (error) {
      console.error('Error accessing Android assets folder:', error);
      return null;
    }
  };
  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        {
          title: "Storage Permission",
          message: "App needs access to your storage to play audio.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Storage permission granted");
      } else {
        console.log("Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getAudioFiles = async (category: any) => {
    try {
      setLoading(true); // Set loading to true while fetching files
      dispatch(setName(category));

      const audioFiles = audioFilesMap[category] || {};
      console.log("audioFiles:", audioFiles)
      if (Object.keys(audioFiles).length === 0) {
        ToastAndroid.showWithGravity(
          'No audio files found.',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        setLoading(false); // Set loading to false since no files were found
        return;
      }
      setLoading(false);
      console.log("audioFilesWithDuration:")
      const audioFilesWithDuration = await Promise.all(
        Object.entries(audioFiles).map(async ([name, path]) => {
          console.log('name',name)
          console.log('path',path)
          const duration = await getAudioFileDuration(path.path);
          return {
            name,
            path: path.name,  // Use the URI directly from the require
            duration,
          };
        })
      );
      console.log("audioFilesWithDuration:", audioFilesWithDuration)
      dispatch(setAudioList(audioFilesWithDuration));
      setLoading(false);
      handleSelectAudio();
    } catch (error) {
      console.log('Error reading file:', error); // Log the actual error
      setLoading(false); // Ensure loading state is reset in case of error
    }
  };
  const handleDrawerNavigation = () => {
    navigation.navigate('About');
  };

  const handleSelectAudio = () => {
    navigation.navigate('List');
  };

  const getAudioFileDuration = (filePath:any) => {
    return new Promise((resolve, reject) => {
      const sound = new Sound(filePath, (error) => {
        if (error) {
          reject(error);
        } else {
          const duration = sound.getDuration();
          resolve(duration);
        }
      });
    });
  };
  
  return (
    <SafeAreaView style={styles.containerStyle}>
      <View>
        <HeaderComponent onPressHamburger={handleDrawerNavigation} />
      </View>
      <View style={styles.content}>
        <Text style={styles.heading}>Percussion Sounds</Text>
        <Text style={styles.paragraph}>
          Percussion is a method of tapping on a surface
          to determine the underlying structures which is
          used in clinical examination. It is done with the
          middle finger of one hand tapping on a middle
          finger of the other hand using the wrist action.
        </Text>
        <View style={styles.row}>
          <FlatList
            data={backgroundImageData}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.column} onPress={() => getAudioFiles(item.text)}>
                <ImageBackground
                  source={item.image}
                  style={styles.imageBackground}
                >
                  <LinearGradient
                    colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']}
                    style={styles.linearGradient}
                  >
                    <Text style={styles.overlayText}>{item.text}</Text>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()} // Use index as the key
            contentContainerStyle={styles.row}
          />
        </View>
      </View>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
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
    marginBottom: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  heading: {
    fontFamily: 'Poppins',
    fontSize: 25,
    color: '#000',
    fontWeight: '800',
    lineHeight: 30,
    letterSpacing: -0.02,
    marginTop: 20
  },
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.02,
    textAlign: 'left',
    marginTop: 25,
    color: '#4C526A'
  },
  row: {
    marginTop: 25,
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
    marginBottom: 10,
    marginEnd: 8,
    borderRadius: 20,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: '100%',
    borderRadius: 20,
    paddingTop: 100,
    overflow: 'hidden'
  },
  overlayText: {
    fontFamily: 'Poppins',
    fontSize: 18,
    color: 'white',
    fontWeight: '800',
    textAlign: 'center',
    position: 'absolute',
  },
  footer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});
export default LandingScreen;
