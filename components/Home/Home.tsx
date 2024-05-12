import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';

import QuestionContent from "../QuestionContent/QuestionContent";
import styles from './HomeStyles.jsx';
import Progress from "../Progress/Progress";
// @ts-ignore
import js from '../../assets/languages/javascript.png';
import Header from "../Header/Header";

// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';




interface HomeProps {
    navigation: StackNavigationProp<any>;
}

const Home: React.FC<HomeProps>  = ({ navigation}) => {

    return (

        <ScrollView style={styles.container}>
            <Header navigation={navigation}/>
            <View style={{paddingHorizontal: 15, paddingVertical: 15}}>
                <View style={{flexDirection: 'row', marginBottom: 15, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.langugage}>JavaScript</Text>
                    <Image source={js} style={{width: 30, height: 30}}></Image>
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