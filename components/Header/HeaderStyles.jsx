import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: 40,
        paddingHorizontal: 20,
    },
    logo: {
        width: 40,
        height: 40
    },
    picker: {
        justifyContent: 'center',
        fontSize: 35,
        width: '30%', // Подбираем подходящее значение для ширины
        alignSelf: 'center',
    }
})