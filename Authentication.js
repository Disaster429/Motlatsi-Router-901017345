import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection
import './Authentication.css'; // Import the CSS file for styles

function Authentication({ onAuthenticate }) {
    const [userInput, setUserInput] = useState('');
    const [passInput, setPassInput] = useState('');
    const [registerUser, setRegisterUser] = useState('');
    const [registerPass, setRegisterPass] = useState('');
    const [message, setMessage] = useState('');
    const [isInRegistrationMode, setIsInRegistrationMode] = useState(false);
    const [redirectToDashboard, setRedirectToDashboard] = useState(false); // New state for redirection

    const loginHandler = (event) => {
        event.preventDefault();
        const userDatabase = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = userDatabase.find(user => user.username === userInput && user.password === passInput);

        if (foundUser) {
            onAuthenticate(); // Call the provided authentication handler
            setRedirectToDashboard(true); // Set redirection to dashboard
        } else {
            setMessage("Incorrect username or password! Please register if you don't have an account.");
        }
    };

    const registerHandler = (event) => {
        event.preventDefault();
        const userDatabase = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = userDatabase.some(user => user.username === registerUser);

        if (userExists) {
            setMessage("This username is already taken. Please choose another one.");
            return;
        }

        userDatabase.push({ username: registerUser, password: registerPass });
        localStorage.setItem('users', JSON.stringify(userDatabase));
        setMessage("Registration was successful! You can now log in.");
        setIsInRegistrationMode(false);
    };

    if (redirectToDashboard) {
        return <Navigate to="/dashboard" />; // Redirect to dashboard after login
    }

    return (
        <div className="auth-container">
            {isInRegistrationMode ? (
                <div>
                    <h1>WINGS CAFEE</h1>
                    <h2>Create a New Account</h2>
                    <div className="message-display">{message}</div>
                    
                    <form className="auth-form" onSubmit={registerHandler}>
                        <label>Username:</label>
                        <input 
                            type="text" 
                            className="auth-input" // Add CSS class
                            required 
                            onChange={(e) => setRegisterUser(e.target.value)} 
                        />
                        <label>Password:</label>
                        <input 
                            type="password" 
                            className="auth-input" // Add CSS class
                            required 
                            onChange={(e) => setRegisterPass(e.target.value)} 
                        />
                        <div className="button-container">
                            <button type="submit" className="auth-button">Sign Up</button>
                            <button type="button" className="auth-button" onClick={() => setIsInRegistrationMode(false)}>Go Back</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div>
                    <h1>#WELCOME#</h1>
                    <h2>User Login</h2>
                    {message}
                    <form className="auth-form" onSubmit={loginHandler}>
                        <label>Username:</label>
                        <input 
                            type="text" 
                            className="auth-input" // Add CSS class
                            required 
                            onChange={(e) => setUserInput(e.target.value)} 
                        />
                        <label>Password:</label>
                        <input 
                            type="password" 
                            className="auth-input" // Add CSS class
                            required 
                            onChange={(e) => setPassInput(e.target.value)} 
                        />
                        <div className="button-container">
                            <button type="submit" className="auth-button">Log In</button>
                            <button type="button" className="auth-button" onClick={() => setIsInRegistrationMode(true)}>Sign Up</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Authentication;