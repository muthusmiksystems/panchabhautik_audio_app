import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import HeaderComponent from './Components/Header';
import FooterComponent from './Components/Footer';

function AboutScreen() {
  const navigation = useNavigation();


  const handleDrawerNavigation = () => {
    // navigation.dispatch(DrawerActions.openDrawer());
    navigation.navigate('About');
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View>
        <HeaderComponent onPressHamburger={handleDrawerNavigation} />
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>About</Text>
        <Text style={styles.paragraph}>
          Panchamahabhut is most ancient tool to analyze this universe; the panchmahabhut revolves around the normal functioning of body, occurrence of disease and action of drugs on various parts of body. Depending on the mahabhut dominancy the organs will produce different sounds after percussion these quality of sounds can be identified.

        </Text>
        <Text style={styles.paragraph}>
        Every element produces a particular sound and each quality of sound will have a different frequency which is calculated in Hz. These sounds can be identified, classified and standardize on the basis of panchmahabhuta.  

        </Text>
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
  content: {
    flex: 1,
    padding: 20,
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

  footer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default AboutScreen;
