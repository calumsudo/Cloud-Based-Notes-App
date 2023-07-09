import React, {useState} from "react";
import { auth, provider } from "../../firebase";
import { functions } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./Auth.css";

const LoginForm = ({ onToggleForm, authUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User logged in successfully");

        // Call the handleAuthRedirect Cloud Function
        const handleAuthRedirect = functions.httpsCallable('handleAuthRedirect');
        handleAuthRedirect({ uid: authUser.uid })
          .then((result) => {
            const redirectUrl = result.data.redirectUrl;
            window.location.href = redirectUrl;
          })
          .catch((error) => {
            console.error("Error handling authentication:", error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }
  return (
    <div className='form-box'>
      <form className='form' onSubmit={signIn}>
      <span className="title">Log In</span>
        <span className="subtitle">Glad to have you back!</span>
        <div className="form-container">
        <input 
          type='email' 
          className="input"
          placeholder='Enter your Email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          ></input>
        <input 
          type='password' 
          className="input"
          placeholder='Enter your Password'
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        </div>
        <button type="submit">Log In</button>
      </form>
      <div class="form-section">
      <p>
          Sign up here:{' '}
          <button className="signupbutton" onClick={onToggleForm}>Sign Up</button>
          <button className="button" onClick={signInWithGoogle}>
          <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
          <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
          <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
          <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
          <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
          </svg>
          Continue with Google
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginForm;