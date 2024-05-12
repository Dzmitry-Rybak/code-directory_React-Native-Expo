export const QUESTIONS_FETCHING = 'QUESTIONS_FETCHING';
export const QUESTIONS_FETCHED = 'QUESTIONS_FETCHED';
export const QUESTION_SELECTED = 'QUESTION_SELECTED';
export const LANGUAGE_SELECTED = 'LANGUAGE_SELECTED';
export const STACK_SELECTED = 'STACK_SELECTED';
export const IS_LOGGED_IN = 'IS_LOGGED_IN';
export const QUESTION_SELECTED_ID = 'QUESTION_SELECTED_ID';

export const FILTER = 'FILTER';
export const REPEAT_QUESTION = 'REPEAT_QUESTION';
export const MEMORIZED_QUESTIONS = 'MEMORIZED_QUESTIONS';

export const questionsFetching = () => ({
    type: 'QUESTIONS_FETCHING'
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
export const questionSelectedId = (pickedQuestion) => {
    return {
        type: 'QUESTION_SELECTED_ID',
        payload: pickedQuestion
    }
}

export const languageSelected = (language) => {
    return {
        type: 'LANGUAGE_SELECTED',
        payload: language
    }
}

export const stackSelected = (stack) => {
    return {
        type: 'STACK_SELECTED',
        payload: stack
    }
}

export const isLoggedIn = (logged) => {
    return {
        type: 'IS_LOGGED_IN',
        payload: logged
    }
}

export const filteredQuestion = (filter) => {
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