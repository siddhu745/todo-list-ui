import React, { useState } from 'react'
import SubmitButton from '../../components/button/SubmitButton';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { axiosClient, httpMethods, ping, useNavigation } from '../../apiClient/apiClient';
import { LOGIN } from '../../apiClient/url';

function LoginForm() {
    const [inputs, setInputs] = useState({})
    const [errors, setErrors] = useState({});
    const [isLoginForm, setIsLoginForm] = useState(true);
    const { login } = useAuth();
    const navigate = useNavigate();
    useNavigation();
    

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const addName = () => {
        setInputs(values => ({...values, ["name"] : inputs?.email?.split('.')[0].split('@')[0]}))
    }

    const validate = () => {
        let isValid = true;
        let newErrors = {};

        // Password validation
        if (!inputs.password) {
            isValid = false;
            newErrors.password = "Password is required";
        } else if (inputs.password.length < 8) {
            isValid = false;
            newErrors.password = "Password must be at least 8 characters long";
        } else if (!/[A-Z]/.test(inputs.password)) {
            isValid = false;
            newErrors.password = "Password must contain at least one uppercase letter";
        } else if (!/[0-9]/.test(inputs.password)) {
            isValid = false;
            newErrors.password = "Password must contain at least one number";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(inputs.password)) {
            isValid = false;
            newErrors.password = "Password must contain at least one special character";
        }

        if (!inputs.email) {
            isValid = false;
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
            isValid = false;
            newErrors.email = "Email is invalid";
        }

        setErrors(newErrors);
        return isValid;
    };

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        addName();
        if (validate()) {
            setErrors({})
            try {
                const response = await axiosClient.post(LOGIN,inputs)
                login(response?.data?.data);
                navigate('/dashboard', { replace: true } );
            } catch (error) {
                errors.apiError = error?.response?.data?.message
                console.log(errors.apiError)
            }
        }      
    }

    const handleFormChange = () => {
        setIsLoginForm((prev) => !prev)
    }
    return (
        <div>
            
            {isLoginForm ? 
            <h2 className='font-medium mb-10'>
                Your First 
                T<span className='text-teal-500'>O</span>
                D<span className='text-teal-500'>O</span>
            </h2>:
            <h2 className='font-medium mb-10'>
                Create acc<span className='text-teal-500'>o</span>unt
            </h2>}
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <label htmlFor='email'>Email</label><br />
                    <input
                        className='border-2 p-1 pl-2 rounded-xl w-72'
                        type='email'
                        name='email'
                        value={inputs.email || ""}
                        placeholder='Yourname@email.com'
                        onChange={handleChange}
                    />
                    {errors.email && <p className='text-red-500 p-2 m-1 bg-red-100 rounded-md w-64'>{errors.email}</p>}
                </div>

                <div className='mb-2'>
                    <label htmlFor='password'>Password</label><br />
                    <input
                        className='border-2 p-1 pl-2 rounded-xl w-72'
                        name='password'
                        value={inputs.password || ""}
                        type='password'
                        placeholder='P@$$word'
                        onChange={handleChange}
                    />
                    {errors.password && <p className='text-red-500 p-2 m-1 bg-red-100 rounded-md w-64'>{errors.password}</p>}
                </div>
                <div className='text-right '><SubmitButton text={isLoginForm ? 'Login' : 'Register'} /></div>
            </form>
            <p className='mt-10'>
                {isLoginForm ? 'Don\'t have an accont ?' : 'Already have an account ?'}
                <span
                    className='font-medium text-teal-500 cursor-pointer'
                    onClick={handleFormChange}
                >
                    {isLoginForm ? ' Create' : ' Login'}
                </span>
            </p>
        </div>
    )
}

export default LoginForm