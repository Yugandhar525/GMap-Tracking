import React, { createContext, useReducer, useContext } from 'react';

const ShopContext = createContext();

const initialState = {
    details: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_DETAILS':
            return { ...state, details: action.payload };
        default:
            return state;
    }
};

const ShopProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addDetails = (newDetails) => {
        dispatch({ type: 'ADD_DETAILS', payload: newDetails });
    };

    return (
        <ShopContext.Provider value={{ state, addDetails }}>
            {children}
        </ShopContext.Provider>
    );
};

const useShopContext = () => {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error('useShopContext must be used within a ShopProvider');
    }
    return context;
};

export { ShopProvider, useShopContext };
