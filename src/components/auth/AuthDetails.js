import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export function getAuthUser(){

    return new Promise((resolve, reject) => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user){
                resolve(user);
            }
            else{
                resolve(null);
            }
            listen();
        });
    });
};

