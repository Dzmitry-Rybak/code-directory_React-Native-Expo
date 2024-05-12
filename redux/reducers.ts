import { IQuestion } from "../interfaces/Questions";
import { 
    QUESTIONS_FETCHED, 
    QUESTIONS_FETCHING, 
    QUESTION_SELECTED, 
    LANGUAGE_SELECTED, 
    STACK_SELECTED, 
    IS_LOGGED_IN, 
    QUESTION_SELECTED_ID, 
    FILTER, 
    REPEAT_QUESTION, 
    MEMORIZED_QUESTIONS } from "./actions";

interface IQuestionsState {
    questions: IQuestion[];
    pickedQuestion: IQuestion | {};
    selectedId: number;
    language: string,
    stack: string,
    isLogged: boolean
}

interface IQuestionsActions {
    type: string;
    payload: IQuestion[] | {}
}

const initialState: IQuestionsState = {
    questions: [],
    pickedQuestion: {},
    language: 'english',
    stack: 'javascript',
    selectedId: 1,
    isLogged: false
};

export const questionsReducer = (state = initialState, actions: IQuestionsActions) => {
    switch(actions.type){
        case QUESTIONS_FETCHED:
            return {
                ...state,
                questions: actions.payload,
                pickedQuestion: actions.payload[0]
            }
        case QUESTION_SELECTED:
            return {
                ...state,
                pickedQuestion: actions.payload
            }
        case QUESTION_SELECTED_ID:
            return {
                ...state,
                selectedId: actions.payload
            }
        case LANGUAGE_SELECTED:
            return {
                ...state,
                language: actions.payload
            }
        case STACK_SELECTED:
            return {
                ...state,
                stack: actions.payload
            }
        case IS_LOGGED_IN:
            return {
                ...state,
                isLogged: actions.payload
            }
        default:
            return state;
    }
}

const initialFilterState = {
    repeatQuestion: [],
    memorizedQuestions: [],
    filter: 'repeat'
}

export const filterReducer = (state = initialFilterState, actions) => {
    switch(actions.type) {
        case FILTER: 
            return {
                ...state,
                filter: actions.payload,
            }
        case REPEAT_QUESTION:
            return {
                ...state,
                repeatQuestion:actions.payload,
            }
        case MEMORIZED_QUESTIONS:
            return {
                ...state,
                memorizedQuestions:actions.payload,
            }
        default: 
            return state;
    }
}