import React, { useState } from 'react';
import './WelcomePage.css';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

const WelcomePage = ({ authUser }) => {
  const [isLoginForm, setIsLoginForm] = useState(false);

  const handleToggleForm = async () => {
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
          <LoginForm onToggleForm={handleToggleForm} authUser={authUser} />
        ) : (
          <SignupForm onToggleForm={handleToggleForm} />
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
