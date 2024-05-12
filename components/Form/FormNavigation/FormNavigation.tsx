import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CreateAccount from '../CreateAccount/CreateAccount';
import SignIn from '../SignIn/SignIn';

const Stack = createStackNavigator();

const FormNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='LogIn' options={{headerShown: false}} component={SignIn}/>
            <Stack.Screen name='CreateAccount'  options={{headerShown: false}}  component={CreateAccount}/>
        </Stack.Navigator>
    )
}
export default FormNavigation;