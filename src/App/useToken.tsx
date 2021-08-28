import { stringify } from 'querystring';
import { useState } from 'react';

export default function useToken() {

    const getToken = () => {
        const tokenString:string | null = sessionStorage.getItem('token');
        const userToken:any = JSON.parse(String(tokenString));
        return userToken.token;
        };
    
    const [token, setToken] = useState<string>();
    
    const saveToken:any = (userToken:any) => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
      };
    
    return {
        setToken: saveToken,
        token
    };
}