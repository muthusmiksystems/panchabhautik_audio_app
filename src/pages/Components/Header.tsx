import React from "react";
import { Dimensions, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from '../../assets/images/main.png';
import hamburger from '../../assets/images/hamburger.png';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

interface HeaderComponentProps {
    onPressHamburger: () => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ onPressHamburger }) => {
    return (
        <SafeAreaView style={styles.containerStyle}>
            <View style={styles.headerContent}>
                <TouchableOpacity style={styles.logoButton}>
                    <Image source={logo} style={styles.logoStyle} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressHamburger} style={styles.hamburgerButton}>
                    <Image source={hamburger} style={styles.hamburgerStyle} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: "white",
        padding: 10,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#EEEE',
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoButton: {
        padding: 10,
        width: '50%',
    },
    logoStyle: {
        width: '90%',
        height: 50,
        resizeMode: 'contain',
    },
    hamburgerButton: {
        padding: 10,
    },
    hamburgerStyle: {
        width: 30,
        height: 50,
        resizeMode: 'contain',
    },
});

export default HeaderComponent;
