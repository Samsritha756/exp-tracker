/**
 * Group transactions by category and calculate total amount for each category
 * @param {Array} transactions - Array of transaction objects
 * @returns {Object} - Object with categories as keys and totals as values
 */
export const getTransactionsByCategory = (transactions) => {
    if (!transactions || transactions.length === 0) {
      return {};
    }
    
    const categories = {};
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    
    // First pass: calculate totals per category
    transactions.forEach(transaction => {
      const category = transaction.category || 'Uncategorized';
      categories[category] = (categories[category] || 0) + transaction.amount;
    });
    
    // Filter out categories with 0 or very small amounts (less than 1% of total)
    const significantCategories = {};
    Object.entries(categories).forEach(([category, amount]) => {
      if (amount > 0 && (amount / total) >= 0.01) {
        significantCategories[category] = amount;
      }
    });
    
    return significantCategories;
  };
  
  /**
   * Calculate the average daily spending for a given period
   * @param {Array} transactions - Array of transaction objects
   * @param {String} timeFilter - 'weekly', 'monthly', or 'yearly'
   * @returns {Number} - Average daily spending
   */
  export const getAverageDailySpending = (transactions, timeFilter) => {
    if (!transactions || transactions.length === 0) {
      return 0;
    }
    
    const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    
    let divisor;
    switch (timeFilter) {
      case 'weekly':
        divisor = 7;
        break;
      case 'monthly':
        divisor = 30;
        break;
      case 'yearly':
        divisor = 365;
        break;
      default:
        divisor = 30;
    }
    
    return totalAmount / divisor;
  };
  
  /**
   * Calculate spending trend by comparing current period with previous period
   * @param {Array} currentTransactions - Array of transaction objects for current period
   * @param {Array} previousTransactions - Array of transaction objects for previous period
   * @returns {Object} - Object with trend information
   */
  export const calculateSpendingTrend = (currentTransactions, previousTransactions) => {
    if (!currentTransactions || !previousTransactions) {
      return {
        changePercentage: 0,
        isIncrease: false,
      };
    }
    
    const currentTotal = currentTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    const previousTotal = previousTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    
    if (previousTotal === 0) {
      return {
        changePercentage: 100,
        isIncrease: true,
      };
    }
    
    const changePercentage = ((currentTotal - previousTotal) / previousTotal) * 100;
    
    return {
      changePercentage: Math.abs(changePercentage).toFixed(1),
      isIncrease: changePercentage > 0,
    };
  };