import React from "react";
import { Text, TouchableOpacity, View, Linking, TextInput, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import { isLoggedIn, stackPickerFetching, stackSelected, questionSelectedId } from "../../redux/actions";
import { useTranslation } from 'react-i18next';

import {styles} from "./DashboardStyles";
import { ModalCodeAdded } from "../Modal/Modal";
import config from "../../config/config";
import useCodeDirService from "../../service/CodeDirectoryService";

const Dashboard: React.FC = () => {
    const {signOut, deleteAccount, handleVerifyCode} = useCodeDirService();
    const dispatch = useDispatch();
    const [code, setCode] = React.useState('');
    const [isCodeCorrect, setIsCodeCorrect] = React.useState(true);
    const [isModalAddedCode, setIsModalAddedCode] = React.useState(false);

    const { t } = useTranslation();

    const startSettings = () => {
        dispatch(stackSelected('javascript'));
        dispatch(questionSelectedId(1));
    }

    const hangleMailPressed = () => {
        Linking.openURL(`mailto:${config.socialLinks.email}`)
    }

    const hangleOpenTerms = () => {
        Linking.openURL(`https://code-directory.com/Terms-and-Conditions.html`)
    }

    const hangleWebPress = () => {
        Linking.openURL(`http://code-directory.com/`)
    }

    const handleSignout = async () => {
        await AsyncStorage.multiRemove(['login', 'token'])
        signOut();
        startSettings()
        dispatch(isLoggedIn(false));
    }

    const handleDelete = async () => {
        Alert.alert(
            'Delete Account',
            'Are you sure you want to delete your account? This will permanently erase your account',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              { text: 'Delete', onPress: async () => {
                try {
                    await deleteAccount();
                    await AsyncStorage.multiRemove(['login', 'token']);
                    startSettings();
                    dispatch(isLoggedIn(false));
                } catch (error) {
                    console.error('Error deleting account:', error);
                }
              },
              style: 'destructive'
             },
            ],
            { cancelable: false }
          );
    }

    const checkingCode = async () => {
        await handleVerifyCode(code)
            .then(data => {
                if( data.message ) {
                    setIsCodeCorrect(false)
                    setTimeout(() => {
                        setIsCodeCorrect(true)    
                    }, 5000);
                } else {
                    setIsModalAddedCode(true);
                    setTimeout(() => {
                        setIsModalAddedCode(false);
                    }, 5000);
                    setIsCodeCorrect(true);
                    dispatch(stackPickerFetching(true))
                }
            })
    }

    return (
        <View style={styles.conatiner}>
            <View style={styles.wrapper}>
                <Text style={{fontSize: 28, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', fontFamily: 'Kanit-Bold'}}>{t('hello')} 👋</Text>
                <Text style={{textAlign: 'justify', marginBottom: 10, fontSize: 17, fontFamily: 'Kanit-Regular'}}>{t('whatIsCodeDir')}🧠</Text>
                <View style={{borderWidth: 1, padding: 10, borderRadius: 15, backgroundColor: '#81b9a5', marginBottom: 20 }}>
                    <Text style={{fontSize: 18, fontFamily: 'Kanit-Regular', marginBottom: 10}}>{t('haveCode')}</Text>
                    <TextInput
                        style={{
                            alignSelf: 'center',
                            backgroundColor: '#edd9b4',
                            borderWidth: 2,
                            borderRadius: 10,
                            width: '75%',
                            height: 30,
                            paddingHorizontal: 10,
                            marginBottom: 5
                        }}
                        placeholderTextColor={'#000'}
                        value={code}
                        onChangeText={setCode}
                        placeholder={t('yourCode')}
                    />
                    {!isCodeCorrect ? (
                            <View style={{ width: '50%', alignSelf: 'center', marginBottom: 10, alignItems: 'center'}}>
                                <Text style={{color: '#d57b7b'}}>{t('incorrectCode')}</Text>
                            </View>
                    ): null }
                    
                    <TouchableOpacity onPress={checkingCode} style={styles.btn}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{t('tryCode')}</Text>
                    </TouchableOpacity>
                </View>
                <View   style={{borderWidth: 1, padding: 10, borderRadius: 15, backgroundColor: '#c6c6ff' }}>
                    <Text style={{fontSize: 18, fontFamily: 'Kanit-Regular'}}>{t('goWeb')}</Text>
                    <TouchableOpacity onPress={hangleWebPress}>
                        <Text style={{textDecorationLine: 'underline', textAlign: 'center', marginTop: 10, fontSize: 18, fontFamily: 'Kanit-Bold'}}>Code-directory.com</Text>
                    </TouchableOpacity>
                </View>
                <View   style={{borderWidth: 1, padding: 10, borderRadius: 15, marginTop: 20, backgroundColor: '#83b9ff' }}>
                    <Text style={{fontSize: 18, fontFamily: 'Kanit-Regular'}}>{t('anyQuestions')}</Text>
                    <TouchableOpacity onPress={hangleMailPressed}>
                        <Text style={{textDecorationLine: 'underline', textAlign: 'center', marginTop: 10, fontSize: 18, fontFamily: 'Kanit-Bold'}}>CodeDirectoryApp@gmail.com</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnWrapper}>
                    <TouchableOpacity style={styles.btn} onPress={handleDelete}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{t('deleteAcc')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={handleSignout}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{t('signOut')}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={hangleOpenTerms}>
                        <Text style={{textDecorationLine: 'underline', textAlign: 'center', fontSize: 18, fontFamily: 'Kanit-Bold'}}>{t('terms')}</Text>
                </TouchableOpacity>
            </View>
            <ModalCodeAdded isModalAddedCode={isModalAddedCode} setIsModalAddedCode={setIsModalAddedCode}/>
        </View>
    )
}

export default Dashboard;