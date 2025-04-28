import React from 'react';
import styled from 'styled-components';
import { menuItems } from '../../utils/menuItems';
import { signout } from '../../utils/Icons';
import { useNavigate } from 'react-router-dom';
import img from './img.png';


function Navigation({ active, setActive }) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <NavStyled>
            <div className="user-con">
                <img src={img} alt="User Avatar" />
                <div className="text">
                    <h2>{user.name}</h2>
                    <p>Your Money</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => (
                    <li 
                        key={item.id}
                        className={active === item.id ? 'active' : ''}
                        onClick={() => setActive(item.id)}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>
            <div className="bottom-nav">
  <li onClick={() => {
    // Optional: clear any auth/session data here
    navigate('/login'); // 👈 This redirects to the login page
  }}>
    {signout} Sign Out
  </li>
</div>

        </NavStyled>
    );
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;

    .user-con {
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        
        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }

        .text {
            h2 {
                color: rgba(34, 34, 96, 1);
                font-size: 1.8rem;
                margin-bottom: .2rem;
            }
            p {
                color: rgba(34, 34, 96, .6);
            }
        }
    }

    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;
        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;

            i {
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }

            &.active {
                color: rgba(34, 34, 96, 1);
                i {
                    color: rgba(34, 34, 96, 1);
                }
                &::before {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 4px;
                    height: 100%;
                    background: #222260;
                    border-radius: 0 10px 10px 0;
                }
            }

            &:hover {
                color: rgba(34, 34, 96, 0.9);
                i {
                    color: rgba(34, 34, 96, 0.9);
                }
            }
        }
    }

    .bottom-nav {
        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            
            i {
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }

            &:hover {
                color: rgba(34, 34, 96, 0.9);
                i {
                    color: rgba(34, 34, 96, 0.9);
                }
            }
        }
    }
`;

export default Navigation;