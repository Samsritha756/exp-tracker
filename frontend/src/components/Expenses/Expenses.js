import React, { useEffect } from 'react';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import ExpenseForm from './ExpenseForm';
import { TrendingDown } from 'lucide-react';
import styled from 'styled-components';
import TransactionList from '../Transactions/TransactionList';

function Expenses() {
  const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  return (
    <ExpenseStyled>
      <InnerLayout>
        <div className="header">
          <div className="title">
            <TrendingDown size={24} className="icon" />
            <h1>Expense Manager</h1>
          </div>
          <div className="total">
            <span>Total Expenses</span>
            <h2>${totalExpenses().toFixed(2)}</h2>
          </div>
        </div>

        <div className="content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <TransactionList 
            transactions={expenses}
            deleteItem={deleteExpense}
            type="expense"
          />
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  min-height: 100vh;
  

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;

    .title {
      display: flex;
      align-items: center;
      gap: 1rem;

      .icon {
        color: #F87171;
      }

      h1 {
        font-size: 1.8rem;
        font-weight: 600;
        color: #1F2937;
      }
    }

    .total {
      background: white;
      padding: 1rem 2rem;
      border-radius: 12px;
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
      text-align: center;

      span {
        color: #6B7280;
        font-size: 0.9rem;
      }

      h2 {
        color: #F87171;
        font-size: 2rem;
        font-weight: 700;
        margin-top: 0.25rem;
      }
    }
  }

  .content {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 2rem;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }

    .form-container {
      position: sticky;
      top: 2rem;
      height: fit-content;
    }
  }
`;

export default Expenses;