import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Skeleton } from 'moti/skeleton';
import { useTranslation } from 'react-i18next';
import QuestionContent from "../QuestionContent/QuestionContent";
import styles from './HomeStyles.jsx';
import Progress from "../Progress/Progress";
import Header from "../Header/Header";
import { ModalError } from "../Modal/Modal";

import js from '../../assets/languages/javascript.png';
import git from '../../assets/languages/git.png';
import react from '../../assets/languages/react.png';
import python from '../../assets/languages/python.png';
import codedir from '../../assets/logo.png'

import { questionsFetched, isLoggedIn } from "../../redux/actions";
import { loadSelectedSettingsFromAsyncStore } from "../../redux/asyncActions/loadSelectedSettingsFromAsyncStore";

interface HomeProps {
    navigation: StackNavigationProp<any>;
}

const getLanguageData = (stack: string) => {
    stack = stack.toLowerCase();

    switch (stack) {
        case 'react':
            return { name: 'React', url: react};
        case 'git':
            return { name: 'Git', url: git };
        case 'python':
            return { name: 'Python', url: python };
        case 'javascript':
            return { name: 'JavaScript', url: js };
        default:
            return { name: stack, url: codedir };
    }
};

import useCodeDirService from "../../service/CodeDirectoryService";

const Home: React.FC<HomeProps>  = ({ navigation}) => {
    const {fetchQuestionsData} = useCodeDirService()

    const { stack, isLogged, language } = useSelector(state => state.questionsReducer);
    const [programmingLang, setProgrammingLang] = React.useState(getLanguageData(stack));
    const [isError, setIsError] = React.useState(false);
    const dispatch = useDispatch();

    const [name, setName] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isAsyncStorageLoaded, setIsAsyncStorageLoaded] = React.useState(false);

    const { t } = useTranslation();

    const fetchQuestins = async () => {
        setIsLoading(true)
        await fetchQuestionsData(stack, language)
            .then(data => {
                dispatch(questionsFetched(data.data));
                setIsLoading(false);
                setIsError(false)
            })
            .catch(err => {
                setIsError(true)
                console.error(err)
            })
            
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

    return (
            <ScrollView style={styles.container}>
                    <Header navigation={navigation}/>
                
                    <View style={{paddingHorizontal: 15}}>
                        {name ? 
                            <View style={{borderWidth: 1, borderColor: '#77b18d', borderRadius: 10, alignSelf: 'flex-start', margin: 5}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#77b18d', padding: 5 }}>{t('welcome')}, {name} 👋</Text>
                            </View>
                        : null }
                        <View style={{flexDirection: 'row', marginBottom: 15, alignItems: 'center', justifyContent: 'space-between', width: '50%', alignSelf: 'center'}}>
                            <Skeleton width={120} height={50} colorMode="light">
                                    {isLoading ? null : <Text style={styles.langugage}>{programmingLang.name}</Text>}
                            </Skeleton>
                            <Skeleton
                                width={50}
                                height={50}
                                radius={'round'}
                                colorMode="light">
                                    {isLoading ? null : (
                                            <Image 
                                            source={programmingLang.url}
                                            style={{width: 40, height: 40}}></Image>
                                    )}
                                        
                            </Skeleton>
                        </View>
                        <View style={{alignItems: 'center', marginBottom: 20}}>
                            <Skeleton width={300} height={62}  colorMode="light">
                                {isLoading ? null : <Progress/> }
                            </Skeleton>
                        </View>
                        <Skeleton width={'100%'} height={400} colorMode="light">
                            {isLoading ? null : <QuestionContent/>}
                        </Skeleton>
                    </View>
                    <ModalError isError={isError} setIsError={setIsError}/>
            </ScrollView>
        
        
    )
}

export default Home;