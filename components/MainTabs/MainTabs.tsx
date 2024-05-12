import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import { Ionicons } from "@expo/vector-icons";
import Home from "../Home/Home";
import AddQuestion from "../Form/AddQuestion/AddQuestion";
import FormNavigation from "../Form/FormNavigation/FormNavigation";
import Dashboard from '../Dashboard/Dashboard';

enum Icons {
    HOME = 'home',
    HOME_OUTLINE = 'home-outline',
    CREATE = 'create',
    CREATE_OUTLINE = 'create-outline',
    PERSON = 'person',
    PERSON_OUTLINE = 'person-outline',
    FOOTSTEPS = 'footsteps',
    FOTTSTEPS_OUTLINE = 'footsteps-outline'
}

const Tab = createBottomTabNavigator();

interface IMainTabs extends DrawerContentComponentProps {};

const MainTabs:React.FC<IMainTabs> = ({ navigation}) => {
    const {isLogged} = useSelector(stack => stack.questionsReducer);



    return (
        <Tab.Navigator
        // options={{ tabBarLabel: () => null }} - не помню что это!
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName: Icons;
                if(route.name === 'Home') {
                    iconName = focused ? Icons.HOME : Icons.HOME_OUTLINE
                } else if(route.name === 'AddQuestion') {
                    iconName = focused ? Icons.CREATE : Icons.CREATE_OUTLINE
                } else if(route.name === 'SignIn') {
                    iconName = focused ? Icons.PERSON : Icons.PERSON_OUTLINE
                } else if(route.name === 'Account') {
                    iconName = focused ? Icons.FOOTSTEPS : Icons.FOTTSTEPS_OUTLINE
                }
                return <Ionicons name={iconName} size={size} color={color}/>
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'black',
            headerShown: false,
            tabBarStyle: { backgroundColor: 'transparent', borderTopWidth: 0 }
        })}
    >
        <Tab.Screen name="Home">
            {() => <Home navigation={navigation}/>}
        </Tab.Screen>
        <Tab.Screen name="AddQuestion" component={AddQuestion}/>
        {isLogged ? (
            <Tab.Screen name="Account" component={Dashboard}/>
        ): (
            <Tab.Screen name="SignIn" component={FormNavigation}/>
        )}
    </Tab.Navigator>
    )
};

export default MainTabs;