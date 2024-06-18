import { useHttp } from "./http.hook";
import AsyncStorage from '@react-native-async-storage/async-storage';

import config from "../config/config";

const useCodeDirService = () => {
    const {request} = useHttp();
    const _APIURL = config.apiUrl;

    const createHeadersWithToken = async () => {
        const token = await AsyncStorage.getItem('token');
        const headers = token ? {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        } : {'Content-Type': 'application/json'}
        return { headers };
    }

    const fetchQuestionsData = async (stack, language) => {
        const stackRequest = stack.toLowerCase();
        const languageRequest = language.toLowerCase();
        const {headers} = await createHeadersWithToken();
        const res = await request(`${_APIURL}/getquestions?stack=${stackRequest}&language=${languageRequest}`,
            'GET',
            null,
            headers
        );

        return res;
    }
    

    const postQuestion = async (formData) => {
        const {headers} = await createHeadersWithToken();
        const _APIURL = config.apiUrl;
    
        const rawFormData = {
                question: formData.question,
                answer: formData.answer,
                stack: formData.stack,
                language: formData.language,
            };
            const response = await request(`${_APIURL}/postnewquestion`,
                "POST",
                JSON.stringify(rawFormData),
                headers,
            )
            return response  
    }

    // const fetchAnswerData = async (questionId, stack, language) => {
    //         const response = await request(`${_APIURL}/getanswer?stack=${stack}&language=${language}&id=${questionId}`);
    //         return response;
    // }

    // const getFilteredQuestions = async (stack, language) => {
    //     const {headers} = await createHeadersWithToken();
    
    //     const response = await request(`${_APIURL}/updateFilter?stack=${stack}&language=${language}`,
    //         "GET",
    //         null,
    //         headers
    //     )
    // console.log('getFilteredQuestions from CodeDirServ.js', response)
    //     return response;
    // };


    // const postFilteredQuestons = async (stack, language, filter, data) => {
    //     const {headers} = await createHeadersWithToken();
        
    //     const response = await request(`${_APIURL}/updateFilter?stack=${stack}&language=${language}`, 
    //         "POST",
    //         JSON.stringify({filter: filter, array: data}),
    //         headers
    //     );
    //     return response;
    // }

    const  getFilteredQuestions = async (stack, language) =>  {
        const {headers} = await createHeadersWithToken();
    
        const request = await fetch(`${_APIURL}/updateFilter?stack=${stack}&language=${language}`, {
            method: "GET",
            body: null,
            headers: headers
        })
        const data = await request.json();
        return data;
    }

    const  postFilteredQuestons = async (stack, language, filter, data) => {
        const {headers} = await createHeadersWithToken();
        
        await fetch(`${_APIURL}/updateFilter?stack=${stack}&language=${language}`, {
            method: "POST",
            body: JSON.stringify({filter: filter, array: data}),
            headers: headers
        })
    }



    const fetchUser = async (url, values) => {
        const response = await request(`${_APIURL}/${url}`, 
            "POST", 
            JSON.stringify(values))
        return response;
    }

    const signOut = async () => {
            const response = await request(`${_APIURL}/logout`, 
                "POST",
                null,
            )
            return response;
    }

    const deleteAccount = async () => {
        const {headers} = await createHeadersWithToken();

            const response = await request(`${_APIURL}/delete`, 
                "DELETE",
                null,
                headers
            )
            return response;
    }

    const handleVerifyCode = async (code) => {
            const {headers} = await createHeadersWithToken();
            const response = await request(`${_APIURL}/verify-code`,  
                'POST', 
                JSON.stringify({ code }),
                headers)
    
            return response
    };

    const getCodeForPickerStack = async () => {
    
        const {headers} = await createHeadersWithToken();

        const response = await request(`${_APIURL}/getcodestacks`, 
            'GET',
            null,
            headers
        );
        return response
    }

    return {
        fetchQuestionsData, 
        getFilteredQuestions, 
        postFilteredQuestons,
        postQuestion, 
        fetchUser, 
        signOut, 
        deleteAccount, 
        handleVerifyCode,
        getCodeForPickerStack
    }

}

export default useCodeDirService;