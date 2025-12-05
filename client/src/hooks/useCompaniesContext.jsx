import { useContext } from "react"
import { CompaniesContext } from "../context/CompanyContex"

export const useCompaniesContext  =()=>{
    const context = useContext(CompaniesContext);
    if(!context){
        throw Error(
            "useCompaniesContex should be used inside an CompaniesContextProvider"
        )
    }
    return context;
}