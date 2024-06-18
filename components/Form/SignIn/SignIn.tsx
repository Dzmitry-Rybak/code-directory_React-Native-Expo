import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch } from "react-redux";
import { isLoggedIn } from "../../../redux/actions";
import {ModalLogin, ModalIncorrect, ModalNoEmail, ModalError} from "../../Modal/Modal";

import { validSchemaSignIn } from "../validSchema.jsx";
import styles from '../FormStyles.jsx';
import logo from '../../../assets/logo.png';

import useCodeDirService from "../../../service/CodeDirectoryService";

const SignIn: React.FC = () => {
    const {fetchUser} = useCodeDirService();

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isModalIncorrect, setIsModalIncorrect] = React.useState(false);
    const [isModalNoEmail, setIsModalNoEmail] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    
    
    const goToCreateAccount = () => {
        navigation.navigate('CreateAccount');
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ModalError isError={isError} setIsError={setIsError}/>
            <Formik
                initialValues={{ 
                        email: '',
                        password: ''
                    }}
                validationSchema={validSchemaSignIn}
                onSubmit={async (values) => {
                    try {
                        const data = await fetchUser('signin', values);
                        setIsError(false)
                        if (data.message === 'sign in succesfull') {
                            setIsModalVisible(true);
                            values.email = '';
                            values.password = '';
                            await AsyncStorage.setItem('login', `${data.user.name}`);
                            await AsyncStorage.setItem('token', `${data.token}`);
                            setTimeout(() => {
                                dispatch(isLoggedIn(true));
                            }, 5000)
                            
                        } else if (data.message === 'Password incorrect') {
                            setIsModalIncorrect(true);
                            setTimeout(() => {
                                setIsModalIncorrect(false);
                            }, 4000)
                        } else if (data.message === 'There is no users with this email') {
                            setIsModalNoEmail(true);
                            setTimeout(() => {
                                setIsModalNoEmail(false);
                            }, 4000)
                        }
                    } catch(error) {
                        setIsError(true);
                    }
                }}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Image source={logo} style={{ width: 120, height: 120, alignSelf: 'center', tintColor: 'gray' }} />
                    <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 30}}>Welcome back</Text>
                    <Text style={{ textAlign: 'center', marginTop: 5 }}>Sign to continue</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="EMAIL" 
                        placeholderTextColor="#b0b0b0"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                        autoCapitalize="none" 
                    />
                    {errors.email && touched.email &&
                        <Text style={{ fontSize: 12, color: 'red', marginTop: 5, alignSelf: 'center' }}>{errors.email}</Text>
                    }
                    
                    <TextInput
                        style={styles.input}
                        placeholder="PASSWORD" 
                        placeholderTextColor="#b0b0b0"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={true}
                        autoCapitalize="none"
                    />
                    {errors.password && touched.password &&
                        <Text style={{ fontSize: 12, color: 'red', marginTop: 5, alignSelf: 'center' }}>{errors.password}</Text>
                    }
                    <TouchableOpacity style={styles.submit} onPress={ handleSubmit } disabled={!isValid}>
                            <Text style={{ textAlign: 'center' }}>SIGN IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', marginTop: 20 }} onPress={goToCreateAccount}>
                        <Text style={{textDecorationLine: 'underline'}}>Don't have account? Create a new account</Text>
                    </TouchableOpacity>
                </View>
            </View>
            )}
        </Formik>
        <ModalLogin isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
        <ModalIncorrect isModalIncorrect={isModalIncorrect} setIsModalIncorrect={setIsModalIncorrect}/>
        <ModalNoEmail isModalNoEmail={isModalNoEmail} setIsModalNoEmail={setIsModalNoEmail}/>
      </KeyboardAvoidingView>
    )
}

export default SignIn;
