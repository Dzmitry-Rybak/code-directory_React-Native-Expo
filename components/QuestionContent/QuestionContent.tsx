import React from "react";
import { Text, View, TouchableOpacity, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { IRootState } from "../../interfaces/Questions";
import styles from './QuestionContentStyles';
import { questionSelected, questionSelectedId, repeatData, memorizedData, questionsFetching } from "../../redux/actions";
import { LoadingAnswer} from "../Loading/Loading";
import { ModalExample, ModalPleaseSignUp } from "../Modal/Modal";
import useCodeDirService from "../../service/CodeDirectoryService";

const QuestionContent: React.FC = () => {
    const {getFilteredQuestions, postFilteredQuestons} = useCodeDirService()
    const [isModalVisibleExample, setIsModalVisibleExample] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isNextDisable, setIsNextDisable] = React.useState(false);
    const [isPrevDisable, setIsPrevDisable] = React.useState(false);
    const [isUnauthShowed, setIsUnauthShowed] = React.useState(false);
    const { t } = useTranslation();

    const opacity = React.useRef(new Animated.Value(0)).current;
    const translateY = React.useRef(new Animated.Value(10)).current;
    
    const {pickedQuestion, selectedId, stack, language, isLogged, questions} = useSelector((state:IRootState) => state.questionsReducer);
    const { repeatQuestion, memorizedQuestions } = useSelector((state) => state.filterReducer);

    const dispatch = useDispatch();

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

    React.useEffect(() => {
        setIsNextDisable(selectedId === questions.length);
        setIsPrevDisable(selectedId === 1);
    }, [selectedId, questions.length]);

    React.useEffect(() => {
        fetchAnswer();
    }, [selectedId, isLogged, questions]);

    React.useEffect(() => {
        filtersRequest();
    }, [isLogged, stack, language]);

    const fetchAnswer = () => {
        const pickedQ = questions.findIndex(question => {
            return question.row_num == selectedId
        });
        
        // поиграться с сеттаймаут
        if (pickedQ === -1) {
            AsyncStorage.setItem('selectedId', '1');
            dispatch(questionSelectedId(1));
            
        } else {
            setTimeout(() => {
                dispatch(questionSelected(questions[pickedQ]));
            }, 500);
        }


    }

    const fadeIn = () => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start();
    };
    
    const fadeOut = (callback) => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 10,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start(() => {
            if (callback) callback();
        });
    };
    

    React.useEffect(() => {
        fadeOut(() => fadeIn());
    }, [selectedId]);
    


    const handleNextQuestion = () => {
        const nextQuestion = selectedId + 1;
        dispatch(questionSelectedId(nextQuestion));
        if(nextQuestion === questions.length) {
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


    const unauthorizedProgress = () => {
        setIsLoggedIn(true);
        setIsUnauthShowed(true)
        setTimeout(() => {
            setIsLoggedIn(false);
        }, 5000);
    };

    const onRepeatQuestion = async (id: number) => {
        if(!isLogged && !isUnauthShowed) unauthorizedProgress();
        if(!isNextDisable) handleNextQuestion();
        let updatedRepeatQuestions = [];
        if (repeatQuestion.includes(id)) {
            updatedRepeatQuestions = repeatQuestion.filter(questionId => questionId !== id);
        } else {
            updatedRepeatQuestions = [...repeatQuestion.filter(questionId => !memorizedQuestions.includes(questionId)), id];
        }
        
        const updatedMemorizedQuestions = memorizedQuestions.filter(questionId => !updatedRepeatQuestions.includes(questionId));
        await postFilteredQuestons(stack, language, 'repeat', updatedRepeatQuestions);
        await postFilteredQuestons(stack, language, 'memorized', updatedMemorizedQuestions);
        dispatch(repeatData(updatedRepeatQuestions));
        dispatch(memorizedData(updatedMemorizedQuestions));

    }

    const onMemorizedQuestion = async (id:number) => {
        if(!isLogged && !isUnauthShowed) unauthorizedProgress();
        if(!isNextDisable) handleNextQuestion();
        let updatedMemorizedQuestions = [];
        if (memorizedQuestions.includes(id)) {
            updatedMemorizedQuestions = memorizedQuestions.filter(questionId => questionId !== id);
        } else {
            updatedMemorizedQuestions = [...memorizedQuestions.filter(questionId => !repeatQuestion.includes(questionId)), id];
        }

        const updatedRepeatQuestions = repeatQuestion.filter(questionId => !updatedMemorizedQuestions.includes(questionId));
        await postFilteredQuestons(stack, language, 'memorized', updatedMemorizedQuestions);
        await postFilteredQuestons(stack, language, 'repeat', updatedRepeatQuestions);
        dispatch(repeatData(updatedRepeatQuestions));
        dispatch(memorizedData(updatedMemorizedQuestions));

    }
    
    if(!pickedQuestion) {
        return <LoadingAnswer/>
    }

    return (
        <Animated.View style={{
            backgroundColor: '#fff',
            padding: 15,
            borderRadius: 10,
            flex: 1,
            marginBottom: 40,
            opacity,
            transform: [{translateY}]}}>
            <Text style={{fontWeight: 'bold', fontSize: 15, }}>{pickedQuestion.row_num}. {pickedQuestion.question}</Text>
            <View style={styles.line}/>
            <Text style={{ minHeight: 200, fontSize: 15, }}>{pickedQuestion.answer}</Text>
            <View style={styles.btnWrapper}>
                <TouchableOpacity style={isPrevDisable ? styles.btnDisabled : styles.btn}  onPress={handlePrevQuestion} disabled={isPrevDisable}>
                    <Text style={styles.btnText}>{t('prev')}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={pickedQuestion.example_path === 'not available' ? styles.btnDisabled : styles.btn} 
                    onPress={() => setIsModalVisibleExample(true)} 
                    disabled={pickedQuestion.example_path === 'not available'}>
                        <Text style={styles.btnText}>{t('example')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={isNextDisable ? styles.btnDisabled : styles.btn} onPress={handleNextQuestion} disabled={isNextDisable}>
                    <Text style={styles.btnText}>{t('next')}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.btnFetch}>
                <TouchableOpacity style={styles.btn} onPress={() => onRepeatQuestion(pickedQuestion.question_id)}>
                    <Text style={styles.btnText}>{t('repeat')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => onMemorizedQuestion(pickedQuestion.question_id)}>
                    <Text style={styles.btnText}>{t('memorized')}</Text>
                </TouchableOpacity>
            </View>
            <ModalPleaseSignUp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <ModalExample src={pickedQuestion.example_path} isModalVisibleExample={isModalVisibleExample} setIsModalVisibleExample={setIsModalVisibleExample}/>
        </Animated.View>
    )
}

export default QuestionContent;