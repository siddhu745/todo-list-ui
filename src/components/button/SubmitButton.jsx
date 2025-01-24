import React from 'react'
import './button.css'

function SubmitButton({text}) {
  return (
    <button className='bg-teal-500 pl-5 pr-5 p-2 rounded-full text-white font-semibold border-0' type='submit'>{text}</button>
  )
}

export default SubmitButton