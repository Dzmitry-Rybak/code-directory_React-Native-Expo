import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from 'react-native-picker-select';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';

import { useDispatch } from "react-redux";
import { languageSelected, stackSelected } from "../../redux/actions";

import styles from './HeaderStyles';

const Header: React.FC<DrawerContentComponentProps> = ({navigation}) => {
    const dispatch = useDispatch();
    
    return (
            <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Ionicons name="menu" size={30}/>                
                </TouchableOpacity>
                <View style={styles.picker}>
                    <RNPickerSelect
                                placeholder={{ label: "Coding Stack", value: null }}
                                onValueChange={(value) => dispatch(stackSelected(value))}
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
                                placeholder={{ label: "Langugage", value: null }}
                                onValueChange={(value) => dispatch(languageSelected(value))}
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
                                        width: 100
                                    },
                                    iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                                items={[
                                    { label: 'English', value: 'English' },
                                    { label: 'Russian', value: 'Russian' },
                                    { label: 'Polish', value: 'hockey' },
                                ]}/>
                </View>
            </View>
    )
}

export default Header;