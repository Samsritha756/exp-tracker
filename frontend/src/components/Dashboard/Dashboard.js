import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import { 
  DashboardStyled, 
  TimeFilterContainer,
  DateRangeContainer 
} from './DashboardStyles';
import FinancialSummary from './FinancialSummary';
import FinancialOverview from './FinancialOverview';
import TransactionHistory from './TransactionHistory';
import { PanelLeft, BarChart4, PieChart, Calendar, CalendarRange, X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Dashboard({setActive}) {
  const { getIncomes, getExpenses } = useGlobalContext();
  const [activeTimeFilter, setActiveTimeFilter] = useState('monthly');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isCustomRange, setIsCustomRange] = useState(false);

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, [getIncomes, getExpenses]);

  const handleDateRangeSelect = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      setIsCustomRange(true);
      setActiveTimeFilter('custom');
    }
  };

  const handleTimeFilterClick = (filter) => {
    setActiveTimeFilter(filter);
    setIsCustomRange(false);
    setStartDate(null);
    setEndDate(null);
  };

  const clearDateRange = () => {
    setStartDate(null);
    setEndDate(null);
    setIsCustomRange(false);
    setActiveTimeFilter('monthly');
  };

  return (
    <DashboardStyled>
      <InnerLayout>
        <div className="dashboard-header">
          <div className="title-container">
            <PanelLeft size={24} />
            <h1>Financial Dashboard</h1>
          </div>
          
          <div className="filters-container">
            <TimeFilterContainer>
              <button 
                className={activeTimeFilter === 'weekly' ? 'active' : ''} 
                onClick={() => handleTimeFilterClick('weekly')}
              >
                <Calendar size={16} />
                Weekly
              </button>
              <button 
                className={activeTimeFilter === 'monthly' ? 'active' : ''} 
                onClick={() => handleTimeFilterClick('monthly')}
              >
                <BarChart4 size={16} />
                Monthly
              </button>
              <button 
                className={activeTimeFilter === 'yearly' ? 'active' : ''} 
                onClick={() => handleTimeFilterClick('yearly')}
              >
                <PieChart size={16} />
                Yearly
              </button>
              <button 
                className={isCustomRange ? 'active' : ''} 
                onClick={() => setIsCustomRange(!isCustomRange)}
              >
                <CalendarRange size={16} />
                Custom
              </button>
              {isCustomRange && (
                <button 
                  className="clear-date" 
                  onClick={clearDateRange}
                >
                  <X size={16} />
                  Clear
                </button>
              )}
            </TimeFilterContainer>

            {isCustomRange && (
              <DateRangeContainer>
                <DatePicker
                  selected={startDate}
                  onChange={handleDateRangeSelect}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  className="date-picker"
                />
              </DateRangeContainer>
            )}
          </div>
        </div>

        <div className="dashboard-content">
          <FinancialSummary 
            timeFilter={activeTimeFilter} 
            startDate={startDate} 
            endDate={endDate}
          />
          <div className="main-content">
            <FinancialOverview 
              timeFilter={activeTimeFilter}
              startDate={startDate}
              endDate={endDate}
            />
            <TransactionHistory 
              timeFilter={activeTimeFilter}
              startDate={startDate}
              endDate={endDate}
              setActive={setActive}
            />
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

export default Dashboard;