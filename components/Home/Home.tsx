import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from "react-redux";

import QuestionContent from "../QuestionContent/QuestionContent";
import styles from './HomeStyles.jsx';
import Progress from "../Progress/Progress";
// @ts-ignore
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

const Home: React.FC<HomeProps>  = ({ navigation}) => {
    const { stack, language, isLogged } = useSelector(stack => stack.questionsReducer);
    const [programmingLang, setProgrammingLang] = React.useState(getLanguageData(stack));
    const [name, setName] = React.useState(null);

    const getName = async () => {
        const userName = await AsyncStorage.getItem('login');
        setName(userName);
    }

    React.useEffect(() => {
        getName()
    }, [isLogged])

    React.useEffect(()=> {
        setProgrammingLang(getLanguageData(stack));
    }, [stack, language])

    return (
        <ScrollView style={styles.container}>
            <Header navigation={navigation}/>
            <View style={{paddingHorizontal: 15}}>
                {name ? 
                    <View style={{borderWidth: 1, borderColor: '#77b18d', borderRadius: 10, alignSelf: 'flex-start', margin: 5}}>
                        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#77b18d', padding: 5 }}>Hi, {name} 👋</Text>
                    </View>
                : null }
                <View style={{flexDirection: 'row', marginBottom: 15, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.langugage}>{programmingLang.name}</Text>
                    <Image 
                    source={programmingLang.url}
                    style={{width: 40, height: 40}}></Image>
                </View>
                <View style={{alignItems: 'center'}}>
                    {/* <Text style={{color: 'white', textAlign: 'justify'}}>Here, you'll discover a set of 126 questions and answers, complete with code examples, created to assist you in preparing for your interview and enhance your proficiency in JavaScript. Sign In to save your progress.</Text> */}
                    <Progress/>
                </View>
                <QuestionContent/>
            </View>
        </ScrollView>
        
    )
}

export default Home;