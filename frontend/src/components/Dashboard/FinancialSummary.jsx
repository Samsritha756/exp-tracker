import React from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { SummaryCardContainer, SummaryCard } from './DashboardStyles';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  PiggyBank
} from 'lucide-react';
import { filterTransactionsByPeriod } from '../../utils/filters';

function FinancialSummary({ timeFilter, startDate, endDate }) {
  const { incomes, expenses } = useGlobalContext();
  
  // Filter transactions based on the selected time period
  const filteredIncomes = filterTransactionsByPeriod(incomes, timeFilter, startDate, endDate);
  const filteredExpenses = filterTransactionsByPeriod(expenses, timeFilter, startDate, endDate);
  
  // Calculate totals for the selected period
  const periodIncome = filteredIncomes.reduce((total, income) => total + income.amount, 0);
  const periodExpenses = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
  const periodBalance = periodIncome - periodExpenses;
  
  // Calculate savings rate (if income > 0)
  const savingsRate = periodIncome > 0 ? ((periodIncome - periodExpenses) / periodIncome * 100).toFixed(1) : 0;

  return (
    <SummaryCardContainer>
      <SummaryCard>
        <div className="card-header">
          <h3>Total Income</h3>
          <div className="icon income">
            <TrendingUp size={20} />
          </div>
        </div>
        <div className={`amount income`}>
          ${periodIncome.toFixed(2)}
        </div>
      </SummaryCard>
      
      <SummaryCard>
        <div className="card-header">
          <h3>Total Expenses</h3>
          <div className="icon expense">
            <TrendingDown size={20} />
          </div>
        </div>
        <div className={`amount expense`}>
          ${periodExpenses.toFixed(2)}
        </div>
      </SummaryCard>
      
      <SummaryCard>
        <div className="card-header">
          <h3>Net Balance</h3>
          <div className="icon balance">
            <Wallet size={20} />
          </div>
        </div>
        <div className={`amount balance`}>
          ${periodBalance.toFixed(2)}
        </div>
      </SummaryCard>
      
      <SummaryCard>
        <div className="card-header">
          <h3>Savings Rate</h3>
          <div className="icon savings">
            <PiggyBank size={20} />
          </div>
        </div>
        <div className={`amount savings`}>
          {savingsRate}%
        </div>
      </SummaryCard>
    </SummaryCardContainer>
  );
}

export default FinancialSummary;