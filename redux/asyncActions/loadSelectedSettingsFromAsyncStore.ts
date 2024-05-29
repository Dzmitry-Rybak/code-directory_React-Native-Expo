import AsyncStorage from "@react-native-async-storage/async-storage";
import { QUESTION_SELECTED_ID_FROM_STORE, STACK_SELECTED_FROM_STORE, LANGUAGE_SELECTED_FROM_STORE } from "../actions";

export const loadSelectedSettingsFromAsyncStore = () => {
    return async (dispatch) => {
        try {
            const [stack, language, selectedId] = await Promise.all([
                AsyncStorage.getItem('stack'),
                AsyncStorage.getItem('language'),
                AsyncStorage.getItem('selectedId')
            ]);

            if (stack !== null) {
                dispatch({
                    type: STACK_SELECTED_FROM_STORE,
                    payload: stack
                });
            }
            
            if (language !== null) {
                dispatch({
                    type: LANGUAGE_SELECTED_FROM_STORE,
                    payload: language
                });
            }

            if (selectedId !== null) {
                dispatch({
                    type: QUESTION_SELECTED_ID_FROM_STORE,
                    payload: parseInt(selectedId, 10)
                });
            }

        } catch (error) {
            console.error('Failed to load data from AsyncStorage:', error);
        }
    };
};
