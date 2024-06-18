import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, StatusBar } from "react-native";

import MainTabs from "../MainTabs/MainTabs";
import DrawerContent from "../DrawerContent/DrawerContent";
import SplashScreen from "../SplashScreenView";

const Drawer = createDrawerNavigator();

const MainComponent = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <LinearGradient
            colors={['rgba(50,82,97,1)', 'rgba(61,76,68,1)']}
            style={{ height: '100%', flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar animated={true} backgroundColor="#325261" />
                <NavigationContainer
                    theme={{
                        colors: {
                            background: 'transparent'
                        },
                    }}>
                    <Drawer.Navigator
                        initialRouteName="Questions"
                        drawerContent={(props) => <DrawerContent {...props} />}
                        screenOptions={{
                            headerShown: false,
                            drawerType: 'slide',
                            drawerStyle: {
                                backgroundColor: '#6a8c94',
                                width: '80%',
                            },
                        }}>
                        <Drawer.Screen
                            name="Questions"
                            children={(props) => <MainTabs {...props} />} />
                    </Drawer.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </LinearGradient>
    );
}

export default MainComponent;
