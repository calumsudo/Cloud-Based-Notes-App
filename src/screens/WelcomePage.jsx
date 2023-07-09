import React, { useState } from 'react';
import './WelcomePage.css';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import firebase from 'firebase/compat/app'; // Import the 'firebase/app' module
import 'firebase/compat/functions'; // Import the 'firebase/functions' module
import { firebaseConfig } from "../firebase"; // Assuming you have a separate firebase.js file with the necessary Firebase configuration

// Initialize Firebase using the configuration
firebase.initializeApp(firebaseConfig);

const WelcomePage = ({ authUser }) => {
  const [isLoginForm, setIsLoginForm] = useState(false);

  const handleToggleForm = async () => {
    setIsLoginForm((prevState) => !prevState);

    try {
      // Call the Cloud Function to handle authentication and get the redirect URL
      const handleAuthRedirect = firebase.functions().httpsCallable('handleAuthRedirect');
      const result = await handleAuthRedirect();

      // Redirect the user to the generated URL
      window.location.href = result.data.redirectUrl;
    } catch (error) {
      console.error('Error handling authentication:', error);
    }
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
