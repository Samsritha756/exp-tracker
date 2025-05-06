/**
 * Format date to a readable string
 * @param {String|Date} date - Date string or Date object
 * @returns {String} - Formatted date string
 */
export const formatDate = (date) => {
    if (!date) return '';
    
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  /**
   * Format currency amount
   * @param {Number} amount - Amount to format
   * @returns {String} - Formatted currency string
   */
  export const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return '$0.00';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  /**
   * Truncate text if it exceeds the specified length
   * @param {String} text - Text to truncate
   * @param {Number} maxLength - Maximum length before truncation
   * @returns {String} - Truncated text
   */
  export const truncateText = (text, maxLength = 20) => {
    if (!text) return '';
    
    if (text.length <= maxLength) return text;
    
    return `${text.substring(0, maxLength)}...`;
  };