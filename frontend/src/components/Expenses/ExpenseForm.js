import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import { plus } from '../../utils/Icons';
import Button from '../Button/Button';

function ExpenseForm() {
    const { addExpense, getExpenses } = useGlobalContext();  
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: ''
    });

    const [error, setError] = useState('');
    const { title, amount, date, category, description } = inputState;

    const handleInput = (name) => (e) => {
        setInputState({
            ...inputState,
            [name]: e.target.value
        });
        setError()
    };

    const resetInputState = () => {
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: Ensure all fields are filled
        if (!title || !amount || !date || !category || !description) {
            setError('All required fields must be filled!');
            return;
        }

        // Validate Amount: Ensure it's a number and greater than zero
        if (isNaN(amount) || Number(amount) <= 0) {
            setError('Amount must be a valid number greater than zero!');
            return;
        }

        // Validate Amount: Ensure it’s a valid number, not a string
        if (typeof amount === 'string' && isNaN(amount.trim())) {
            setError('Amount must be a valid number!');
            return;
        }

        // Validate Salary Title: Ensure it doesn't contain numbers
        if (/\d/.test(title)) {
            setError('Salary Title cannot contain numbers!');
            return;
        }

        // If no errors, clear previous errors
        setError('');

        try {
            const response = await addExpense(inputState);

            // If the response is successful
            if (response && response.data && response.data.message === "Expense added") {
                // Manually update incomes state with the new income
                setInputState({
                    title: '',
                    amount: '',
                    date: '',
                    category: '',
                    description: ''
                });

                getExpenses(); 
                setError(''); 
            }
        } catch (err) {
            setError('Error adding income. Please try again.');
        }
    };

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name="title"
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input
                    type="text"
                    value={amount}
                    name="amount"
                    id="amount"
                    placeholder="Expense Amount"
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id="date"
                    placeholderText="Enter a date"
                    selected={date}
                    dateFormat="MM/dd/yyyy"
                    onChange={(date) => setInputState({ ...inputState, date })}
                />
            </div>
            <div className="selects input-control">
                <select
                    required
                    value={category}
                    name="category"
                    id="category"
                    onChange={handleInput('category')}
                >
                    <option value="" disabled>Select</option>
                    <option value="education">education</option>
                    <option value="groceries">groceries</option>
                    <option value="health">health</option>
                    <option value="subscriptions">subscriptions</option>
                    <option value="takeaways">takeaways</option>
                    <option value="clothing">clothing</option>
                    <option value="travelling">travelling</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} onChange={handleInput('description')} placeholder="Add A description" id="description" cols="30"></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name={'Add Expense'}
                    icon={plus}
                    bPad={' 8rem 1 6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent)'}
                    color={'#fff'}
                />
            </div>
        </ExpenseFormStyled>
    );
}

const ExpenseFormStyled = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .input-control {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        input, select, textarea {
            width: 100%;
            padding: 0.8rem;
            border: 1px solid rgba(0, 0, 0, 0.1); /* Thin border */
            background-color: #f9f9f9; /* Light background color */
            border-radius: 8px;
            font-size: 1rem;
            outline: none;
            color: #777; /* Light color for the text */
            transition: all 0.3s ease-in-out;

            &:focus {
                border-color: var(--color-accent);
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
            }
        }

        textarea {
            resize: none;
            height: 100px;
        }
    }

    .submit-btn {
        display: flex;
        justify-content: center;
        margin-top: 1rem;

        button {
            background: var(--color-accent);
            color: #fff;
            border: none;
            padding: 0.8rem 2rem;
            font-size: 1rem;
            border-radius: 30px;
            cursor: pointer;
            transition: background 0.3s ease-in-out;

            &:hover {
                background: var(--color-green);
            }
        }
    }
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 1rem;
    margin-bottom: 1rem;
`;

export default ExpenseForm;
