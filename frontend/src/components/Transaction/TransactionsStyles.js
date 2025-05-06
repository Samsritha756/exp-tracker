import styled from 'styled-components';

export const TransactionsStyled = styled.div`
  min-height: 100vh;
  
  .header {
    padding: 1rem 0;
    margin-bottom: 1rem;
    
    h1 {
      font-size: 1.8rem;
      font-weight: 600;
    }
  }
`;

export const TransactionFilters = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 15px 15px 0 0;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 0;
  border-bottom: 1px solid #f3f4f6;
  
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  
  .search-container {
    flex: 1;
    min-width: 250px;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: #f5f7fa;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    
    svg {
      flex-shrink: 0;
    }
    
    input {
      flex: 1;
      border: none;
      background: none;
      font-size: 0.95rem;
      
      &:focus {
        outline: none;
      }
    }
  }
  
  .filters {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    
    .filter-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: #f5f7fa;
      padding: 0.75rem 1rem;
      border-radius: 10px;
      
      svg {
        flex-shrink: 0;
      }
      
      select {
        border: none;
        background: none;
        font-size: 0.95rem;
        cursor: pointer;
        padding-right: 1rem;
        
        &:focus {
          outline: none;
        }
      }
    }
    
    .date-picker-container {
      position: relative;
      display: flex;
      gap: 0.5rem;

      .date-picker {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: #f5f7fa;
        border: none;
        padding: 0.75rem 1rem;
        border-radius: 10px;
        font-size: 0.95rem;
        cursor: pointer;
        min-width: 200px;
        white-space: nowrap;
        
        svg {
          flex-shrink: 0;
        }
        
        &:focus {
          outline: none;
        }
      }

      .clear-date {
        background: #f5f7fa;
        border: none;
        padding: 0.75rem;
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;

        &:hover {
          background: #e5e7eb;
        }
      }

      .react-datepicker-wrapper {
        position: static;
      }

      .react-datepicker-popper {
        z-index: 99;
      }

      .react-datepicker {
        font-family: inherit;
        border: none;
        border-radius: 15px;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        background: white;
      }

      .react-datepicker__header {
        background: white;
        border: none;
        padding-top: 0.5rem;
      }

      .react-datepicker__current-month {
        font-size: 1rem;
        font-weight: 600;
        color: #374151;
        margin-bottom: 0.5rem;
      }

      .react-datepicker__day-names {
        background: white;
        padding: 0.5rem 0;
        border-bottom: 1px solid #f3f4f6;
      }

      .react-datepicker__day-name {
        color: #6B7280;
        font-weight: 500;
      }

      .react-datepicker__month {
        margin: 0;
      }

      .react-datepicker__day {
        color: #374151;
        border-radius: 8px;
        transition: all 0.2s ease;
        margin: 0.2rem;
        width: 2rem;
        line-height: 2rem;

        &:hover {
          background-color: #f3f4f6;
        }

        &--selected,
        &--in-range {
          background-color: #60A5FA !important;
          color: white !important;
        }

        &--in-selecting-range {
          background-color: rgba(96, 165, 250, 0.2);
          color: #374151;
        }

        &--keyboard-selected {
          background-color: #60A5FA;
          color: white;
        }

        &--today {
          font-weight: bold;
          color: #60A5FA;
        }
      }
    }
  }
`;

export const TransactionTable = styled.div`
background: rgba(252, 246, 249, 0.78);
  border-radius: 0 0 15px 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
  overflow: visible;
  
  .table-body {
    .table-row {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr 1fr;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #f3f4f6;
      transition: background-color 0.3s ease;
      background: white;
      
      &:hover {
        background-color: #f9fafb;
      }
      
      .cell {
        display: flex;
        align-items: center;
        
        &.amount {
          justify-content: flex-end;
          font-weight: 600;
          
          &.income {
            color: #34D399;
          }
          
          &.expense {
            color: #F87171;
          }
        }
        
        .category {
          background: #f3f4f6;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.875rem;
          color: #6B7280;
        }
      }
    }
  }
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  padding: 1rem 1.5rem;
  background: white;
  border-bottom: 2px solid #f3f4f6;
  
  .header-cell {
    font-weight: 600;
    color: #374151;
    cursor: pointer;
    user-select: none;
    
    &:last-child {
      text-align: right;
    }
    
    &:hover {
      color: #111827;
    }
  }
`;

export const NoTransactions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
  
  p {
    color: #6B7280;
    font-size: 1.1rem;
  }
`;