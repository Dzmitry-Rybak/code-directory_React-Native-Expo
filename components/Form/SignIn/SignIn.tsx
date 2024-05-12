import React from "react";
import { Button, View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

import { useDispatch } from "react-redux";
import { isLoggedIn } from "../../../redux/actions.js";
import {ModalLogin} from "../../Modal/Modal";
import { fetchUser } from "../../../service/fetches.jsx";
import { validSchemaSignIn } from "../validSchema.jsx";
import styles from '../FormStyles.jsx';
import logo from '../../../assets/logo.png';

const SignIn: React.FC = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    
    const goToCreateAccount = () => {
        navigation.navigate('CreateAccount');
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <Formik
                initialValues={{ 
                        email: '',
                        password: ''
                    }}
                validationSchema={validSchemaSignIn}
                onSubmit={async (values) => {
                    try {
                        const data = await fetchUser('signin', values);
                        
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
                            // setInvalidPassword(true);
                            // setTimeout(() => {
                            //     setInvalidPassword(false);
                            // }, 3000)
                        } else if (data.message === 'There is no users with this email') {
                            // setInvalidEmail(true);
                            // setTimeout(() => {
                            //     setInvalidEmail(false);
                            // }, 3000)
                        }
                    } catch(error) {
                        Alert.alert('Error while submitting', 'please, try later');
                    }
                }}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Image source={logo} style={{ width: 120, height: 120, alignSelf: 'center', tintColor: 'gray' }} />
                    <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 30 }}>Welcome back</Text>
                    <Text style={{ textAlign: 'center', marginTop: 5 }}>Sign to continue</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="EMAIL" 
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                    />
                    {errors.email && touched.email &&
                        <Text style={{ fontSize: 12, color: 'red', marginTop: 5 }}>{errors.email}</Text>
                    }
                    
                    <TextInput
                        style={styles.input}
                        placeholder="PASSWORD" 
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={true}
                    />
                    {errors.password && touched.password &&
                        <Text style={{ fontSize: 12, color: 'red', marginTop: 5 }}>{errors.password}</Text>
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
      </KeyboardAvoidingView>

        // <KeyboardAvoidingView
        //     style={{ flex: 1 }}
        //     behavior={Platform.OS === "ios" ? "padding" : undefined}
        // >
        //     <View style={styles.container}>
        //         <View style={styles.wrapper}>
        //             <Image source={logo} style={{ width: 120, height: 120, alignSelf: 'center', tintColor: 'gray' }} />
        //             <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 30 }}>Welcome back</Text>
        //             <Text style={{ textAlign: 'center', marginTop: 5 }}>Sign to continue</Text>
        //             <TextInput
        //                 style={styles.input}
        //                 placeholder="EMAIL" />
        //             <TextInput
        //                 style={styles.input}
        //                 placeholder="PASSWORD" />
        //             <TouchableOpacity style={styles.submit}>
        //                 <Text style={{ textAlign: 'center' }}>SIGN IN</Text>
        //             </TouchableOpacity>
        //             <TouchableOpacity style={{ alignItems: 'center', marginTop: 20 }} onPress={goToCreateAccount}>
        //                 <Text style={{textDecorationLine: 'underline'}}>Don't have account? Create a new account</Text>
        //             </TouchableOpacity>
        //         </View>
        //     </View>
        // </KeyboardAvoidingView>
    )
}

export default SignIn;