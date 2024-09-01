import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import './CardLogin.css';

const CardLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        setIsEmailValid(emailValue.includes('@')); // Simple email validation
    };

    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
        setIsPasswordValid(passwordValue.length >= 6); // Simple password validation
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isEmailValid && isPasswordValid) {
            console.log('Email:', email);
            console.log('Password:', password);
        }
    };

    return (
        <div className='body'>
        <form onSubmit={handleSubmit} className="login-form">
            <h2>LOGIN</h2>
            <div className="input-group">
                <span className="icon">
                    <FaUser />
                </span>
                <input
                    type="email"
                    placeholder='Email'
                    className='input'
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
            </div>
            <div className="input-group">
                <span className="icon">
                    <FaLock />
                </span>
                <input
                    type="password"
                    placeholder='Password'
                    className='input'
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
            </div>
            <button
                className='submit-button'
                type="submit"
                disabled={!(isEmailValid && isPasswordValid)} // Disable button if fields are not valid
            >
                LOGIN
            </button>
            <p className="register-link">
                Don't have an account? <a href="#">Register</a>
            </p>
        </form>
        </div>
    );
};

export default CardLogin;
