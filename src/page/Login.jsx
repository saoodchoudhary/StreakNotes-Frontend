// src/components/Login.js
import React, { useContext, useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import useForm from '../hooks/useForm';
import { submitFormData } from '../hooks/api';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/layout/Loading';

const Login = () => {
  const { setToken } = useContext(AuthContext);
  const initialValues = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();

  const submitCallback = async () => {
    setIsLoading(true);
    try {
      const response = await submitFormData(values, "login");
      console.log('Login successful', response);
      setToken(response.token, response.uid);
      setIsLoading(false);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      setIsLoading(false);
    }
  };

  const { values, errors, handleChange, handleSubmit, isLoading, setIsLoading } = useForm(submitCallback, initialValues);

  
  if(isLoading) {
    return <Loading/>;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500">
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-80 max-w-md transform transition duration-500 hover:scale-105">
          <img src="/icon/login.svg" alt="login" className="w-24 h-24 mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <div className="flex items-center border-b border-gray-300 py-2">
                <FaEnvelope className="mr-2 text-gray-500" />
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>
            <div className="mb-6">
              <div className="flex items-center border-b border-gray-300 py-2">
                <FaLock className="mr-2 text-gray-500" />
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                  type="password"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-blue-500 hover:to-teal-400 text-white font-semibold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline flex items-center" type="submit">
                <FiLogIn className="mr-2" /> Login
              </button>
            </div>
            <p className="text-center text-gray-500 text-xs mt-4">
              Don’t have an account? <Link to="/register" className="text-teal-700 hover:text-blue-700">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
