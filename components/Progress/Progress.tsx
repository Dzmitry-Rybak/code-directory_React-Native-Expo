import React from 'react';
import { View, Text } from 'react-native';

import { useSelector } from 'react-redux';
import styles from './ProgressStyles';

const Progress: React.FC = () => {
    const { questions } = useSelector((state) => state.questionsReducer);
    const { memorizedQuestions } = useSelector((state) => state.filterReducer);

    const getProgressWidth = (memorizedQuestionsLength, questionsCount) => {
        return `${(memorizedQuestionsLength * 100) / questionsCount}%`
    }

    return (
        <View style={styles.wrapper}>
            <Text style={{color: 'white', fontSize: 19, fontFamily: 'Kanit-Bold'}}>Progress:</Text>
            <View style={styles.scaleWrap}>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    backgroundColor: '#417647',
                    width: getProgressWidth(memorizedQuestions.length, questions.length),
                    borderRadius: 7
                }}/>
            </View>
            <Text style={{
                color: 'white',
                fontSize: 19,
                fontFamily: 'Kanit-Regular'
            }}>{memorizedQuestions.length}/{questions.length}</Text>
        </View>
    )
}

export default Progress;