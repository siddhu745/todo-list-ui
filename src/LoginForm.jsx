import React, { useState } from 'react'

function LoginForm() {
    const [inputs, setInputs] = useState({})
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        alert(JSON.stringify(inputs))
    }
    return (
        <div className='mt-24'>
            <h2 className='font-semibold'>Your First TODO</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Email</label><br/>
                    <input
                        type='email'
                        name='email'
                        value={inputs.email || ""}
                        placeholder='Yourname@email.com'
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor='password'>Password</label><br/>
                    <input
                        name='password'
                        value={inputs.password || ""}
                        type='password'
                        placeholder='P@$$word'
                        onChange={handleChange}
                    />
                </div>

                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm