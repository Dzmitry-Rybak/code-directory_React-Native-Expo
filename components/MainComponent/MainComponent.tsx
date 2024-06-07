import React, { useEffect } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Alert } from "react-native";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import NetInfo from '@react-native-community/netinfo'
import * as Updates from 'expo-updates';

import MainTabs from "../MainTabs/MainTabs";
import DrawerContent from "../DrawerContent/DrawerContent";
import SplashScreen from "../SplashScreenView";


const Drawer = createDrawerNavigator();



const MainComponent = () => {
   
    const unsubscribe = NetInfo.addEventListener(state => {
        if(state.isConnected === false) {
            Alert.alert("No Internet!", "Please reconnect!", [{
                text: "Reload app", onPress: () => Updates.reloadAsync()
            }])
        } else if (state.isConnected === true) {
            console.log('connected')
        }
    })

    useEffect(() => {
        unsubscribe();
    })

    return (
        <SafeAreaProvider>
            <LinearGradient
                colors={['rgba(50,82,97,1)', 'rgba(61,76,68,1)']}
                style={{ flex: 1 }}
            >
                    <NavigationContainer
                        theme={{
                            colors: {
                                background: 'transparent'
                            },
                        }}>
                        <Drawer.Navigator
                            initialRouteName="Splash"
                            drawerContent={(props) => <DrawerContent {...props} />}
                            screenOptions={{
                                headerShown: false,
                                drawerStyle: {
                                    backgroundColor: '#6a8c94',
                                    width: '80%',
                                },
                            }}>
                            <Drawer.Screen 
                                name="Splash"
                                component={SplashScreen}/>
                            <Drawer.Screen
                                name="Questions"
                                children={(props) => <MainTabs {...props} />} />
                        </Drawer.Navigator>
                    </NavigationContainer>
            </LinearGradient>
        </SafeAreaProvider>
    )
}

export default MainComponent;
