import React from 'react';
import PersistentDrawerLeft from "./Test";

const HomePage = ({authUser}) => {
  const [userDisplayName] = authUser? [`${authUser?.displayName}`]: [''];

  return (
    <div>
      <PersistentDrawerLeft user={userDisplayName} uid={authUser?.uid}/>
    </div>
  );
};

export default HomePage;

