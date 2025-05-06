import React from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { TransactionHistoryContainer } from './DashboardStyles';
import { 
  ShoppingCart, 
  Coffee, 
  Home, 
  Car, 
  Briefcase, 
  Heart, 
  Utensils 
} from 'lucide-react';
import { filterTransactionsByPeriod } from '../../utils/filters';
import { formatDate } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';

// Map category to icon
const getCategoryIcon = (category) => {
  switch (category?.toLowerCase()) {
    case 'shopping':
      return <ShoppingCart size={16} />;
    case 'food':
      return <Utensils size={16} />;
    case 'housing':
    case 'rent':
      return <Home size={16} />;
    case 'transportation':
      return <Car size={16} />;
    case 'salary':
    case 'business':
      return <Briefcase size={16} />;
    case 'health':
      return <Heart size={16} />;
    default:
      return <Coffee size={16} />;
  }
};

function TransactionHistory({ timeFilter, startDate, endDate, setActive }) {
  const { incomes, expenses } = useGlobalContext();
  const navigate = useNavigate();
  
  // Filter transactions based on the selected time period
  const filteredIncomes = filterTransactionsByPeriod(incomes, timeFilter, startDate, endDate);
  const filteredExpenses = filterTransactionsByPeriod(expenses, timeFilter, startDate, endDate);
  
  // Combine and sort transactions
  const allTransactions = [...filteredIncomes, ...filteredExpenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5); // Show only the 5 most recent
  
  return (
    <TransactionHistoryContainer>
      <div className="history-header">
        <h3>Recent Transactions</h3>
        <span className="view-all" onClick={() => setActive(2)}>
          View All
        </span>
      </div>
      
      <div className="transaction-list">
        {allTransactions.length > 0 ? (
          allTransactions.map((transaction) => (
            <div className="transaction-item" key={transaction._id}>
              <div className="transaction-info">
                <div className={`category-icon ${transaction.type}`}>
                  {getCategoryIcon(transaction.category)}
                </div>
                <div className="details">
                  <h4>{transaction.title}</h4>
                  <div className="category">{transaction.category || 'Uncategorized'}</div>
                </div>
              </div>
              <div className="amount-date">
                <div className={`amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'} ${transaction.amount}
                </div>
                <div className="date">{formatDate(transaction.date)}</div>
              </div>
            </div>
          ))
        ) : (
          <p>No transactions for this period</p>
        )}
      </div>
    </TransactionHistoryContainer>
  );
}

export default TransactionHistory;