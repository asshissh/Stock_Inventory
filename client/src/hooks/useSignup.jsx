import { useState } from "react"
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";


export const  useSignup =()=>{
 const [error,setError] = useState(null);
 const [isLoading,setIsLoading] = useState(false);
 const {dispatch} = useAuthContext();
 const navigate = useNavigate();

 const signup = async(username,email,password)=>{
    setIsLoading(true);
    setError(null);

    const response = await fetch(API_ENDPOINTS.AUTH.SIGNUP,{
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({username,email,password})
    })
    const json = await response.json();
    if(!response.ok){
        setIsLoading(false);
        setError(json.error);
    }else{
        //save the user to localStorage 
        localStorage.setItem('user',JSON.stringify(json));

        //update the auth context 
        dispatch({type:'LOGIN',payload:json});
        
        //update loading state
        setIsLoading(false);

        //redirect after successful Login
        navigate('/dashboard/companies')
    }
 }
 return {signup,isLoading,error}
}