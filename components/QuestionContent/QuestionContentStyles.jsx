import { StyleSheet } from "react-native";


export default styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        flex: 1,
        marginBottom: 40,
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    btnWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20
    },
    btnFetch: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    btn: {
        flex: 1,
        maxWidth: 250,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: '#6d9448a2',
        alignItems: 'center',
        padding: 10,
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 15,
    },
    btnDisabled: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'gray',
        alignItems: 'center',
        padding: 10,
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 15,
    },
    btnText: {
        fontSize: 12,
        color: 'black',
        textAlign: 'center',
        fontFamily: 'Kanit-Regular'
    },
});