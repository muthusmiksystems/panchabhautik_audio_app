import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Sidebar from './Components/Sidebar';
import LandingScreen from './LandingScreen';

const Drawer = createDrawerNavigator();

const HomeDrawerPage = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <Sidebar {...props} />}
        initialRouteName="Landing"
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Landing" component={LandingScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default HomeDrawerPage;
