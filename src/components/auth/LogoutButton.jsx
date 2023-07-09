import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase';

const LogoutButton = () => {
  const history = useHistory();

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        // Logout successful
        console.log('User logged out');
        history.push('/'); // Redirect to the welcome page
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
