/**
 * Filter transactions based on the selected time period
 * @param {Array} transactions - Array of transaction objects
 * @param {String} timeFilter - 'weekly', 'monthly', 'yearly', or 'custom'
 * @param {Date} startDate - Start date for custom range
 * @param {Date} endDate - End date for custom range
 * @returns {Array} - Filtered transactions
 */
export const filterTransactionsByPeriod = (transactions, timeFilter, startDate = null, endDate = null) => {
    if (!transactions || transactions.length === 0) {
      return [];
    }
    
    const now = new Date();
    const filterDate = new Date();
    
    // Handle custom date range
    if (timeFilter === 'custom' && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      
      return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= start && transactionDate <= end;
      });
    }
    
    // Set start date based on selected time period
    switch (timeFilter) {
      case 'weekly':
        // Start from the beginning of the current week (Sunday)
        filterDate.setDate(now.getDate() - now.getDay());
        break;
      
      case 'monthly':
        // Start from the beginning of the current month
        filterDate.setDate(1);
        break;
      
      case 'yearly':
        // Start from the beginning of the current year
        filterDate.setMonth(0, 1);
        break;
      
      default:
        // Default to all transactions
        return transactions;
    }
    
    filterDate.setHours(0, 0, 0, 0);
    
    // Filter transactions within the date range
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= filterDate && transactionDate <= now;
    });
  };
  
  /**
   * Get time labels based on the selected period
   * @param {String} timeFilter - 'weekly', 'monthly', 'yearly', or 'custom'
   * @returns {Array} - Array of time labels
   */
  export const getTimeLabels = (timeFilter) => {
    switch (timeFilter) {
      case 'weekly':
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      case 'monthly':
        return ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
      
      case 'yearly':
        return [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
      
      default:
        return [];
    }
  };
  
  /**
   * Generate dummy transactions for the selected time period
   * @param {String} timeFilter - 'weekly', 'monthly', or 'yearly'
   * @returns {Array} - Array of dummy transactions
   */
  export const generateDummyTransactions = (timeFilter) => {
    const now = new Date();
    const transactions = [];
    const categories = ['food', 'shopping', 'transportation', 'health', 'housing', 'entertainment', 'salary', 'business'];
    
    let daysToGenerate;
    
    switch (timeFilter) {
      case 'weekly':
        daysToGenerate = 7;
        break;
      case 'monthly':
        daysToGenerate = 30;
        break;
      case 'yearly':
        daysToGenerate = 365;
        break;
      default:
        daysToGenerate = 30;
    }
    
    for (let i = 0; i < daysToGenerate; i++) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      
      // Generate random income (less frequent)
      if (i % 15 === 0) {
        transactions.push({
          _id: `income-${i}`,
          title: 'Salary',
          amount: Math.floor(Math.random() * 5000) + 2000,
          type: 'income',
          date: date.toISOString(),
          category: 'salary',
          description: 'Monthly salary'
        });
      }
      
      // Generate random expenses (more frequent)
      if (i % 2 === 0) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        
        transactions.push({
          _id: `expense-${i}`,
          title: `${category.charAt(0).toUpperCase() + category.slice(1)} expense`,
          amount: Math.floor(Math.random() * 200) + 10,
          type: 'expense',
          date: date.toISOString(),
          category: category,
          description: `Expense for ${category}`
        });
      }
    }
    
    return transactions;
  };