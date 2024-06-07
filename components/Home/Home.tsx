import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from "react-redux";

import QuestionContent from "../QuestionContent/QuestionContent";
import styles from './HomeStyles.jsx';
import Progress from "../Progress/Progress";

import js from '../../assets/languages/javascript.png';
import git from '../../assets/languages/git.png';
import react from '../../assets/languages/react.png';
import python from '../../assets/languages/python.png';
import Header from "../Header/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";


const getLanguageData = (stack: string) => {
    stack = stack.toLowerCase();
  
    switch (stack) {
        case 'react':
            return { name: 'React', url: react};
        case 'git':
            return { name: 'Git', url: git };
        case 'python':
            return { name: 'Python', url: python };
        default:
            return { name: 'JavaScript', url: js };
    }
};

interface HomeProps {
    navigation: StackNavigationProp<any>;
}

import { useDispatch } from "react-redux";
import { questionsFetched, isLoggedIn } from "../../redux/actions";
import { Alert } from "react-native";
import { loadSelectedSettingsFromAsyncStore } from "../../redux/asyncActions/loadSelectedSettingsFromAsyncStore";
import { Loading } from "../Loading/Loading";
import { fetchQuestionsData } from "../../service/fetches";

const Home: React.FC<HomeProps>  = ({ navigation}) => {
    const { stack, isLogged, language } = useSelector(state => state.questionsReducer);
    const [programmingLang, setProgrammingLang] = React.useState(getLanguageData(stack));
    const dispatch = useDispatch();

    const [name, setName] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isAsyncStorageLoaded, setIsAsyncStorageLoaded] = React.useState(false);

    const fetchQuestins = async () => {
        setIsLoading(true)
        await fetchQuestionsData(stack, language)
            .then(data => {
                dispatch(questionsFetched(data.data));
                setIsLoading(false);
            })
            .catch(err => {
                Alert.alert('Please try again later.');
                console.error(err)
            })
            .finally(() => setIsLoading(false));
    }

    React.useEffect(() => {
        const loadSettings = async () => {
            await dispatch(loadSelectedSettingsFromAsyncStore());
            setIsAsyncStorageLoaded(true);
        };

        loadSettings();
    }, [dispatch]);

    const getUsername = async () => {
        const userName = await AsyncStorage.getItem('login');
        if (userName) {
            dispatch(isLoggedIn(true))
        } else {
            dispatch(isLoggedIn(false))
        }
    }

    React.useEffect(() => {
        if (isAsyncStorageLoaded) {
            fetchQuestins();
            getUsername();
        }
    }, [isAsyncStorageLoaded, language, stack, isLogged]);

    
    const getName = async () => {
        const userName = await AsyncStorage.getItem('login');
        setName(userName);
    }

    React.useEffect(() => {
        getName()
    }, [isLogged])

    React.useEffect(()=> {
        setProgrammingLang(getLanguageData(stack));
    }, [stack])

    // if (isLoading) {
    //     return <Loading />
    // } else {

    // }

    return (
        <ScrollView style={styles.container}>
            <Header navigation={navigation}/>
            {isLoading ? <Loading/> : (
                <View style={{paddingHorizontal: 15}}>
                    {name ? 
                        <View style={{borderWidth: 1, borderColor: '#77b18d', borderRadius: 10, alignSelf: 'flex-start', margin: 5}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#77b18d', padding: 5 }}>Hi, {name} 👋</Text>
                        </View>
                    : null }
                    <View style={{flexDirection: 'row', marginBottom: 15, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.langugage}>{programmingLang.name}</Text>
                        <Image 
                        source={programmingLang.url}
                        style={{width: 40, height: 40}}></Image>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Progress/>
                    </View>
                    <QuestionContent/>
                </View>
            )}
        </ScrollView>
        
    )
}

export default Home;