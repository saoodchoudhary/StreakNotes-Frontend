import React, { useContext, useEffect, useState } from 'react'
import BackBtnOnly from '../components/layout/BackBtnOnly';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { IoArrowBack } from 'react-icons/io5';

const OtpPage = ({data, onclose}) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [timer, setTimer] = useState(30);
    
    const navigate = useNavigate();
    const {setToken} = useContext(AuthContext);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                clearInterval(countdown);
            }
        }, 1000);
        return () => clearInterval(countdown);
    }, [timer]);

    const handleOtpChange = (e, index) => {
        const newOtp = [...otp];
        const value = e.target.value.slice(-1);

        if (value === '') {
            newOtp[index] = '';

            if (index > 0) {
                const prevInput = document.querySelectorAll('.otp-input')[index - 1];
                prevInput.focus();
            }
        } else {
            newOtp[index] = value;

            if (index < otp.length - 1) {
                const nextInput = document.querySelectorAll('.otp-input')[index + 1];
                nextInput.focus();
            }
        }

        setOtp(newOtp);
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const enteredOtp = otp.join('');

        if (enteredOtp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        try {
            const response = await axios.post(import.meta.env.VITE_API_URI + '/user/verify-otp', { otp: enteredOtp, ...data });
            if (response.status === 201) {
                console.log(response.data)
                setSuccess('OTP verification successful!');
                setToken(response.data.token, response.data.uid);
                navigate('/');

            } else {
                setError(response.data.message || 'OTP verification failed');
            }
        } catch (error) {
            setError('OTP verification failed. Please try again.');
        }
    };

    const resendOtp = async () => {
            setError('');
            setSuccess('');
        axios.post(import.meta.env.VITE_API_URI + '/user/resend-otp', {  data })
        .then((response) => {
            setSuccess('OTP sent successfully');
            setTimer(30);
        }).catch((error) => {
            console.log(error);
            setError('Failed to resend OTP');
        });
        
    };

    return (
        <div className=" fixed top-0 w-full z-40 h-screen bg-white">
             <div className='h-[60px] p-[18px] bg-white flex  border-b fixed right-0 top-0 gap-3 w-full z-50'>
        <div className='flex gap-[17px] align-middle'>
        <button onClick={() => onclose} className='text-[18px] font-semibold self-center'><IoArrowBack /></button>
        </div>
    </div>      
            <div className=" flex justify-center items-center h-[80%]">
                <form className="" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center">
                        <div className='relative '>
                        <img src="/icon/mail.png" alt="otp" className="w-24 h-24 my-12" />
                        {/* <div className="flex justify-center items-center ml-2">
                            <img src="/icon/sent.svg" alt="otp" className="w-10 h-10 absolute" />
                            </div>*/}
                        </div> 
                    </div>
                    <h3 className="mb-4 text-2xl  text-center font-semibold tracking-tight text-gray-900 ">
                        OTP Verification
                    </h3>
                    <p className="font-normal text-center text-gray-600 mb-12 lg:text-sm dark:text-gray-400 sub-text">Enter the  OTP sent to your email address.</p>

                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">{error}</div>}
                    {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">{success}</div>}
                    <div className="flex justify-center mb-0 mt-3">
                        {otp.map((digit, index) => (
                            <input

                                key={index}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleOtpChange(e, index)}
                                className="otp-input bg-gray-50 border border-gray-300 sub-text text-2xl text-center rounded-lg block w-10 h-10 mx-1 0 dark:focus:border-green-600"
                            />
                        ))}
                    </div>
                    <div className="flex justify-center items-center mt-4">

                        {timer > 0 && (
                            <p className="font-normal text-gray-600 lg:text-sm dark:text-gray-400 sub-text">
                                Resend OTP in <span className="text-green-600 font-bold">{timer}</span> seconds
                            </p>
                        )}
                        {timer === 0 && (
                            <a href='javascript:void(0)' className="text-green-600 hover:text-green-800 focus:outline-none font-normal rounded-lg text-sm text-center  " onClick={resendOtp}>
                                Resend OTP
                            </a>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-normal rounded-lg text-sm px-5 py-2.5 text-center  w-full mt-6"
                    >
                        Verify OTP
                    </button>

                </form>
            </div>
        </div>
    );
};


export default OtpPage;