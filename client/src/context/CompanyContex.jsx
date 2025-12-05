import React, { createContext, useEffect, useReducer } from "react";

// Create context
export const CompaniesContext = createContext();

// Reducer function
export const companyReducer = (state, action) => {
  switch (action.type) {
    case "SET_COMPANIES":
      return { companies: action.payload };
    case "CREATE_COMPANIES":
      return { companies: [action.payload, ...state.companies] };
    default:
      return state;
  }
};

// Context provider
export const CompaniesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyReducer, {
    companies: null,
  });

  useEffect(() => {
    dispatch({ type: "SET_COMPANIES", payload: [{}, {}] });
  }, []);

  return (
    <CompaniesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CompaniesContext.Provider>
  );
};
