import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { useSelector, useDispatch } from 'react-redux';

import { IRootState } from "../../interfaces/Questions";
import styles from './QuestionContentStyles';
import { fetchAnswerData } from "../../service/fetches";
import { questionSelected, questionSelectedId, repeatData, memorizedData } from "../../redux/actions";
import {LoadingAnswer} from "../Loading/Loading";

import { getFilteredQuestions, postFilteredQuestons } from "../../service/fetches";

import Swipeable from 'react-native-gesture-handler/Swipeable';


const QuestionContent: React.FC = () => {
    // const [repeatQuestion, setRepeatQuestion] = React.useState([]);
    // const [memorizedQuestions, setMemorizedQuestions] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const {pickedQuestion, selectedId, stack, language} = useSelector((state:IRootState) => state.questionsReducer);
    const {filter, repeatQuestion, memorizedQuestions} = useSelector((state) => state.filterReducer);

    const dispatch = useDispatch();

    const fetchAnswer = async () => {
        setIsLoading(true);
        await fetchAnswerData(selectedId, stack, language)
        .then(data => {
            setIsLoading(false);
            dispatch(questionSelected(data.data[0]))
        })
    }

    const filtersRequest = async () => {
        await getFilteredQuestions(stack, language).then(req => {
            const { data: { repeat: repeatDatas, memorized: memorizedDatas } } = req;
            dispatch(repeatData(repeatDatas));
            dispatch(memorizedData(memorizedDatas));
            // setRepeatQuestion(repeatDatas);
            // setMemorizedQuestions(memorizedDatas);
        })
    } 

    const handleNextQuestion = () => {
        const nextQuestion = selectedId + 1;
        console.log(repeatQuestion)
        dispatch(questionSelectedId(nextQuestion))
    }
    const handlePrevQuestion = () => {
        const prevQuestion = selectedId - 1
        dispatch(questionSelectedId(prevQuestion))
    }

    
    React.useEffect(() => {
        fetchAnswer();
        filtersRequest()
    }, [selectedId]);
    
    React.useEffect(() => {
        fetchAnswer()
    }, []);
    
    if(isLoading){
        return <LoadingAnswer/>
    }

    const onRepeatQuestion = async id => {
        let updatedRepeatQuestions = [];
        if (repeatQuestion.includes(id)) {
            updatedRepeatQuestions = repeatQuestion.filter(questionId => questionId !== id);
        } else {
            updatedRepeatQuestions = [...repeatQuestion.filter(questionId => !memorizedQuestions.includes(questionId)), id];
        }
        
        const updatedMemorizedQuestions = memorizedQuestions.filter(questionId => !updatedRepeatQuestions.includes(questionId));
        dispatch(repeatData(updatedRepeatQuestions));
        dispatch(memorizedData(updatedMemorizedQuestions));
        // setRepeatQuestion(updatedRepeatQuestions);
        // setMemorizedQuestions(updatedMemorizedQuestions);

        await postFilteredQuestons(stack, language, 'repeat', updatedRepeatQuestions);
        await postFilteredQuestons(stack, language, 'memorized', updatedMemorizedQuestions);
    }
      
    const onMemorizedQuestion = async id => {
        handleNextQuestion();
        let updatedMemorizedQuestions = [];
        if (memorizedQuestions.includes(id)) {
            updatedMemorizedQuestions = memorizedQuestions.filter(questionId => questionId !== id);
        } else {
            updatedMemorizedQuestions = [...memorizedQuestions.filter(questionId => !repeatQuestion.includes(questionId)), id];
        }

        const updatedRepeatQuestions = repeatQuestion.filter(questionId => !updatedMemorizedQuestions.includes(questionId));
        dispatch(repeatData(updatedRepeatQuestions));
        dispatch(memorizedData(updatedMemorizedQuestions));
        // setMemorizedQuestions(updatedMemorizedQuestions);
        // setRepeatQuestion(updatedRepeatQuestions);

        await postFilteredQuestons(stack, language, 'memorized', updatedMemorizedQuestions);
        await postFilteredQuestons(stack, language, 'repeat', updatedRepeatQuestions);
    }

    return (
        <View style={styles.wrapper}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>{pickedQuestion.question}</Text>
            <View style={styles.line}/>
            <Text style={styles.answer}>{pickedQuestion.answer}</Text>
            <View style={styles.btnWrapper}>
                <TouchableOpacity style={styles.btn} onPress={handlePrevQuestion}>
                    <Text style={styles.btnText}>PREV</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>EXAMPLE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={handleNextQuestion}>
                    <Text style={styles.btnText}>NEXT</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.btnFetch}>
                <TouchableOpacity style={styles.btn} onPress={() => onRepeatQuestion(selectedId)}>
                    <Text style={styles.btnText}>REPEAT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => onMemorizedQuestion(selectedId)}>
                    <Text style={styles.btnText}>MEMORIZED</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default QuestionContent;