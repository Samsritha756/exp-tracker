const router = require('express').Router();
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income'); 
const { addExpense, getExpense, deleteExpense, getExpenseById,updateExpenseAmount } = require('../controllers/expense'); 




router.post('/add-income', addIncome)
       .get('/get-incomes' , getIncomes)
       .delete('/delete-income/:id', deleteIncome)
       .post('/add-expense', addExpense)
       .get('/get-expenses' , getExpense)
       .delete('/delete-expense/:id', deleteExpense)
       .get('/get-expenses/:id', getExpenseById)
       .put('/update-expenses/:id',updateExpenseAmount)
module.exports = router;
