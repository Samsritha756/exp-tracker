import styled from 'styled-components';

export const DashboardStyled = styled.div`
  min-height: 100vh;
  overflow-y: auto;
  
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }
    
    .title-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      h1 {
        font-size: 1.8rem;
        font-weight: 600;
      }
    }

    .filters-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: flex-end;

      @media (max-width: 768px) {
        align-items: stretch;
        width: 100%;
      }
    }
  }
  
  .dashboard-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .main-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    
    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }
`;

export const TimeFilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  background: #f5f7fa;
  padding: 0.5rem;
  border-radius: 10px;
  flex-wrap: wrap;
  
  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    white-space: nowrap;
    
    &:hover {
      background: rgba(255, 255, 255, 0.8);
    }
    
    &.active {
      background: white;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
    }

    &.clear-date {
      color: #F87171;
      
      &:hover {
        background: rgba(248, 113, 113, 0.1);
      }
    }
  }
`;

export const DateRangeContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
  z-index: 100;

  .date-picker {
    border: none;
    background: transparent;
  }

  .react-datepicker {
    border: none;
    box-shadow: none;
  }

  .react-datepicker__header {
    background-color: white;
    border-bottom: none;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-range {
    background-color: #60A5FA;
    color: white;
  }

  .react-datepicker__day--in-selecting-range {
    background-color: rgba(96, 165, 250, 0.5);
  }
`;

export const SummaryCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.div`
  background: #FFFFFF;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    h3 {
      font-size: 1rem;
      font-weight: 500;
      color: #5B6B79;
    }
    
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      
      &.income {
        background: rgba(52, 211, 153, 0.1);
        color: #34D399;
      }
      
      &.expense {
        background: rgba(248, 113, 113, 0.1);
        color: #F87171;
      }
      
      &.balance {
        background: rgba(96, 165, 250, 0.1);
        color: #60A5FA;
      }
      
      &.savings {
        background: rgba(251, 191, 36, 0.1);
        color: #FBBF24;
      }
    }
  }
  
  .amount {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    
    &.income {
      color: #34D399;
    }
    
    &.expense {
      color: #F87171;
    }
    
    &.balance {
      color: #60A5FA;
    }
    
    &.savings {
      color: #FBBF24;
    }
  }
`;

export const ChartContainer = styled.div`
  background: #FFFFFF;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    
    h3 {
      font-size: 1.125rem;
      font-weight: 600;
    }
  }
  
  .chart-content {
    height: 300px;
    position: relative;
  }
`;

export const TransactionHistoryContainer = styled.div`
  background: #FFFFFF;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
  height: 100%;
  
  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    
    h3 {
      font-size: 1.125rem;
      font-weight: 600;
    }
    
    .view-all {
      color: #60A5FA;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
  .transaction-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .transaction-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    background: #F9FAFB;
    
    &:hover {
      background: #F3F4F6;
    }
    
    .transaction-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .category-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        
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
        h4 {
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        
        .category {
          font-size: 0.75rem;
          color: #6B7280;
        }
      }
    }
    
    .amount-date {
      text-align: right;
      
      .amount {
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
        font-size: 0.75rem;
        color: #6B7280;
      }
    }
  }
`;