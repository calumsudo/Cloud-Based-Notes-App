import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import WelcomePage from "../../screens/WelcomePage";
import HomePage from "../../screens/HomePage";

const getAuthUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
      unsubscribe();
    });
  });
};

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const fetchAuthUser = async () => {
      const user = await getAuthUser();
      setAuthUser(user);
    };

    fetchAuthUser();
  }, []);

console.log(authUser)
  
  return (
    <>
    <div>{authUser ? <p>Signed in</p> : <p>SignedOut</p>}</div>
    {/* <WelcomePage/>  */}
    {/* <HomePage authUser = {authUser} /> */}
    <div> {authUser ? <HomePage authUser={authUser}/> : <WelcomePage authUser={authUser}/> } </div>
    </>
  );
};

export default AuthDetails;
