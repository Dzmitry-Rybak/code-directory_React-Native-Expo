import { IQuestion } from "../interfaces/Questions";
import { 
    QUESTIONS_FETCHED, 
    QUESTIONS_FETCHING, 
    QUESTION_SELECTED, 
    LANGUAGE_SELECTED_FROM_STORE,
    STACK_SELECTED_FROM_STORE,
    IS_LOGGED_IN, 
    FILTER, 
    REPEAT_QUESTION, 
    MEMORIZED_QUESTIONS,
    QUESTION_SELECTED_ID_FROM_STORE } from "./actions";

interface IQuestionsState {
    questions: IQuestion[];
    pickedQuestion: IQuestion | {};
    selectedId: number;
    language: string,
    stack: string,
    isLogged: boolean,
    isLoadingQuestions: boolean
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
    isLogged: false,
    isLoadingQuestions: false
};

export const questionsReducer = (state = initialState, actions: IQuestionsActions) => {
    switch(actions.type){
        case QUESTIONS_FETCHING: {
            return {
                ...state,
                isLoadingQuestions: actions.payload as boolean
            }
        }
        case QUESTIONS_FETCHED:
            return {
                ...state,
                questions: actions.payload as IQuestion[],
                // pickedQuestion: (actions.payload as IQuestion[])[0]
            }
        case QUESTION_SELECTED:
            return {
                ...state,
                pickedQuestion: actions.payload as IQuestion
            }
        case QUESTION_SELECTED_ID_FROM_STORE:
            return {
                ...state,
                selectedId: actions.payload as number
            }
        case LANGUAGE_SELECTED_FROM_STORE:
            return {
                ...state,
                language: actions.payload as string
            }
        case STACK_SELECTED_FROM_STORE:
            return {
                ...state,
                stack: actions.payload as string
            }
        case IS_LOGGED_IN:
            return {
                ...state,
                isLogged: actions.payload as boolean
            }
        default:
            return state;
    }
}

const initialFilterState = {
    repeatQuestion: [],
    memorizedQuestions: [],
    filter: 'all'
}

export const filterReducer = (state = initialFilterState, actions) => {
    switch(actions.type) {
        case FILTER: 
            return {
                ...state,
                filter: actions.payload as string,
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