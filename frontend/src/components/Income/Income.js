import React, { useEffect } from 'react';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import Form from '../../components/Form/Form';
import { TrendingUp } from 'lucide-react';
import styled from 'styled-components';
import TransactionList from '../Transactions/TransactionList';

function Income() {
  const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, [getIncomes]);

  return (
    <IncomeStyled>
      <InnerLayout>
        <div className="header">
          <div className="title">
            <TrendingUp size={24} className="icon" />
            <h1>Income Manager</h1>
          </div>
          <div className="total">
            <span>Total Income</span>
            <h2>${totalIncome().toFixed(2)}</h2>
          </div>
        </div>

        <div className="content">
          <div className="form-container">
            <Form type="income" />
          </div>
          <TransactionList 
            transactions={incomes}
            deleteItem={deleteIncome}
            type="income"
          />
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
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
        color: #34D399;
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
        color: #34D399;
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

export default Income;