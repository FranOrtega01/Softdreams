import React, { useState, useContext, useEffect } from 'react'
import './Login.scss'

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../Validations/login.validation.js'

import { TextInput } from '../Components/TextInput';
import { AuthContext } from '../Context/AuthContext.jsx'

export const Login = () => {

    const { login } = useContext(AuthContext);

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });

    useEffect(() => {
        document.title = 'Instrumental Dufour | Log In';
    }, []);


    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const result = await login(data);
            if (result.success) {
                navigate('/admin');
            } else {
                setErrorMessage(result.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="left-section">
            </div>
            <div className="right-section">
                <div className="form-container">
                    <h2 className='text-center mb-4'>Login</h2>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <TextInput
                                placeholder={"Email"}
                                register={register}
                                label={'Email'}
                                name={'email'}
                                errors={errors}
                                type={'email'}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <TextInput
                                placeholder={"Contraseña"}
                                register={register}
                                label={'Password'}
                                name={'password'}
                                errors={errors}
                                type={'password'}
                                className="form-control"
                            />
                        </div>
                        <div className="action mb-3 text-center">
                            <input
                                type="submit"
                                value={loading ? "Ingresando" : "Ingresar"}
                                className="btn btn-primary btn-action w-100"
                                disabled={loading}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
