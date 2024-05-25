import React from "react";
import { View, Text, Platform, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ModalLogin, ModalEmailExists } from "../../Modal/Modal";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch } from "react-redux";
import { isLoggedIn } from "../../../redux/actions.js";
import { Formik } from 'formik';
import { validSchemaCreateAccount } from "../validSchema.jsx";
import styles from '../FormStyles.jsx';
import { fetchUser } from "../../../service/fetches.jsx";

const CreateAccount: React.FC = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isModalExists, setIsModalExists] = React.useState(false);

    const goToSignIn = () => {
        navigation.navigate('LogIn');
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <Formik
                initialValues={{ 
                        login: '',
                        email: '',
                        emailConfirm: '',
                        password: '',
                        passwordConfirm: '',
                        terms: false  
                    }}
                validationSchema={validSchemaCreateAccount}
                onSubmit={async (values) => {
                    try {
                        const data = await fetchUser('signup', values);
                        if(data.message === 'Email is already exists') {
                            setIsModalExists(true);
                            setTimeout(async () => {
                                setIsModalExists(false);
                            }, 3000)
                        } else {
                            setIsModalVisible(true);
                            await AsyncStorage.setItem('login', `${data.user.name}`);
                            await AsyncStorage.setItem('token', `${data.token}`);
                            dispatch(isLoggedIn(true));
                            setTimeout(async () => {
                                setIsModalVisible(false);
                                navigation.navigate('Home');
                            }, 5000)
                        }
                    } catch(error) {
                        Alert.alert('Please try again later.')
                        console.error('Error while submitting:', error)
                    }
                }}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 30 }}>Create Account</Text>
                        <Text style={{ textAlign: 'center', marginTop: 5  }}>Create a new account</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="LOGIN" 
                            onChangeText={handleChange('login')}
                            onBlur={handleBlur('login')}
                            value={values.login}
                        />
                        {errors.login && touched.login &&
                            <Text style={{ fontSize: 12, color: 'red', marginTop: 5, alignSelf: 'center' }}>{errors.login}</Text>
                        }

                        <TextInput
                            style={styles.input}
                            placeholder="EMAIL" 
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                        />
                        {errors.email && touched.email &&
                            <Text style={{ fontSize: 12, color: 'red', marginTop: 5, alignSelf: 'center' }}>{errors.email}</Text>
                        }

                        <TextInput
                            style={styles.input}
                            placeholder="CONFIRM EMAIL" 
                            onChangeText={handleChange('emailConfirm')}
                            onBlur={handleBlur('emailConfirm')}
                            value={values.emailConfirm}
                            keyboardType="email-address"
                        />
                        {errors.emailConfirm && touched.emailConfirm &&
                            <Text style={{ fontSize: 12, color: 'red', marginTop: 5, alignSelf: 'center' }}>{errors.emailConfirm}</Text>
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
                            <Text style={{ fontSize: 12, color: 'red', marginTop: 5, alignSelf: 'center' }}>{errors.password}</Text>
                        }

                        <TextInput
                            style={styles.input}
                            placeholder="CONFIRM PASSWORD" 
                            onChangeText={handleChange('passwordConfirm')}
                            onBlur={handleBlur('passwordConfirm')}
                            value={values.passwordConfirm}
                            secureTextEntry={true}
                        />
                        {errors.passwordConfirm && touched.passwordConfirm &&
                            <Text style={{ fontSize: 12, color: 'red', marginTop: 5, alignSelf: 'center' }}>{errors.passwordConfirm}</Text>
                        }

                    <View style={{flexDirection: 'row', marginTop: 20, width: 300, alignSelf: 'center'}}>
                        <BouncyCheckbox
                            size={20}
                            fillColor="black"
                            iconStyle={{ borderColor: "black" }}
                            // textStyle={{ fontFamily: "JosefinSans-Regular" }}
                            onPress={(isChecked: boolean) => {values.terms = isChecked}}
                        />
                        <Text>I confirm that I've read and I agree to the site's Terms & Conditions*</Text>
                    </View>
                    {errors.terms && touched.terms &&
                            <Text style={{ fontSize: 12, color: 'red', marginTop: 5, alignSelf: 'center' }}>{errors.terms}</Text>
                    }

                        <TouchableOpacity style={styles.submit} onPress={ handleSubmit }>
                                <Text style={{ textAlign: 'center' }}>CREATE ACCOUNT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center', marginTop: 20 }} onPress={() => goToSignIn()}>
                            <Text style={{textDecorationLine: 'underline'}}>Already have a account? Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>)}
            </Formik>
            <ModalLogin isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
            <ModalEmailExists isModalExists={isModalExists} setIsModalExists={setIsModalExists}/>
        </KeyboardAvoidingView>
    )
}

export default CreateAccount;