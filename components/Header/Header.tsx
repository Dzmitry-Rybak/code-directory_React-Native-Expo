import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from 'react-native-picker-select';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from 'moti/skeleton';
import i18n from "../../config/i18n";

import { languageSelected, stackSelected, stackPickerFetching } from "../../redux/actions";
import useCodeDirService from "../../service/CodeDirectoryService";
import { loadSelectedSettingsFromAsyncStore } from "../../redux/asyncActions/loadSelectedSettingsFromAsyncStore";

import styles from './HeaderStyles';

const Header: React.FC<DrawerContentComponentProps> = React.memo(({navigation}) => {
    const {getCodeForPickerStack} = useCodeDirService();
    const dispatch = useDispatch();
    const { language, stack, isLogged, isCodeAdded } = useSelector(state => state.questionsReducer);

    const initialPickerStack = [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'React', value: 'react' },
        { label: 'Git', value: 'git' },
        { label: 'Python', value: 'python' },
    ];

    const [pickerStack, setPickerStack] = React.useState(initialPickerStack);
    const [disableLanguagePicker, setDisableLanguagePicker] = React.useState(false);

    const [isAsyncStorageLoaded, setIsAsyncStorageLoaded] = React.useState(false);

    const gettingPickerStackFromDB = async () => {
        if (isLogged) {
            try {
                const data = await getCodeForPickerStack();
                if (data.stacks) {
                    const newStacks = data.stacks.map(stack => ({
                        label: stack.label,
                        value: stack.value,
                        language: stack.language
                    }));
                    setPickerStack(prevState => [...prevState, ...newStacks]);
                }
            } catch (error) {
                console.error("Error fetching picker stack from DB:", error);
            }
        } else {
            setPickerStack(initialPickerStack);
        }
    };

    React.useEffect(() => {
        const loadSettings = async () => {
            await dispatch(loadSelectedSettingsFromAsyncStore());
            setIsAsyncStorageLoaded(true);
        };

        loadSettings();
    }, [dispatch]);

    const getLanguageForStack = (stackValue) => {
        const selectedStack = pickerStack.find(stack => stack.value === stackValue);
        return selectedStack?.language || '';
    };

    React.useEffect(() => {
        gettingPickerStackFromDB();
    }, [isLogged]);

    React.useEffect(() => {
        if(isCodeAdded || !isLogged) {
            gettingPickerStackFromDB();
        }
        dispatch(stackPickerFetching(false))
    }, [isLogged, isCodeAdded]);

    return (
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons name="menu" size={30} />
                </TouchableOpacity>
                <View style={styles.picker}>
                <Skeleton width={100} height={20} colorMode="light">
                    {!isAsyncStorageLoaded ? null : (
                        <RNPickerSelect
                            placeholder={{ label: 'Stack', value: stack }}
                            onValueChange={async (value) => {
                                const selectedLanguage = getLanguageForStack(value);
                                dispatch(stackSelected(value));
                                if (selectedLanguage) {
                                    dispatch(languageSelected(selectedLanguage));
                                    setDisableLanguagePicker(true);
                                } else {
                                    setDisableLanguagePicker(false);
                                }
                                await AsyncStorage.setItem('stack', value);
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
                            items={pickerStack}
                        />)}
                </Skeleton>
                    
                </View>
                <View style={styles.picker}>
                <Skeleton width={100} height={20} colorMode="light">
                {!isAsyncStorageLoaded ? null : (
                    <RNPickerSelect
                        disabled={disableLanguagePicker}
                        placeholder={{ label: "Language", value: language }}
                        onValueChange={async (value) => {
                            await AsyncStorage.setItem('language', value);
                            i18n.changeLanguage(value);
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
                        ]}
                    />)}
                </Skeleton>
                </View>
            </View>
    );
});

export default Header;
