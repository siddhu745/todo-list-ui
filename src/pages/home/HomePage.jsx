import React, { useEffect, useRef, useState } from 'react'
import './home.css'
import { FaArrowRightLong } from 'react-icons/fa6'
import LoginForm from './LoginForm';
import { IoIosArrowBack } from 'react-icons/io';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { removeAfterSomeTime } from '../../utils/utils';

function HomePage() {
  const boxRef = useRef(null);
  const { authData, loading, unAuthError, logOut, setUnauthError, setIsLogOut } = useAuth();
  const [error, setError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (unAuthError?.response) {
      logOut();
      setError(unAuthError.response.data)
      setUnauthError({})
    }
    if(unAuthError?.code === 'ERR_NETWORK') {
      logOut();
      setError("Network error please try again after some time...")
      setUnauthError({})
    }
    setIsLogOut(false);
  })

  useEffect(() => {
    removeAfterSomeTime(error, setError)
  }, [error])

  const tryThis = () => {
    if (!loading && authData.token) navigate('/dashboard', { replace: true });
    else boxRef.current.classList.toggle('show');
  };

  return (
    <div className='relative'>
      {error?.message &&
        <div className='w-full flex justify-center absolute'>
          <p className='text-red-500 p-2 m-5 bg-red-100 w-fit rounded-md '>Session expired or Unauthorized <b> Please Login again...</b></p>
        </div>}
      <div ref={boxRef} className='hide'>
        <div className='flex justify-center m-24'>
          <div>
            <p onClick={tryThis} className='flex items-center text-teal-500 cursor-pointer'><IoIosArrowBack /> back</p>
            <LoginForm />
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