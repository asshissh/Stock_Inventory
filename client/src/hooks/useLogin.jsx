import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "./useAuthContext";
import { API_ENDPOINTS } from "../config/api";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const {dispatch} = useAuthContext();
    const navigate = useNavigate()

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })

        })
        const json = await response.json();
        if (!response) {
            setIsLoading(false)
            setError(json.error);

        } else {

            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            //update the auth context 

            dispatch({ type: 'LOGIN', payload: json });


            //update loading state
            setIsLoading(false);

            //Redirect after succesful login
            navigate('/dashboard/companies')


        }
    }
    return { login, isLoading, error }
}