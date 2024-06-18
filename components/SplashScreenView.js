import React from "react";
import { Image, StyleSheet, Text, View, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { StatusBar } from "react-native";


import icon from '../assets/logo_lavanda.png';

const SplashScreen = () => {

    let [fontsLoaded] = useFonts({
        'Kanit-Bold': require('../assets/fonts/Kanit-Bold.ttf'),
        'Kanit-Regular': require('../assets/fonts/Kanit-Regular.ttf'),
      });

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

        // setTimeout(() => {
        //     navigation.navigate('Questions');
        // }, 3000);

    }, [fadeAnim, moveAnim]);

    return (
        <LinearGradient
            colors={['rgba(50,82,97,1)', 'rgba(61,76,68,1)']}
            style={{ height: '100%', flex: 1 }}
        >
            <View style={styles.container}>
                <Animated.View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: fadeAnim,
                    transform: [{ translateY: moveAnim }] 
                }}>
                    <StatusBar animated={true} backgroundColor="#325261"/>
                    <Image source={icon} style={styles.image} />
                    <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#dbdbff', fontFamily: 'Kanit-Bold' }}>Code-Directory</Text>
                </Animated.View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        flex: 1,
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
