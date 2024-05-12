import { StyleSheet } from "react-native";


export default styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 15,
        flex: 1,
        backgroundColor: 'transparent'
    },
    wrapper: {
        backgroundColor: 'white',
        padding: 20,
        borderWeight: 10,
        borderRadius: 10,
    },
    input: {
        padding: 10,
        width: 300,
        height: 40,
        marginTop: 25,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderBottomWidth: 3,
        borderRightWidth: 3,
        borderBottomColor: '#205c00',
        borderRightColor: '#205c00',
    },
    submit: {
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        backgroundColor: 'white',
        borderBottomWidth: 2,
        borderRadius: 10,
        width: 200,
        height: 36
    }
});