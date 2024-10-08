import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import home from '../../assets/images/home.png';

const FooterComponent = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.containerStyle}>
            <TouchableOpacity style={styles.logoButton} onPress={() => navigation.navigate('Landing')}>
                <Image source={home} style={styles.logoStyle} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: "white",
        paddingVertical: 10, // Added padding top and bottom
        paddingHorizontal: 20, // Added padding left and right
        width: '100%',
        borderTopWidth:1,
        borderColor:'#EEEE'
    },
    logoButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20, // Added padding for better spacing
    },
    logoStyle: {
        width: 40, // adjust the width as needed
        height: 50, // adjust the height as needed
        resizeMode: 'contain',
    },
});

export default FooterComponent;
