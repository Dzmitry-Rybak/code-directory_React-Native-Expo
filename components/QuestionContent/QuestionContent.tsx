import React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";

import { useSelector, useDispatch } from 'react-redux';

import { IRootState } from "../../interfaces/Questions";
import styles from './QuestionContentStyles';
import { fetchAnswerData } from "../../service/fetches";
import { questionSelected, questionSelectedId, repeatData, memorizedData, questionsFetching } from "../../redux/actions";
import { LoadingAnswer} from "../Loading/Loading";

import { getFilteredQuestions, postFilteredQuestons } from "../../service/fetches";

// import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ModalExample } from "../Modal/Modal";


const QuestionContent: React.FC = () => {
    const [isModalVisibleExample, setIsModalVisibleExample] = React.useState(false);
    const [isNextDisable, setIsNextDisable] = React.useState(false);
    const [isPrevDisable, setIsPrevDisable] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    const {pickedQuestion, selectedId, stack, language, isLogged, questions, isLoadingQuestions} = useSelector((state:IRootState) => state.questionsReducer);
    const { repeatQuestion, memorizedQuestions } = useSelector((state) => state.filterReducer);

    const dispatch = useDispatch();

    React.useEffect(() => {
        setIsNextDisable(selectedId === questions.length);
        setIsPrevDisable(selectedId === 1);
    }, [selectedId, questions.length]);

    const fetchAnswer = async () => {
        // setIsLoading(true);
        dispatch(questionsFetching(true));
        await fetchAnswerData(selectedId, stack, language)
        .then(data => {
            // setIsLoading(false);
            dispatch(questionsFetching(false));
            dispatch(questionSelected(data.data[0]))
        })
    }

    const filtersRequest = async () => {
        await getFilteredQuestions(stack, language).then(req => {
            dispatch(repeatData([]));
            dispatch(memorizedData([]));
            if(req.message !== 'Unauthorized' && req.data) {
                const { data: { repeat: repeatDatas, memorized: memorizedDatas } } = req;
                dispatch(repeatData(repeatDatas));
                dispatch(memorizedData(memorizedDatas));
                dispatch(questionsFetching(false));
            }
        })
    } 

    const handleNextQuestion = () => {
        const nextQuestion = selectedId + 1;
        dispatch(questionSelectedId(nextQuestion))
        if(nextQuestion === (questions.length)) {
            setIsNextDisable(true);
        }
    }
    const handlePrevQuestion = () => {
        const prevQuestion = selectedId - 1;
        if(prevQuestion === 1) {
            setIsPrevDisable(true);
        }
        dispatch(questionSelectedId(prevQuestion))
    }



    React.useEffect(() => {
        fetchAnswer();
        filtersRequest();
    }, [selectedId, isLogged, stack, language]);
    
    React.useEffect(() => {
        fetchAnswer()
    }, []);
    
    if(isLoadingQuestions){
        return <LoadingAnswer/>
    }

    const onRepeatQuestion = async id => {
        if(!isNextDisable) handleNextQuestion();
        let updatedRepeatQuestions = [];
        if (repeatQuestion.includes(id)) {
            updatedRepeatQuestions = repeatQuestion.filter(questionId => questionId !== id);
        } else {
            updatedRepeatQuestions = [...repeatQuestion.filter(questionId => !memorizedQuestions.includes(questionId)), id];
        }
        
        const updatedMemorizedQuestions = memorizedQuestions.filter(questionId => !updatedRepeatQuestions.includes(questionId));
        dispatch(repeatData(updatedRepeatQuestions));
        dispatch(memorizedData(updatedMemorizedQuestions));

        await postFilteredQuestons(stack, language, 'repeat', updatedRepeatQuestions);
        await postFilteredQuestons(stack, language, 'memorized', updatedMemorizedQuestions);
    }
      
    const onMemorizedQuestion = async id => {
        if(!isNextDisable) handleNextQuestion();
        let updatedMemorizedQuestions = [];
        if (memorizedQuestions.includes(id)) {
            updatedMemorizedQuestions = memorizedQuestions.filter(questionId => questionId !== id);
        } else {
            updatedMemorizedQuestions = [...memorizedQuestions.filter(questionId => !repeatQuestion.includes(questionId)), id];
        }

        const updatedRepeatQuestions = repeatQuestion.filter(questionId => !updatedMemorizedQuestions.includes(questionId));
        dispatch(repeatData(updatedRepeatQuestions));
        dispatch(memorizedData(updatedMemorizedQuestions));

        await postFilteredQuestons(stack, language, 'memorized', updatedMemorizedQuestions);
        await postFilteredQuestons(stack, language, 'repeat', updatedRepeatQuestions);
    }
    
    if(!pickedQuestion) {
        return <LoadingAnswer/>
    }

    return (
        <View style={styles.wrapper}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>{pickedQuestion.question}</Text>
            <View style={styles.line}/>
            <Text style={styles.answer}>{pickedQuestion.answer}</Text>
            <View style={styles.btnWrapper}>
                <TouchableOpacity style={isPrevDisable ? styles.btnDisabled : styles.btn}  onPress={handlePrevQuestion} disabled={isPrevDisable}>
                    <Text style={styles.btnText}>PREV</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={pickedQuestion.example_path === 'not available' ? styles.btnDisabled : styles.btn} 
                    onPress={() => setIsModalVisibleExample(true)} 
                    disabled={pickedQuestion.example_path === 'not available'}>
                        <Text style={styles.btnText}>EXAMPLE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={isNextDisable ? styles.btnDisabled : styles.btn} onPress={handleNextQuestion} disabled={isNextDisable}>
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
            <ModalExample src={pickedQuestion.example_path} isModalVisibleExample={isModalVisibleExample} setIsModalVisibleExample={setIsModalVisibleExample}/>
        </View>
    )
}

export default QuestionContent;