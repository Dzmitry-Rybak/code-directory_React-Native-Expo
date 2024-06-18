import { useCallback } from 'react';

export const useHttp = () => {
    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        try {

            const response = await fetch(url, { method, body, headers });
            
            // if (!response.ok) {
            //     const errorText = await response.text();
            //     // throw new Error(`Could not fetch ${url}, status: ${response.status}, message: ${errorText}`);
            // }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('HTTP Error:', error);
            throw error;
        }
    }, []);

    return { request };
}
