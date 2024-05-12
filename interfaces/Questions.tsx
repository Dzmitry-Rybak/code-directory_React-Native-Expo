export interface IQuestion {
    answer: string;
    example_path: string;
    question: string;
    question_id: number;
}

export interface IRootState {
    questionsReducer: {
        questions: IQuestion[];
        pickedQuestion: IQuestion;
    },
    stack: string,
    language: string,
    selectedId: number
}
