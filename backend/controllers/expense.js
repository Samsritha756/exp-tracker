const ExpenseSchema = require("../models/ExpenseModel")


exports. addExpense = async (req, res) => {
    const {title, amount,category, description, date} = req.body
   
    const income = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try{
        //validations
        if(!title || !category || !description || !date) {
            return res.status(400).json({message: 'All fields are required'})
        }
        if(amount <= 0 || !amount === 'number') {
            return res.status(400).json({message: 'amount must be positive'})
        }
        await income.save()
        res.status(200).json({message: 'expense added'})
    } catch (error) {
        res.status(500).json({message: 'server error'})
    }
    console.log(income)
};


exports. getExpense = async (req, res) => {
    try{
        const expenses = await ExpenseSchema.find().sort({createdAt : -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message:'server error'})
    }
}

exports. deleteExpense = async (req, res) => {
    const {id} = req.params;
    console.log(req.params);
    ExpenseSchema.findByIdAndDelete(id)
       .then((income) => {
           res.status(200).json({message:'expense deleted'})
    })
    .catch((err) => {
        res.status(500).json({message:'server error'})
    })
}

exports.getExpenseById = async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await ExpenseSchema.findById(id);

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json(expense);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid expense ID' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};



exports.updateExpenseAmount = async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;

    try {
        // Validate the new amount
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number' });
        }

        
        const updatedExpense = await ExpenseSchema.findByIdAndUpdate(
            id.trim(),
            { amount: amount },
            { new: true, runValidators: true }
        );

        
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({message: 'expense updated'});
    } catch (error) {
        
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid expense ID' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

