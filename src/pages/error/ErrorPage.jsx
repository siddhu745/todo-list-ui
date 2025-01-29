import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

function ErrorPage() {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const handleClick = () => {
    logOut()
    navigate('/')
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      handleClick()
    },5000)

    return () => clearTimeout(timeOut)

  },[])

  return (
    <div>ErrorPage <button onClick={handleClick}>Go Home</button></div>
  )
}

export default ErrorPage