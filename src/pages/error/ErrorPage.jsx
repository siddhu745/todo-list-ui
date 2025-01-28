import React from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {
    const navigate = useNavigate();
  return (
    <div>ErrorPage <button onClick={() => navigate('/')}>Go Home</button></div>
  )
}

export default ErrorPage