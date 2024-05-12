import React from "react";
import { SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';

import MainTabs from "../MainTabs/MainTabs";
import {Loading} from "../Loading/Loading";
import DrawerContent from "../DrawerContent/DrawerContent";
import { fetchQuestionsData } from "../../service/fetches";


const Drawer = createDrawerNavigator();

import { useDispatch, useSelector } from "react-redux";
import { questionsFetched } from "../../redux/actions";

const MainComponent = () => {
    const {language, stack, isLogged} = useSelector(stack => stack.questionsReducer);
    const dispatch = useDispatch();
    
    const [isLoading, setIsLoading] = React.useState(true);


    const fetchQuestins = async () => {
        fetchQuestionsData(stack, language)
            .then(data => {
                dispatch(questionsFetched(data.data));
                setIsLoading(false);
            })
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false))
    }

    
    React.useEffect(() => {
        fetchQuestins();
    }, []);
    
    React.useEffect(() => {
        fetchQuestins();
    }, [language, stack, isLogged]);

    if(isLoading){
        return <Loading/>
    }

    return (
        <LinearGradient
        colors={['rgba(50,82,97,1)', 'rgba(61,76,68,1)']} 
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{flex: 1, backgroundColor: 'transparent', position: 'relative'}}>
                <NavigationContainer
                    theme={{
                        colors: {
                            background: 'transparent' // Устанавливаем прозрачный фон для навигации
                        }
                    }}>
                    <Drawer.Navigator 
                        drawerContent={(props) => <DrawerContent {...props}/>}
                        screenOptions={{
                            headerShown: false,
                            drawerStyle: {
                                backgroundColor: 'white',
                                width: 300,
                            },
                        }}>
                        <Drawer.Screen 
                            name="Questions" 
                            children={(props) => <MainTabs {...props}/>}/>
                    </Drawer.Navigator>
                </NavigationContainer>
        </SafeAreaView>

        </LinearGradient>
    )
}

export default MainComponent;