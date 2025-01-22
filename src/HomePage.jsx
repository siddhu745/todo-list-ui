import React, { useRef } from 'react'
import './App.css'
import { FaArrowRightLong } from 'react-icons/fa6'
import LoginForm from './LoginForm';

function HomePage() {
  const boxRef = useRef(null);

  const toggleVisibility = () => {
    boxRef.current.classList.toggle('show');
  };

  return (
    <div className='relative'>
      <div ref={boxRef} className='hide'>
        <div className='flex justify-center'>
          <LoginForm/>
        </div>
      </div>
      <div className='container md:mx-auto homeBg flex justify-center'>
        <div className='relative top-24 m-5 h-fit'>
          <div>
            <h1 className='font-bold'>NEXT LEVEL T<span className='text-teal-500'>O</span>D<span className='text-teal-500'>O</span> LIST APP</h1>
            <p className='text-right'>WITH ML CAPABILITIES</p>
          </div>
          <div className='flex justify-center mt-11'>
            <button onClick={toggleVisibility}>Try it <FaArrowRightLong className='inline-block ml-2' /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage