// src/components/Register.js
import React, { useContext } from 'react';
import { FaUserAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import BackBtnNavbar from '../components/layout/BackBtnNavbar';
import { submitFormData } from '../hooks/api';
import useForm from '../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
 const navigate =  useNavigate();
 const {setToken} = useContext(AuthContext);

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const submitCallback = async() => {  
    try{
      const response = await submitFormData(values, "register")
      console.log(response)
      // localStorage.setItem('token', response.token);
      setToken(response.token, response.uid)
      navigate('/')
    }catch(error){
      console.log(error)
    }
  }
  const {errors, values, handleChange, handleSubmit} = useForm( submitCallback, initialValues)

  return (
    <>
      <BackBtnNavbar text="Register" />
    <div className="flex items-center justify-center bg-white min-h-screen ">
      <div className=" p-8 rounded-lg border w-96">
        <h2 className="text-2xl font-bold text-center mb-8">Create your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {/* <label className="block text-gray-700" htmlFor="fullName">Full Name</label> */}
            <div className="flex items-center border-b border-teal-500 py-2">
              <FaUserAlt className="mr-2 text-gray-400" />
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
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
            {/* <label className="block text-gray-700" htmlFor="email">Email</label> */}
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
            {/* <label className="block text-gray-700" htmlFor="password">Password</label> */}
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
          <div className="mb-4">
            {/* <label className="block text-gray-700" htmlFor="confirmPassword">Confirm Password</label> */}
            <div className="flex items-center border-b border-teal-500 py-2">
              <FaLock className="mr-2 text-gray-400" />
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
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
          <div className="flex items-center justify-center">
            <button className="bg-teal-500 hover:bg-teal-700 text-white font-semibold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline" type="submit">
              Create Account
            </button>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">
            I already have an account? <a href="/login" className="text-teal-500 hover:text-teal-700">Log In</a>
          </p>
        </form>
      </div>
    </div></>
  );
};

export default Register;
