import React, { useState } from 'react';
import './WelcomePage.css'; // Import the CSS file for the component
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

const WelcomePage = () => {
    const [isLoginForm, setIsLoginForm] = useState(false);

    const handleToggleForm = () => {
        setIsLoginForm((prevState) => !prevState);
      };

  return (
    <div className="welcome-page">
      <h1 className="welcome-heading">Welcome to the Notes App!</h1>
      <p className="welcome-text">
        Please {isLoginForm ? 'log in' : 'sign up'} to get started.
      </p>
      <div className="login-signup">
        {isLoginForm ? (
          <LoginForm onToggleForm={handleToggleForm} />
        ) : (
          <SignupForm onToggleForm={handleToggleForm} />
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
