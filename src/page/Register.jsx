// src/components/Register.js
import React, { useContext, useState } from 'react';
import { FaUserAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import { FiUserPlus } from 'react-icons/fi';
import useForm from '../hooks/useForm';
import { submitFormData } from '../hooks/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import OtpPage from './OtpPage';
import { validations } from '../utils/validations';

const Register = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const [openOtp, setOpenOtp] = useState(false);

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const submitCallback = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URI + '/user/otp-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.message) {
          setErrors({ email: data.message });
          return;
        }
        const message = `An error occurred: ${response.status}`;
        throw new Error(message);
      }

      console.log(data);
      setOpenOtp(true);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('values', values);
    const validationsError = validations(values);
    setErrors(validationsError);
    if (Object.keys(validationsError).length === 0) {
      submitCallback();
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500">
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-80 max-w-md transform transition duration-500 hover:scale-105">
          <img src="/icon/login.svg" alt="register" className="w-24 h-24 mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Create Your Account</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <div className="flex items-center border-b border-gray-300 py-2">
                <FaUserAlt className="mr-2 text-gray-500" />
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-xs italic">{errors.fullName}</p>}
            </div>
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
            <div className="mb-4">
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
            <div className="mb-6">
              <div className="flex items-center border-b border-gray-300 py-2">
                <FaLock className="mr-2 text-gray-500" />
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
            </div>
            <div className="flex items-center justify-center mb-4">
              <button className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-400 text-white font-semibold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline flex items-center" type="submit">
                <FiUserPlus className="mr-2" /> Create Account
              </button>
            </div>
            <p className="text-center text-gray-500 text-xs">
              I already have an account? <a href="/login" className="text-teal-700 hover:text-teal-700">Log In</a>
            </p>
          </form>
        </div>
        {openOtp && <OtpPage data={values} onClose={() => setOpenOtp(false)} />}
      </div>
    </>
  );
};

export default Register;
