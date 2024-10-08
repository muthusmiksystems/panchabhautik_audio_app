import React, { useEffect } from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import splash from '../assets/images/sptext.png';
import backgroundImage from '../assets/images/bgmain.jpeg'; // Replace with the path to your background image
import { Colors } from 'react-native/Libraries/NewAppScreen';

function SplashScreen() {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Landing');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundStyle}>
      <SafeAreaView style={styles.containerStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
          translucent={true}
        />
        <Image source={splash} resizeMode="contain" style={styles.imageStyle} />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: '80%',
    height: '80%',
  },
});

export default SplashScreen;
