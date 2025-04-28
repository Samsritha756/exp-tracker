import { dashboard, expenses, transactions, trend } from './Icons';

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard',
    },
    {
        id: 2,
        title: 'View Transactions',
        icon: transactions,
        link: '/transactions',
    },
    {
        id: 3,
        title: 'Income',
        icon: trend,
        link: '/income',
    },
    {
        id: 4,
        title: 'Expense',
        icon: expenses,
        link: '/expenses',
    }
];