import React from 'react'

function LoadingButton() {
  return (
      <button 
        className='bg-teal-500 pl-5 pr-5 p-2 rounded-full text-white font-semibold border-0 flex'
        type='button'
      > Please wait...
        <span className='h-6 w-6 bg-white rounded-full flex justify-center items-center ml-3 loadBg'>
            <span className='h-5 w-5 rounded-full bg-teal-500'>

            </span>
        </span>
      </button>
  )
}

export default LoadingButton