import React, { useState, useContext } from 'react';
import axios from 'axios';

const BASE_URL = "http://localhost:5001/api/v1/";

export const loginUser = async ({ email, password }) => {
    try {
      const response = await axios.post(`${BASE_URL}login`, { email, password });
  
      if (response && response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
      } else {
        throw new Error('Login failed: Invalid response');
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error?.response?.data?.message || 'Login failed');
    }
  };

  

  export const signupUser = async ({ name, email, password, phone }) => {
    try {
      const response = await axios.post(`${BASE_URL}signup`, {
        name,
        email,
        password,
        phone,
      });
  
      if (response && response.data) {
        window.location.href = '/login';
        return response.data;
      } else {
        throw new Error('Signup failed: Invalid response');
      }
    } catch (error) {
      console.error("Signup error:", error);
      throw new Error(error?.response?.data?.message || 'Signup failed');
    }
  };
  