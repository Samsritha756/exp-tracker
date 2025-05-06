import React from 'react';
import styled from 'styled-components';
import { formatDate } from '../../utils/formatters';
import { Trash2 } from 'lucide-react';
import { getCategoryIcon } from '../../utils/Icons';

function TransactionList({ transactions, deleteItem, type }) {
  return (
    <TransactionListStyled>
      <div className="list-header">
        <h2>Transaction History</h2>
      </div>
      <div className="transactions">
        {transactions.length === 0 ? (
          <div className="no-data">
            <p>No transactions found</p>
          </div>
        ) : (
          transactions.map((transaction) => (
            <div className="transaction-item" key={transaction._id}>
              <div className="left">
                <div className={`icon ${type}`}>
                  {getCategoryIcon(transaction.category)}
                </div>
                <div className="details">
                  <h3>{transaction.title}</h3>
                  <span className="category">{transaction.category}</span>
                  <p className="description">{transaction.description}</p>
                </div>
              </div>
              <div className="right">
                <div className="amount-date">
                  <span className={`amount ${type}`}>
                    {type === 'income' ? '+' : '-'} ${transaction.amount}
                  </span>
                  <span className="date">{formatDate(transaction.date)}</span>
                </div>
                <button 
                  className="delete-btn"
                  onClick={() => deleteItem(transaction._id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </TransactionListStyled>
  );
}

const TransactionListStyled = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  .list-header {
    padding: 1.5rem;
    border-bottom: 1px solid #f3f4f6;

    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1F2937;
    }
  }

  .transactions {
    .no-data {
      padding: 2rem;
      text-align: center;
      color: #6B7280;
    }

    .transaction-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid #f3f4f6;
      transition: background-color 0.2s;

      &:hover {
        background-color: #f9fafb;
      }

      .left {
        display: flex;
        align-items: center;
        gap: 1rem;

        .icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;

          &.income {
            background: rgba(52, 211, 153, 0.1);
            color: #34D399;
          }

          &.expense {
            background: rgba(248, 113, 113, 0.1);
            color: #F87171;
          }
        }

        .details {
          h3 {
            font-size: 1rem;
            font-weight: 500;
            color: #1F2937;
            margin-bottom: 0.25rem;
          }

          .category {
            font-size: 0.875rem;
            color: #6B7280;
            background: #f3f4f6;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
          }

          .description {
            font-size: 0.875rem;
            color: #6B7280;
            margin-top: 0.5rem;
          }
        }
      }

      .right {
        display: flex;
        align-items: center;
        gap: 1.5rem;

        .amount-date {
          text-align: right;

          .amount {
            display: block;
            font-weight: 600;
            margin-bottom: 0.25rem;

            &.income {
              color: #34D399;
            }

            &.expense {
              color: #F87171;
            }
          }

          .date {
            font-size: 0.875rem;
            color: #6B7280;
          }
        }

        .delete-btn {
          background: none;
          border: none;
          color: #9CA3AF;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s;

          &:hover {
            background: #FEE2E2;
            color: #F87171;
          }
        }
      }
    }
  }
`;

export default TransactionList;