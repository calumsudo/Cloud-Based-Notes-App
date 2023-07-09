import React, { useState } from 'react';
import LogoutButton from '../components/auth/LogoutButton';

const HomePage = ({authUser}) => {
  const [userDisplayName] = authUser? [`${authUser?.displayName}`]: [''];
  
  console.log(userDisplayName);

  
  return (
    <div>
      <h2>Welcome {userDisplayName}</h2> {/* Access the authenticated user's display name */}
      {/* Add content for the home page */}
      <LogoutButton />
    </div>
  );
};

export default HomePage;
