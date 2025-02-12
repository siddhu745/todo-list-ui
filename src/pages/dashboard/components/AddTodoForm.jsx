import React, { useEffect, useState } from 'react'

function AddTodoForm({ showForm, setShowFrom }) {
    const [inputs, setInputs] = useState({})
    const [show, setShow] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(inputs))
    }

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        setShow(showForm)
    },[showForm])

    const handleClose = () => {
        setShow(false);
        setTimeout(() => {setShowFrom(false);},150)
    };


    return (
        showForm && <div
            className={`fixed h-screen w-full flex justify-center items-center bg-opacity-10 top-0 left-0`}
            onClick={handleClose}
        >
            <div
                className={`bg-white p-5 rounded-md drop-shadow-xl border transition-all duration-300 ease-in-out ${show ? 'mt-0' : 'mt-5'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className='text-blue-500 text-2xl m-1 mb-5'>Add Todo</h1>
                <form onSubmit={handleSubmit} >
                    <div className='mb-3'>
                        <label htmlFor='name' className='m-1 text-slate-500'>Name</label><br />
                        <input
                            name='todoName'
                            value={inputs.todoName || ""}
                            type='text'
                            onChange={handleChange}
                            className='border-2 p-1 pl-2 rounded-xl w-80'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='description' className='m-1 text-slate-500'>Description</label><br />
                        <textarea
                            name='todoDesc'
                            value={inputs.todoDesc || ""}
                            type='area'
                            onChange={handleChange}
                            className='border-2 p-1 pl-2 rounded-xl w-80'
                            rows={6}
                        >
                        </textarea>

                    </div>
                    <div>
                        <button
                            type='button'
                            onClick={handleClose}
                            className='p-2 border rounded'
                        >
                            cancel
                        </button>
                        <button
                        className='p-2 border rounded'
                        >add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTodoForm