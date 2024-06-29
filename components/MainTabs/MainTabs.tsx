import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
    const {isLogged} = useSelector(state => state.questionsReducer);
    const { t } = useTranslation();


    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName: Icons;
                if(['Home', 'Главная', 'Pulpit'].includes(route.name)) {
                    iconName = focused ? Icons.HOME : Icons.HOME_OUTLINE
                } else if(['Add Question', 'Добавить Вопрос', 'Dodaj pytanie'].includes(route.name)) {
                    iconName = focused ? Icons.CREATE : Icons.CREATE_OUTLINE
                } else if(['Sign In', 'Войти', 'Zaloguj się'].includes(route.name)) {
                    iconName = focused ? Icons.PERSON : Icons.PERSON_OUTLINE
                } else if(['Account', 'Профиль', 'Konto'].includes(route.name)) {
                    iconName = focused ? Icons.FOOTSTEPS : Icons.FOTTSTEPS_OUTLINE
                }
                return <Ionicons name={iconName} size={size} color={color}/>
            },
            tabBarActiveTintColor: 'white',
            
            tabBarInactiveTintColor: 'black',
            headerShown: false,
            tabBarStyle: { backgroundColor: '#3d4c44' }
        })}
    >
        <Tab.Screen name={t('home')}>
            {() => <Home navigation={navigation}/>}
        </Tab.Screen>
        <Tab.Screen name={t('addQuestion')} component={AddQuestion}/>
        {isLogged ? (
            <Tab.Screen name={t('account')} component={Dashboard}/>
        ): (
            <Tab.Screen name={t('signIn')} component={FormNavigation}/>
        )}
    </Tab.Navigator>
    )
};

export default MainTabs;