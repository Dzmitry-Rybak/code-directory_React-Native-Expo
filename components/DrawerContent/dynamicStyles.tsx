export const getTextDecoration = (questionId: number, selectedId: number) => {
    if (questionId === selectedId) {
        return 'underline';
    } else {
        return 'none';
    }
}

export const getColor = (questionId: number, repeatQuestion, memorizedQuestions) => {
    if (repeatQuestion.includes(questionId)) {
        return '#ecec27';
    } else if (memorizedQuestions.includes(questionId)){
        return '#88bc2e';
    } else {
        return '#000000';
    }
}