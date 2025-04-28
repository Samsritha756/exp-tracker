import React, { useState, useContext } from 'react';
import axios from 'axios';

const BASE_URL = "http://localhost:5001/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]); // Initialize history state

    // Fetch incomes
    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`);
            setIncomes(response.data);
        } catch (err) {
            console.error("Error fetching incomes:", err);
            setError("Failed to fetch incomes");
        }
    };


    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}add-income`, income);
            if (response && response.data) {
                getIncomes();
                return response;
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            console.error("Error adding income:", err);
            setError("Error adding income. Please try again.");
            return null;
        }
    };


    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`);
            getIncomes();
        } catch (err) {
            console.error("Error deleting income:", err);
        }
    };


    const totalIncome = () => {
        return incomes.reduce((acc, income) => acc + income.amount, 0);
    };

    // Fetch expenses (Fixed issue)
    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`);
            setExpenses(response.data);
        } catch (err) {
            console.error("Error fetching expenses:", err);
            setError("Failed to fetch expenses");
        }
    };


    const addExpense = async (expense) => {
        try {
            const response = await axios.post(`${BASE_URL}add-expense`, expense);
            if (response && response.data) {
                getExpenses();
                return response;
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            console.error("Error adding expense:", err);
            setError("Error adding expense. Please try again.");
            return null;
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`);
            getExpenses();
        } catch (err) {
            console.error("Error deleting expense:", err);
        }
    };


    const totalExpenses = () => {
        return expenses.reduce((acc, expense) => acc + expense.amount, 0);
    };




    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return history
    };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
            addExpense,
            getExpenses,
            expenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            history 
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};