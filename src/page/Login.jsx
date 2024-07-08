// src/components/Login.js
import React, { useContext } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import BackBtnNavbar from '../components/layout/BackBtnNavbar';
import useForm from '../hooks/useForm';
import { submitFormData } from '../hooks/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  
 const {setToken} = useContext(AuthContext);
  const initialValues = {
    email: '',
    password: '',
  };

 const navigate =  useNavigate();

  const submitCallback = async () => {
    try {
      const response = await submitFormData(values,"login");
      console.log('Login successful', response);
      // localStorage.setItem('token', response.token);
      
      setToken(response.token, response.uid)
      // Handle successful login (e.g., redirect to dashboard)
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm(submitCallback, initialValues );

  return (
    <>
      <BackBtnNavbar text="Login" />
      <div className="flex bg-white w-full items-center justify-center min-h-screen">
        <div className="p-8 rounded-lg border w-96">
          <h2 className="text-2xl font-bold text-center mb-8">Sign in your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex items-center border-b border-teal-500 py-2">
                <FaEnvelope className="mr-2 text-gray-400" />
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
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
            <div className="mb-4">
              <div className="flex items-center border-b border-teal-500 py-2">
                <FaLock className="mr-2 text-gray-400" />
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
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
              <button className="bg-teal-500 hover:bg-teal-700 text-white font-semibold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline" type="submit">
                Login
              </button>
            </div>
            <p className="text-center text-gray-500 text-xs mt-4">
              Don’t have an account? <a href="/register" className="text-teal-500 hover:text-teal-700">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
