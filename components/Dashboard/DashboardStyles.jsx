import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    conatiner: {
        justifyContent: 'center',
        padding: 15,
        flex: 1,
        backgroundColor: '#3d4c44',
    },
    wrapper: {
        backgroundColor: 'white',
        padding: 20,
        borderWeight: 10,
        borderRadius: 10,
        
    },
    btnWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15
    },
    btn: {
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        backgroundColor: 'white',
        borderBottomWidth: 2,
        borderRadius: 10,
        width: 130,
        height: 36,
    }
})