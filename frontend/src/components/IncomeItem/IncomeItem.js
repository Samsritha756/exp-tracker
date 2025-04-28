import React from 'react';
import styled from 'styled-components';
import { calender, comment, dollar, trash, bitcoin, card, book, freelance, money, piggy, stocks, users, yt, food, medical, tv, takeaways, clothing, circle } from '../../utils/Icons';
import Button  from '../Button/Button';

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type,
}) {

    const formatDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString('en-US'); // This will format the date as MM/DD/YYYY
    };

    const categoryIcon = () => {
        switch (category) {
            case 'Salary':
                return money;
            case 'education':
                return freelance;
            case 'investments':
                return stocks;
            case 'stocks':
                return users;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return card;
            case 'youtube':
                return yt;
            case 'other':
                return piggy;
            default:
                return ''
        }
    }

    const expenseCatIcon = () => {
        switch (category) {
            case 'education':
                return book;
            case 'groceroies':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaways;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'other':
                return circle;
            default:
                return ''
        }
    }
    console.log('type', type)
    return (
        <IncomeItemStyled indicator={indicatorColor}>
           <div className="icon">
                {type === 'expense' ? expenseCatIcon() : categoryIcon() }
           </div>
           <div className="content">
                <div className="income-title">
                    <div className="dot" style={{ backgroundColor: indicatorColor }}></div>
                    <h3>{title}</h3>
                </div>
                <div className="inner-content">
                    <div className="text">
                        <p>{dollar} {amount}</p>
                        <p>{calender} {formatDate(date)}</p>
                        <p> 
                            {comment}
                            {description}
                        </p>
                    </div>
                    <div className="btn-con">
                         <Button
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color)'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={() => deleteItem(id)}
                        /> 
                    </div>
                </div>
           </div>
        </IncomeItemStyled>
    );
}

const IncomeItemStyled = styled.div`
    background: #FCF6F9;
    border: 1px solid #FFFFFF;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    max-width: 500px; /* Adjust max width to make it more compact */
    margin: 1rem auto; /* Center the income item and create a nice gap between them */
    
    .icon {
        width: 50px; /* Reduced width and height */
        height: 50px;
        border-radius: 10px;
        background: #F5F5F5;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
            font-size: 1.5rem; /* Adjust the size of the icon */
            color: var(--primary-color); /* Light color for the icon */
        }
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem; /* Smaller gap between content sections */

        .income-title {
            display: flex;
            align-items: center;
            gap: 0.5rem; /* Ensure gap between dot and title */
            
            .dot {
                width: 10px;  /* Size of the green dot */
                height: 10px;
                border-radius: 50%;  /* Make it a circle */
                color: var(--color-green);
            }

            h3 {
                font-size: 1.2rem;
                font-weight: 600;
                color: var(--primary-color);
            }
        }

        .inner-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem; /* Gap between description and delete button */
            
            .text {
                display: flex;
                flex-direction: column;
                gap: 0.5rem; /* Spacing between text items */
                p {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                    font-size: 1rem;
                }
            }

            .btn-con {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem; /* Adjusted gap between button and text */
                button {
                    background: var(--primary-color);
                    color: #fff;
                    border: none;
                    padding: 0.5rem;
                    font-size: 1.2rem;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: background 0.3s ease-in-out;
                    &:hover {
                        background: var(--color-green);
                    }
                }
            }
        }
    }
`;

export default IncomeItem;
