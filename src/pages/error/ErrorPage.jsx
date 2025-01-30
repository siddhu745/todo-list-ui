import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorPage({statusCode,message,description}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/', { replace: true })
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      handleClick()
    },10000)

    return () => clearTimeout(timeOut)

  },[])

  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
        <div className='text-9xl text-center font-black text-gray-400'>{statusCode}</div>
        <p className='text-center font-medium text-2xl m-5'>{message}</p>
        <div className='flex justify-center'>
          <p className='text-center w-72 text-gray-500'>{description}</p>
        </div>
        <div className='flex justify-center m-5'>
          <button className='blackButton' onClick={handleClick}>Go Home</button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage