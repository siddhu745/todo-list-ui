import React, { useRef } from 'react'
import './home.css'
import { FaArrowRightLong } from 'react-icons/fa6'
import LoginForm from './LoginForm';
import { IoIosArrowBack } from 'react-icons/io';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const boxRef = useRef(null);
  const { authData,loading } = useAuth();
  const navigate = useNavigate();

  const tryThis = () => {
    if(!loading && authData.token) navigate('/dashboard');
    else boxRef.current.classList.toggle('show');
  };

  return (
    <div className='relative'>
      <div ref={boxRef} className='hide'>
        <div className='flex justify-center m-24'>
          <div>
          <p onClick={tryThis} className='flex items-center text-teal-500 cursor-pointer'><IoIosArrowBack /> back</p>
          <LoginForm/>
          </div>
        </div>
      </div>
      <div className='container md:mx-auto homeBg flex justify-center'>
        <div className='relative top-24 m-5 h-fit'>
          <div>
            <h1 className='font-bold'>T<span className='text-teal-500'>O</span>D<span className='text-teal-500'>O</span> LIST APP</h1>
            <p className='text-right'>WITH ML CAPABILITIES</p>
          </div>
          <div className='flex justify-center mt-11 items-center'>
            <button className='blackButton' onClick={tryThis}><span>Try it</span> <FaArrowRightLong className='inline-block ml-2' /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage