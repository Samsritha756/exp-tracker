import React, { useState } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { ChartContainer } from './DashboardStyles';
import { 
  Line, 
  Bar, 
  Doughnut 
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { filterTransactionsByPeriod, getTimeLabels } from '../../utils/filters';
import { getTransactionsByCategory } from '../../utils/analytics';
import { format, eachDayOfInterval } from 'date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function FinancialOverview({ timeFilter, startDate, endDate }) {
  const { incomes, expenses } = useGlobalContext();
  const [chartType, setChartType] = useState('line');
  
  // Filter transactions based on selected time period
  const filteredIncomes = filterTransactionsByPeriod(incomes, timeFilter, startDate, endDate);
  const filteredExpenses = filterTransactionsByPeriod(expenses, timeFilter, startDate, endDate);
  
  // Chart colors
  const chartColors = {
    income: {
      line: '#34D399',
      background: 'rgba(52, 211, 153, 0.2)'
    },
    expense: {
      line: '#F87171',
      background: 'rgba(248, 113, 113, 0.2)'
    },
    donut: [
      '#3B82F6', // blue
      '#F87171', // red
      '#34D399', // green
      '#FBBF24', // yellow
      '#8B5CF6', // purple
      '#EC4899', // pink
      '#F97316', // orange
      '#06B6D4'  // cyan
    ]
  };

  // Prepare data for charts
  const prepareLineChartData = () => {
    let labels = [];
    let incomeSeries = [];
    let expenseSeries = [];

    if (timeFilter === 'custom' && startDate && endDate) {
      // Generate array of dates between start and end date
      const dateRange = eachDayOfInterval({ start: startDate, end: endDate });
      labels = dateRange.map(date => format(date, 'MMM d'));
      
      // Initialize series arrays with zeros
      incomeSeries = new Array(labels.length).fill(0);
      expenseSeries = new Array(labels.length).fill(0);
      
      // Aggregate income data
      filteredIncomes.forEach(income => {
        const date = new Date(income.date);
        const index = dateRange.findIndex(d => 
          d.getDate() === date.getDate() && 
          d.getMonth() === date.getMonth() && 
          d.getFullYear() === date.getFullYear()
        );
        if (index !== -1) {
          incomeSeries[index] += income.amount;
        }
      });
      
      // Aggregate expense data
      filteredExpenses.forEach(expense => {
        const date = new Date(expense.date);
        const index = dateRange.findIndex(d => 
          d.getDate() === date.getDate() && 
          d.getMonth() === date.getMonth() && 
          d.getFullYear() === date.getFullYear()
        );
        if (index !== -1) {
          expenseSeries[index] += expense.amount;
        }
      });
    } else {
      // Get time labels based on selected period
      labels = getTimeLabels(timeFilter);
      incomeSeries = Array(labels.length).fill(0);
      expenseSeries = Array(labels.length).fill(0);
      
      // Aggregate data
      filteredIncomes.forEach(income => {
        const date = new Date(income.date);
        let index;
        
        if (timeFilter === 'weekly') {
          index = date.getDay();
        } else if (timeFilter === 'monthly') {
          index = Math.min(4, Math.floor(date.getDate() / 7));
        } else {
          index = date.getMonth();
        }
        
        incomeSeries[index] += income.amount;
      });
      
      filteredExpenses.forEach(expense => {
        const date = new Date(expense.date);
        let index;
        
        if (timeFilter === 'weekly') {
          index = date.getDay();
        } else if (timeFilter === 'monthly') {
          index = Math.min(4, Math.floor(date.getDate() / 7));
        } else {
          index = date.getMonth();
        }
        
        expenseSeries[index] += expense.amount;
      });
    }
    
    return {
      labels,
      datasets: [
        {
          label: 'Income',
          data: incomeSeries,
          borderColor: chartColors.income.line,
          backgroundColor: chartType === 'bar' ? chartColors.income.background : 'transparent',
          borderWidth: 2,
          tension: 0.3,
        },
        {
          label: 'Expenses',
          data: expenseSeries,
          borderColor: chartColors.expense.line,
          backgroundColor: chartType === 'bar' ? chartColors.expense.background : 'transparent',
          borderWidth: 2,
          tension: 0.3,
        },
      ],
    };
  };
  
  const prepareDoughnutData = () => {
    const expensesByCategory = getTransactionsByCategory(filteredExpenses);
    const sortedCategories = Object.entries(expensesByCategory)
      .sort((a, b) => b[1] - a[1]); // Sort by amount in descending order
    
    return {
      labels: sortedCategories.map(([category]) => category),
      datasets: [
        {
          data: sortedCategories.map(([, amount]) => amount),
          backgroundColor: chartColors.donut,
          borderWidth: 1,
          borderColor: '#fff',
        },
      ],
    };
  };
  
  // Chart options
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
  };
  
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return `$${context.raw.toFixed(2)} (${percentage}%)`;
          },
        },
      },
    },
    cutout: '60%',
  };

  return (
    <ChartContainer>
      <div className="chart-header">
        <h3>Financial Overview - {timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}</h3>
        <div className="chart-controls">
          <select 
            value={chartType} 
            onChange={(e) => setChartType(e.target.value)}
            style={{
              padding: '0.5rem',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              background: '#F9FAFB',
            }}
          >
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="doughnut">Category Breakdown</option>
          </select>
        </div>
      </div>
      
      <div className="chart-content">
        {chartType === 'line' && (
          <Line data={prepareLineChartData()} options={lineOptions} />
        )}
        {chartType === 'bar' && (
          <Bar data={prepareLineChartData()} options={lineOptions} />
        )}
        {chartType === 'doughnut' && (
          <Doughnut data={prepareDoughnutData()} options={doughnutOptions} />
        )}
      </div>
    </ChartContainer>
  );
}

export default FinancialOverview;