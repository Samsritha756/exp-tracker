import React, { useState } from 'react';
import styled from 'styled-components';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import { signupUser } from '../context/Auth';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await signupUser(formData);
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <ImageSide>
      <img src="https://images.unsplash.com/photo-1581093588401-a1a4e46b77c6?auto=format&fit=crop&w=900&q=80" alt="Signup Visual" className="signup-image" />
      </ImageSide>
      <FormSide>
        <FormContainer>
          <h1>Create Your Account</h1>
          <p>Start managing your expenses with insights and ease.</p>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <InputField>
              <User />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </InputField>
            <InputField>
              <Mail />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputField>
            <InputField>
              <Phone />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </InputField>
            <InputField>
              <Lock />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </InputField>
            <InputField>
              <Lock />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </span>
            </InputField>
            <SubmitButton disabled={isLoading}>{isLoading ? 'Signing up...' : 'Sign Up'}</SubmitButton>
          </form>
          <p className="login-link">Already have an account? <a href="/login">Login here</a></p>
        </FormContainer>
      </FormSide>
    </Container>
  );
};

export default SignupPage;

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f4f7fb;
`;

const ImageSide = styled.div`
  flex: 1;
  background: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 90%;
    max-width: 500px;
  }
`;

const FormSide = styled.div`
  flex: 1;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  width: 80%;
  max-width: 400px;

  h1 {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 2rem;
  }
  .error {
    background-color: #ffdddd;
    color: #c00;
    padding: 0.75rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
  .login-link {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.85rem;
  }
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1.25rem;
  padding: 0.5rem 1rem;
  position: relative;

  svg {
    margin-right: 0.75rem;
    color: #888;
  }

  input {
    border: none;
    outline: none;
    flex: 1;
    font-size: 1rem;
  }

  span {
    position: absolute;
    right: 1rem;
    cursor: pointer;
  }
`;

const SubmitButton = styled.button`
  background: #27ae60;
  color: white;
  border: none;
  padding: 1rem;
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #219653;
  }

  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
  }
`;
