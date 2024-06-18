export const QUESTIONS_FETCHING = 'QUESTIONS_FETCHING';
export const QUESTIONS_FETCHED = 'QUESTIONS_FETCHED';
export const QUESTION_SELECTED = 'QUESTION_SELECTED';
export const LANGUAGE_SELECTED_FROM_STORE = 'LANGUAGE_SELECTED_FROM_STORE';
export const STACK_SELECTED_FROM_STORE = 'STACK_SELECTED_FROM_STORE';
export const IS_LOGGED_IN = 'IS_LOGGED_IN';
export const QUESTION_SELECTED_ID_FROM_STORE = 'QUESTION_SELECTED_ID_FROM_STORE';
export const FILTER = 'FILTER';
export const REPEAT_QUESTION = 'REPEAT_QUESTION';
export const MEMORIZED_QUESTIONS = 'MEMORIZED_QUESTIONS';
export const PICKER_STACK_RENDER = 'PICKER_STACK_RENDER';

export const questionsFetching = (isLoadingQuestions) => ({
    type: 'QUESTIONS_FETCHING',
    payload: isLoadingQuestions
});

export const questionsUpdate = (updateQuestionsFetch) => ({
    type: 'QUESTIONS_FETCHING',
    payload: updateQuestionsFetch
});

export const stackPickerFetching = (pickerStacksRender) => ({
    type: 'PICKER_STACK_RENDER',
    payload: pickerStacksRender
});

export const questionsFetched = (questions) => {
    return {
        type: 'QUESTIONS_FETCHED',
        payload: questions
    }
};

export const questionSelected = (pickedQuestion) => {
    return {
        type: 'QUESTION_SELECTED',
        payload: pickedQuestion
    }
}

export const questionSelectedId = (id: number) => {
    return {
        type: 'QUESTION_SELECTED_ID_FROM_STORE',
        payload: id
    }
}

export const languageSelected = (language: string) => {
    return {
        type: 'LANGUAGE_SELECTED_FROM_STORE',
        payload: language
    }
}

export const stackSelected = (stack: string) => {
    return {
        type: 'STACK_SELECTED_FROM_STORE',
        payload: stack
    }
}

export const isLoggedIn = (logged: boolean) => {
    return {
        type: 'IS_LOGGED_IN',
        payload: logged
    }
}

export const filteredQuestion = (filter: string) => {
    return {
        type: 'FILTER',
        payload: filter
    }
}

export const repeatData = (repeatArray) => {
    return {
        type: 'REPEAT_QUESTION',
        payload: repeatArray
    }
}

export const memorizedData = (memorizedArray) => {
    return {
        type: 'MEMORIZED_QUESTIONS',
        payload: memorizedArray
    }
}