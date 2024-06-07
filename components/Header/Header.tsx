import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from 'react-native-picker-select';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch, useSelector } from "react-redux";
import { languageSelected, stackSelected } from "../../redux/actions";

import styles from './HeaderStyles';

const Header: React.FC<DrawerContentComponentProps> = ({navigation}) => {
    const dispatch = useDispatch();
    const { language, stack, isLogged } = useSelector(state => state.questionsReducer);

    let pickerStack = [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'React', value: 'react' },
        { label: 'Git', value: 'git' },
        { label: 'Python', value: 'python' },
    ]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent', position: 'relative' }}>
            <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Ionicons name="menu" size={30}/>                
                </TouchableOpacity>
                <View style={styles.picker}>
                    <RNPickerSelect
                                placeholder={{ label: "Stack", value: stack }}
                                onValueChange={async (value) => {
                                    await AsyncStorage.setItem('stack', value);
                                    dispatch(stackSelected(value));
                                }}
                                useNativeAndroidPickerStyle={false}
                                style={{
                                    inputAndroid: {
                                        color: 'white',
                                        fontSize: 20, 
                                        height: '100%',
                                        width: '100%',
                                        fontFamily: 'Kanit-Bold',
                                        textDecorationLine: 'underline'
                                    },
                                    inputIOS: {
                                        color: 'white',
                                        fontSize: 20, 
                                        height: '100%',
                                        width: 105,
                                        fontFamily: 'Kanit-Bold',
                                        textDecorationLine: 'underline'
                                    },
                                    placeholder: { 
                                        color: 'white',
                                        fontSize: 20, 
                                        height: '100%',
                                        width: 100,
                                        fontFamily: 'Kanit-Bold',
                                        textDecorationLine: 'underline'
                                    },
                                    iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                                items={pickerStack}/>
                </View>
                <View style={styles.picker}>
                    <RNPickerSelect
                                placeholder={{ label: "Langugage", value: language }}
                                onValueChange={async (value) => {
                                    await AsyncStorage.setItem('language', value);
                                    dispatch(languageSelected(value));
                                }}
                                useNativeAndroidPickerStyle={false}
                                style={{
                                    inputAndroid: {
                                        color: 'white', 
                                        fontSize: 20,
                                        height: '100%',
                                        width: 100,
                                        fontFamily: 'Kanit-Bold',
                                        textDecorationLine: 'underline'
                                    },
                                    inputIOS: {
                                        color: 'white', 
                                        fontSize: 20,
                                        height: '100%',
                                        width: 100,
                                        fontFamily: 'Kanit-Bold',
                                        textDecorationLine: 'underline'
                                    },
                                    placeholder: { 
                                        color: 'white', 
                                        fontSize: 20,
                                        height: '100%',
                                        width: '100%',
                                        fontFamily: 'Kanit-Bold',
                                        textDecorationLine: 'underline'
                                    },
                                    iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                                items={[
                                    { label: 'English', value: 'english' },
                                    { label: 'Russian', value: 'russian' },
                                    { label: 'Polish', value: 'polish' },
                                ]}/>
                </View>
            </View>
        </SafeAreaView>
            
    )
}

export default Header;