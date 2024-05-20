import { Image, StyleSheet, View } from "react-native";
import icon from '../assets/icon.png';

const SplashScreen = () => {
    <View style={styles.continer}>
        <Image source={icon}/>
    </View>
}

const styles = StyleSheet.create({
    continer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8bb5b3'
    },
    image: {
        height: 100, width: 100, resizeMode: 'cover'
    }
});

export default SplashScreen