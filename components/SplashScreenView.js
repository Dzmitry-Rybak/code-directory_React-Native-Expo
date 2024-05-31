import React from "react";
import { Image, StyleSheet, Text, View, Animated } from "react-native";

import icon from '../assets/logo_lavanda.png';

const SplashScreen = ({ navigation }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const moveAnim = React.useRef(new Animated.Value(100)).current; 

    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1, 
                duration: 500, 
                useNativeDriver: true, 
            }
        ).start(); 

        Animated.timing(
            moveAnim,
            {
                toValue: 0, 
                duration: 800, 
                useNativeDriver: true, 
            }
        ).start(); 

        setTimeout(() => {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }
            ).start();
        }, 2700);

        setTimeout(() => {
            navigation.navigate('Questions');
        }, 3000);

    }, [fadeAnim, moveAnim, navigation]);

    return (
        <View style={styles.container}>
            <Animated.View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: fadeAnim,
                transform: [{ translateY: moveAnim }] 
            }}>
                <Image source={icon} style={styles.image} />
                <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#dbdbff', fontFamily: 'Kanit-Bold' }}>Code-Directory</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'transparent',
    },
    image: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
        marginBottom: 50
    }
});

export default SplashScreen;
