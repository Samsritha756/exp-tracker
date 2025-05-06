import React, { useState } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import { 
  TransactionsStyled,
  TransactionFilters,
  TransactionTable,
  TableHeader,
  NoTransactions
} from './TransactionsStyles';
import { Search, Filter, Calendar, X } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Transactions() {
  const { transactionHistory } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const allTransactions = transactionHistory();

  // Filter transactions based on search, type, and date range
  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    const matchesDateRange = (!startDate || !endDate) ? true :
                           (new Date(transaction.date) >= startDate && 
                            new Date(transaction.date) <= endDate);
    
    return matchesSearch && matchesType && matchesDateRange;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortConfig.key === 'date') {
      const comparison = new Date(b.date) - new Date(a.date);
      return sortConfig.direction === 'asc' ? -comparison : comparison;
    }
    if (sortConfig.key === 'amount') {
      const comparison = a.amount - b.amount;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const handleDateRangeSelect = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const clearDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const formatDateRange = () => {
    if (!startDate && !endDate) return 'Select date range';
    if (startDate && !endDate) return formatDate(startDate);
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  return (
    <TransactionsStyled>
      <InnerLayout>
        <div className="header">
          <h1>All Transactions</h1>
        </div>

        <TransactionFilters>
          <div className="search-container">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filters">
            <div className="filter-group">
              <Filter size={20} />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="date-picker-container">
              <DatePicker
                selected={startDate}
                onChange={handleDateRangeSelect}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                placeholderText="Select date range"
                className="date-picker"
                customInput={
                  <button className="date-picker">
                    <Calendar size={20} />
                    {formatDateRange()}
                  </button>
                }
              />
              {(startDate || endDate) && (
                <button className="clear-date" onClick={clearDateFilter}>
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        </TransactionFilters>

        {sortedTransactions.length > 0 ? (
          <TransactionTable>
            <TableHeader>
              <div className="header-cell" onClick={() => handleSort('date')}>
                Date
                {sortConfig.key === 'date' && (
                  <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </div>
              <div className="header-cell">Title</div>
              <div className="header-cell">Category</div>
              <div className="header-cell" onClick={() => handleSort('amount')}>
                Amount
                {sortConfig.key === 'amount' && (
                  <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </div>
            </TableHeader>
            <div className="table-body">
              {sortedTransactions.map((transaction) => (
                <div key={transaction._id} className="table-row">
                  <div className="cell">{formatDate(transaction.date)}</div>
                  <div className="cell">{transaction.title}</div>
                  <div className="cell">
                    <span className="category">{transaction.category}</span>
                  </div>
                  <div className={`cell amount ${transaction.type}`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </TransactionTable>
        ) : (
          <NoTransactions>
            <p>No transactions found</p>
          </NoTransactions>
        )}
      </InnerLayout>
    </TransactionsStyled>
  );
}

export default Transactions;