import React from 'react';
import { logout } from '../firebase';

const HomePage = ({authUser}) => {
  const [userDisplayName] = authUser? [`${authUser?.displayName}`]: [''];

  return (
    <div>
      <h2>Welcome {userDisplayName}</h2> {/* Access the authenticated user's display name */}

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomePage;

