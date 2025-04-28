import React, { useState } from 'react';
import { DollarSign, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import styled from 'styled-components';
import { loginUser } from '../context/Auth';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👁️ Toggle
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      
      const data = await loginUser({email, password});
      console.log(data);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    window.location.href = '/signup';
  };

  return (
    <LoginStyled>
      <div className="login-container">
        <div className="background-animation">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="floating-icon"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 5}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              <DollarSign size={32} color="#fff" />
            </div>
          ))}
        </div>

        <div className="login-form-container">
          <div className="login-form">
            <div className="logo-container">
              <div className="logo-circle">
                <DollarSign color="#fff" />
              </div>
              <h2 className="form-title">Welcome Back</h2>
              <p className="form-subtitle">Log in to manage your expenses</p>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-container">
                  <Mail className="input-icon" color="#888" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-container" style={{ position: 'relative' }}>
                  <Lock className="input-icon" color="#888" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      cursor: 'pointer',
                      color: '#888',
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>
                <div className="forgot-password">
                  <button type="button" className="forgot-password-link">
                    Forgot password?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="submit-button"
              >
                {isLoading ? (
                  <div className="loading-spinner" />
                ) : (
                  'Log in'
                )}
              </button>
            </form>

            <div className="signup-text">
              Don't have an account?{' '}
              <button
                onClick={handleSignup}
                className="signup-link"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </LoginStyled>
  );
};

const LoginStyled = styled.div`
/* Your existing styles — no changes needed */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #2c3e50, #34495e);
  overflow: hidden;
  position: relative;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.background-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-icon {
  position: absolute;
  font-size: 2rem;
  color: #fff;
  opacity: 0.7;
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
}

.login-form-container {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
  padding: 3rem;
  width: 400px;
  max-width: 90%;
  text-align: center;
  z-index: 1;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-container {
  margin-bottom: 2rem;
}

.logo-circle {
  width: 70px;
  height: 70px;
  background-color: #27ae60;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1rem;
  font-size: 2rem;
  color: #fff;
}

.form-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  font-size: 1rem;
  color: #777;
}

.form-group {
  width: 100%;
  margin-bottom: 1.5rem;
  text-align: left;
}

.form-label {
  display: block;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.input-container {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.5rem;
  position: relative;
}

.input-icon {
  margin-right: 0.75rem;
  color: #888;
}

.form-input {
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
  color: #333;
  width: 100%;
}

.forgot-password {
  text-align: right;
  margin-top: 0.5rem;
}

.forgot-password-link {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 0.85rem;
  text-decoration: none;
}

.forgot-password-link:hover {
  color: #27ae60;
  text-decoration: underline;
}

.submit-button {
  background-color: #27ae60;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

.submit-button:hover {
  background-color: #219653;
}

.submit-button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.loading-spinner {
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 5px solid #fff;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.signup-text {
  font-size: 0.9rem;
  color: #555;
  margin-top: 1.5rem;
}

.signup-link {
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
}

.signup-link:hover {
  text-decoration: underline;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}
`;

export default UserLogin;
