import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { Plus } from 'lucide-react';

function Form({ type }) {
  const { addIncome } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    date: '',
  });

  const { title, amount, category, description, date } = inputState;

  const handleInput = (name) => (e) => {
    if (name === 'date') {
      const selectedDate = new Date(e.target.value);
      selectedDate.toISOString();
      setInputState({ ...inputState, [name]: selectedDate.toISOString() });
    } else {
      setInputState({ ...inputState, [name]: e.target.value });
    }
  };

  const toSafeISOStringLocal = (isoString) => {
    if (!isoString) return null;
  
    
    if (isoString.includes('T')) {
      const dateOnly = isoString.split('T')[0]; 
      const [year, month, day] = dateOnly.split('-').map(Number);
      const localDate = new Date(year, month - 1, day, 12, 0, 0); 
      return localDate.toISOString();
    }
  
    const [year, month, day] = isoString.split('-').map(Number);
    const localDate = new Date(year, month - 1, day, 12, 0, 0); 
    return localDate.toISOString();
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const adjustedInput = {
        ...inputState,
        date: toSafeISOStringLocal(inputState.date),
      };
  
    addIncome(adjustedInput);
  
    setInputState({
      title: '',
      amount: '',
      category: '',
      description: '',
      date: '',
    });
  };
  

  return (
    <FormStyled onSubmit={handleSubmit}>
      <div className="input-control">
        <input 
          type="text"
          value={title}
          name="title"
          placeholder="Income Title"
          onChange={handleInput('title')}
          required
        />
      </div>
      <div className="input-control">
        <input 
          type="number"
          value={amount}
          name="amount"
          placeholder="Amount"
          onChange={handleInput('amount')}
          required
        />
      </div>
      <div className="input-control">
        <select 
          value={category}
          name="category"
          onChange={handleInput('category')}
          required
        >
          <option value="" disabled>Select Category</option>
          <option value="salary">Salary</option>
          <option value="freelance">Freelance</option>
          <option value="investments">Investments</option>
          <option value="business">Business</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          value={description}
          name="description"
          placeholder="Description"
          onChange={handleInput('description')}
          rows="4"
        />
      </div>
      <div className="input-control">
        <input 
          type="date"
          value={date ? new Date(date).toISOString().split('T')[0] : ''}
          name="date"
          onChange={handleInput('date')}
          required
        />
      </div>
      <button type="submit" className="submit-btn">
        <Plus size={20} />
        Add Income
      </button>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);

  .input-control {
    margin-bottom: 1.5rem;

    input, select, textarea {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      font-size: 0.95rem;
      transition: border-color 0.2s;

      &:focus {
        outline: none;
        border-color: #34D399;
      }
    }

    textarea {
      resize: vertical;
    }
  }

  .submit-btn {
    width: 100%;
    padding: 0.75rem;
    background: #34D399;
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #10B981;
    }
  }
`;

export default Form;