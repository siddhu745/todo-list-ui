import React, { useEffect, useState } from 'react'
import SubmitButton from '../../components/button/SubmitButton';
import { useAuth } from '../../context/AuthContext';
import { replace, useNavigate } from 'react-router-dom';
import { axiosClient } from '../../apiClient/apiClient';
import { LOGIN, REGISTER } from '../../apiClient/url';
import LoadingButton from '../../components/button/LoadingButton';
import { removeAfterSomeTime } from '../../utils/utils';

function LoginForm() {
    const [inputs, setInputs] = useState({})
    const [errors, setErrors] = useState({});
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [apiLoading, setApiLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
        addName();
    }

    const addName = () => {
        setInputs(values => ({ ...values, ["username"]: inputs?.email?.split('.')[0]?.split('@')[0] }))
    }

    useEffect(() => {
        removeAfterSomeTime(errors, setErrors)
    }, [errors])

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
        if (validate()) {
            setErrors({})
            try {
                setApiLoading(true)
                const response = await axiosClient.post(isLoginForm ? LOGIN : REGISTER, inputs)
                login(response?.data?.data);
                navigate('/dashboard', { replace: true });
            } catch (error) {
                let newErrors = {}
                newErrors.apiError = error?.response?.data?.message || error?.code === 'ERR_NETWORK' && "Network error please try after some time"
                setErrors(newErrors);
            }
            finally {
                setApiLoading(false)
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
                </h2> :
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
                <div className='flex justify-end'>
                    {apiLoading ? <LoadingButton /> : <SubmitButton text={isLoginForm ? 'Login' : 'Register'} />}
                </div>
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
            {errors.apiError && <p className='text-red-500 p-2 m-5 ml-0 bg-red-100 rounded-md w-64'>{errors.apiError}</p>}
        </div>
    )
}

export default LoginForm