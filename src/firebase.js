// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "notes-app-c5a88.firebaseapp.com",
  projectId: "notes-app-c5a88",
  storageBucket: "notes-app-c5a88.appspot.com",
  messagingSenderId: "61101129422",
  appId: "1:61101129422:web:c16d3019a6edcafcbd5a9f",
  measurementId: "G-07RX2G3R1W"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    // Call the handleAuthRedirect Cloud Function
    const handleAuthRedirect = httpsCallable(functions, 'handleAuthRedirect');
    const result = await handleAuthRedirect();

    // Redirect the user to the generated URL
    window.location.href = result.data.redirectUrl;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
      // Call the handleAuthRedirect Cloud Function
      const handleAuthRedirect = httpsCallable(functions, 'handleAuthRedirect');
      const result = await handleAuthRedirect();
  
      // Redirect the user to the generated URL
      window.location.href = result.data.redirectUrl;
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    await logInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = async() => {
  signOut(auth);
  try{
    const handleLogout = httpsCallable(functions, 'handleLogout');
    const result = await handleLogout();
    // Redirect the user to the generated URL
    window.location.href = result.data.redirectUrl;
  }
  catch(error){
    console.log("Error Msg: ", error);
  }
  
};

const saveNote = async (content, uid, noteId = null) => {
  try {
    const userQuery = query(collection(db, "users"), where("uid", "==", uid));
    const userQuerySnapshot = await getDocs(userQuery);

    if (userQuerySnapshot.empty) {
      console.log("User document not found");
      return;
    }

    const userDoc = userQuerySnapshot.docs[0];
    const notesCollectionRef = collection(userDoc.ref, "notes");

    if (noteId) {
      // Update existing note
      const noteRef = doc(notesCollectionRef, noteId);
      await updateDoc(noteRef, {
        content: content,
        timestamp: new Date().toISOString(),
      });
      console.log("Note updated successfully!");
    } else {
      // Create new note
      await addDoc(notesCollectionRef, {
        content: content,
        timestamp: new Date().toISOString(),
      });
      console.log("Note created successfully!");
    }
    return 1;
  } catch (error) {
    console.log("Failed to save note!", error);
  }
};



const getNotes = async (uid) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("User document not found");
      return [];
    }

    const userDoc = querySnapshot.docs[0];
    const notesCollectionRef = collection(userDoc.ref, "notes");
    const notesQuerySnapshot = await getDocs(notesCollectionRef);

    const notes = notesQuerySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return notes;
  } catch (error) {
    console.log("Failed to retrieve notes!", error);
    return [];
  }
};

const deleteNote = async (noteId, uid) => {
  try {
    const userQuery = query(collection(db, 'users'), where('uid', '==', uid));
    const userQuerySnapshot = await getDocs(userQuery);

    if (userQuerySnapshot.empty) {
      console.log('User document not found');
      return;
    }

    const userDoc = userQuerySnapshot.docs[0];
    const notesCollectionRef = collection(userDoc.ref, 'notes');
    const noteRef = doc(notesCollectionRef, noteId);

    await deleteDoc(noteRef);
    console.log('Note deleted successfully!');
  } catch (error) {
    console.log('Failed to delete note!', error);
  }
};
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  saveNote,
  getNotes,
  deleteNote,
};