import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    wrapper: {
        width: 300,
        justifyContent: 'space-between',
        padding: 15,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'row',
    },
    scaleWrap: {
        position: 'relative',
        width: 100,
        height: 20,
        backgroundColor: 'white',
        borderRadius: 7
    },
    scale: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        backgroundColor: '#417647',
        width: '60%',
        borderRadius: 7
    },
    fractions: {
        color: 'white',
        fontSize: 18
    }
})