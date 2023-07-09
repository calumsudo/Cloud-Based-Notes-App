import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user){
                setAuthUser(user);
            }
            else {
                setAuthUser(null);
            }
        })
        return () => {
            listen();
        }
    }, [])

    console.log(authUser);
  return (
    <div>{ authUser ? <p>Signed in</p> : <p>SignedOut</p>}</div>
  )
}

export default AuthDetails