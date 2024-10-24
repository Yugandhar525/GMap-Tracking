import React, { createContext, useContext, useReducer } from 'react';

const SaleContext = createContext();

const initialState = {
    sales: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_SALE':
            return { ...state, sales: [...state.sales, action.payload] };
        default:
            return state;
    }
};

const SaleProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addSale = (sale) => {
        dispatch({ type: 'ADD_SALE', payload: sale });
    };

    return (
        <SaleContext.Provider value={{ state, addSale }}>
            {children}
        </SaleContext.Provider>
    );
};

const useSaleContext = () => {
    const context = useContext(SaleContext);
    console.log("Context-->"+context);
    if (!context) {
        throw new Error('useSaleContext must be used within a SaleProvider');
    }
    return context;
};

export { SaleProvider, useSaleContext };
