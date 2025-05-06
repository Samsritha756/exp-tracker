import styled from 'styled-components';
import { MainLayout } from './styles/Layouts';
import Orb from './components/Orb/Orb';
import Navigation from './components/Navigation/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import Transactions from './components/Transaction/Transaction';
import Income from './components/Income/Income';
import { useState } from 'react';
import Expenses from './components/Expenses/Expenses';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserSignup from './UserSignup/UserSignup';
import UserLogin from './UserLogin/UserLogin';


function App() {
    const [active, setActive] = useState(1); // Default to first menu item

    const displayData = () => {
        switch (active) {
            case 1:
                return <Dashboard setActive={setActive}/>;
            case 2:
                return <Transactions />;
            case 3:
                return <Income />;
            case 4:
                return <Expenses />;
            default: 
                return <Dashboard />;
        }
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/signup" />} />
                <Route path="/signup" element={<UserSignup />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/dashboard" element={
        <AppStyled>
            <Orb />
            <MainLayout>
                <Navigation active={active} setActive={setActive} />
                <main>
                    {displayData()}
                </main>
            </MainLayout>
        </AppStyled>
        } />
            </Routes>
        </Router>
    );
}

const AppStyled = styled.div`
    height: 100vh;
    background: rgba(252, 246, 249, 0.78);
    position: relative;
    main {
        flex: 1;
        background: rgba(252, 246, 249, 0.78);
        border: 3px solid #FFFFFF;
        backdrop-filter: blur(4.5px);
        border-radius: 32px;
        overflow-x: hidden;
        &::-webkit-scrollbar{
            width: 0;
        }

        .content {
            padding: 2rem 1.5rem;
            h1 {
                color: rgba(34, 34, 96, 1);
                font-size: 2rem;
                font-weight: 600;
                margin-bottom: 2rem;
            }

            .stats {
                .chart {
                    height: 300px;
                    border-radius: 1rem;
                    margin-bottom: 2rem;
                }

                .amount-con {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2rem;
                    margin-top: 2rem;
                    
                    .income, .expense, .balance {
                        background: #FCF6F9;
                        border: 2px solid #FFFFFF;
                        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                        border-radius: 20px;
                        padding: 1rem;
                        
                        h2 {
                            font-size: 1.5rem;
                            font-weight: 600;
                            color: rgba(34, 34, 96, 0.8);
                            margin-bottom: 1rem;
                        }
                        
                        p {
                            font-size: 2.5rem;
                            font-weight: 600;
                            color: rgba(34, 34, 96, 1);
                        }
                    }

                    .balance {
                        p {
                            color: #42AD00;
                        }
                    }
                }
            }
        }
    }
`;

export default App;