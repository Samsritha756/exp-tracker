import React, { useEffect } from 'react';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext'; // Import your context

// Register only necessary components
ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const { incomes, expenses, getIncomes, getExpenses} = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
}, []);

  const data = {
    labels: incomes.map((inc) => {
      return new Date(inc.date).toLocaleDateString(); 
    }),

    datasets: [
      {
        label: 'Income',
        data: incomes.map((income) => income.amount), // Fixed `.map()`
        backgroundColor: 'green',
        borderColor: 'green',
        borderWidth: 2,
        tension: 0.2
      },
      {
        label: 'Expenses',
        data: expenses.map((expense) => expense.amount), // Fixed `.map()`
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 2,
        tension: 0.2
      }
    ]
  };

  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #FCF6F9;
  border: 2px solid #FFFFFF;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;

export default Chart;
