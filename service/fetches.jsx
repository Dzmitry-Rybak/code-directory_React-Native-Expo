import AsyncStorage from '@react-native-async-storage/async-storage';
import config from "../config/config";
const _APIURL = config.apiUrl;

const createHeadersWithToken = async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = token ? {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    } : {'Content-Type': 'application/json'}
    return { headers };
}

export async function fetchQuestionsData (stack, language) {
    const stackRequest = stack.toLowerCase();
    const languageRequest = language.toLowerCase();
    const {headers} = await createHeadersWithToken();
    try{
        const response = await fetch(`${_APIURL}/getquestions?stack=${stackRequest}&language=${languageRequest}`, {
            method: 'GET',
            body: null,
            headers: headers
        });

        if (!response.ok) {
            const status = response.status;
            const errorData = await response.json();
            throw { status, message: errorData.message };
        }

        const data = await response.json();
        return data;
    } catch (error){
        console.error('Database Error', error);
        throw new Error('Failed to fetch questions data.');
    }
}

export async function fetchAnswerData (questionId, stack, language) {
    try{
        const response = await fetch(`${_APIURL}/getanswer?stack=${stack}&language=${language}&id=${questionId}`);

        if (!response.ok) {
            const status = response.status;
            const errorData = await response.json();
            throw { status, message: errorData.message };
        }
        
        const data = await response.json();
        return data;
    } catch (error){
        console.error('Database Error', error);
        throw new Error('Failer to fetch answer from data.');
    }
}

export async function fetchUser (url, values) {
    const response = await fetch(`${_APIURL}/${url}`, {
        method: "POST", 
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" }})
    
    const data = await response.json();

    return data;
}

export const postQuestion = async (formData) => {
    const {headers} = await createHeadersWithToken();
    const _APIURL = config.apiUrl;

    const rawFormData = {
            question: formData.question,
            answer: formData.answer,
            stack: formData.stack,
            language: formData.language,
        };
    try {
        const response = await fetch(`${_APIURL}/postnewquestion`, {
            method: "POST",
            body: JSON.stringify(rawFormData),
            headers: headers,
        })

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Database Error', error);
        throw new Error('Failer to post a new question');
    }   
}

export const signOut = async () => {
    try {
        await fetch(`${_APIURL}/logout`, {
            method: "POST",
            body: null,
            headers: { "Content-Type": "application/json" }
        })
    } catch(error) {
        console.error('Server Error ', error)
        throw new Error('Failed to log out.')
    }
}


export const deleteAccount = async () => {
    const {headers} = await createHeadersWithToken();

    try {
        await fetch(`${_APIURL}/delete`, {
            method: "DELETE",
            body: null,
            headers: headers
        })
    } catch (error) {
        console.error('Server Error ', error);
        throw new Error("Couldn't delete account")
    }
}

export async function getFilteredQuestions(stack, language) {
    const {headers} = await createHeadersWithToken();

    const request = await fetch(`${_APIURL}/updateFilter?stack=${stack}&language=${language}`, {
        method: "GET",
        body: null,
        headers: headers
    })

    const data = await request.json();
    return data;
}

export async function postFilteredQuestons(stack, language, filter, data) {
    const {headers} = await createHeadersWithToken();
    
    await fetch(`${_APIURL}/updateFilter?stack=${stack}&language=${language}`, {
        method: "POST",
        body: JSON.stringify({filter: filter, array: data}),
        headers: headers
    })
}