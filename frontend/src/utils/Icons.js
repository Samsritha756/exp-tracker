import React from 'react';
import { 
    Briefcase, 
    Coffee,
    Home,
    Car,
    Heart,
    Utensils,
    ShoppingBag,
    Laptop,
    Wallet,
    DollarSign,
    Bitcoin,
    Building2,
    Youtube,
    CircleDot,
    GraduationCap,
    ShoppingCart,
    Plane,
    Shirt
  } from 'lucide-react';

export const dashboard = <i className="fa-solid fa-house"></i>;
export const transactions = <i className="fa-solid fa-credit-card"></i>;
export const categories = <i className="fa-solid fa-tags"></i>;
export const accounts = <i className="fa-solid fa-wallet"></i>;
export const settings = <i className="fa-solid fa-cog"></i>;
export const logout = <i className="fa-solid fa-sign-out"></i>;
export const trend = <i className="fa-solid fa-money-bill-trend-up"></i>;
export const expenses = <i className="fa-solid fa-money-bill-transfer"></i>;
export const money = <i className="fa-solid fa-money-bill"></i>;
export const freelance = <i className="fa-solid fa-earth-americas"></i>;
export const stocks = <i className="fa-solid fa-arrow-trend-up"></i>;
export const bitcoin = <i className="fa-brands fa-bitcoin"></i>;
export const piggy = <i className="fa-solid fa-piggy-bank"></i>;
export const yt = <i className="fa-brands fa-youtube"></i>;
export const card = <i className="fa-brands fa-cc-visa"></i>;
export const users = <i className="fa-solid fa-users-between-lines"></i>;
export const dollar = <i className="fa-solid fa-dollar-sign"></i>;
export const calender = <i className="fa-solid fa-calendar"></i>;
export const comment = <i className="fa-solid fa-comment"></i>;
export const plus = <i className="fa-solid fa-plus"></i>;
export const trash = <i className="fa-solid fa-trash"></i>;
export const signout = <i className="fa-solid fa-right-from-bracket"></i>;
export const takeaways = <i className="fa-solid fa-utensils"></i>;
export const clothing = <i className="fa-solid fa-shirt"></i>;
export const book = <i className="fa-solid fa-book-open"></i>;
export const food = <i className="fa-solid fa-bowl-food"></i>;
export const medical = <i className="fa-solid fa-briefcase-medical"></i>;
export const tv = <i className="fa-solid fa-tv"></i>;
export const circle = <i className="fa-solid fa-circle-dot"></i>;




export const getCategoryIcon = (category) => {
  const icons = {
    // Income categories
    salary: <Briefcase size={20} />,
    freelancing: <Laptop size={20} />,
    investments: <DollarSign size={20} />,
    stocks: <Building2 size={20} />,
    bitcoin: <Bitcoin size={20} />,
    bank: <Wallet size={20} />,
    youtube: <Youtube size={20} />,
    
    // Expense categories
    education: <GraduationCap size={20} />,
    groceries: <ShoppingCart size={20} />,
    health: <Heart size={20} />,
    subscriptions: <CircleDot size={20} />,
    takeaways: <Utensils size={20} />,
    clothing: <Shirt size={20} />,
    travelling: <Plane size={20} />,
    other: <Coffee size={20} />,
  };

  return icons[category?.toLowerCase()] || <Coffee size={20} />;
};