import React from "react";
import { View, TouchableOpacity } from "react-native";
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
    const { language, stack } = useSelector(stack => stack.questionsReducer);

    React.useEffect(() => {
        const getStack = async () =>  {
            const localStack = await AsyncStorage.getItem('stack');
            const localLanguage = await AsyncStorage.getItem('language');
            if(localStack) {
                dispatch(stackSelected(localStack));
            }
            if(localLanguage) {
                dispatch(languageSelected(localLanguage));
            }
        };
        getStack()
    }, []);
    
    return (
            <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Ionicons name="menu" size={30}/>                
                </TouchableOpacity>
                <View style={styles.picker}>
                    <RNPickerSelect
                                placeholder={{ label: "Stack", value: stack }}
                                onValueChange={async (value) => {
                                    dispatch(stackSelected(value));
                                    await AsyncStorage.setItem('stack', value);
                                }}
                                useNativeAndroidPickerStyle={false}
                                style={{
                                    inputAndroid: {
                                        color: 'white',
                                        fontSize: 16, 
                                        height: '100%',
                                        width: 100
                                    },
                                    inputIOS: {
                                        color: 'white',
                                        fontSize: 16, 
                                        height: '100%',
                                        width: 105
                                    },
                                    placeholder: { 
                                        color: 'white',
                                        fontSize: 16, 
                                        height: '100%',
                                        width: 100
                                    },
                                    iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                                items={[
                                    { label: 'JavaScript', value: 'javascript' },
                                    { label: 'React', value: 'react' },
                                    { label: 'Git', value: 'git' },
                                    { label: 'Python', value: 'python' },
                                ]}/>
                </View>
                <View style={styles.picker}>
                    <RNPickerSelect
                                placeholder={{ label: "Langugage", value: language }}
                                onValueChange={async (value) => {
                                    dispatch(languageSelected(value));
                                    await AsyncStorage.setItem('language', value);
                                }}
                                useNativeAndroidPickerStyle={false}
                                style={{
                                    inputAndroid: {
                                        color: 'white', 
                                        fontSize: 16,
                                        height: '100%',
                                        width: 100
                                    },
                                    inputIOS: {
                                        color: 'white', 
                                        fontSize: 16,
                                        height: '100%',
                                        width: 100
                                    },
                                    placeholder: { 
                                        color: 'white', 
                                        fontSize: 16,
                                        height: '100%',
                                        width: '100%'
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
    )
}

export default Header;