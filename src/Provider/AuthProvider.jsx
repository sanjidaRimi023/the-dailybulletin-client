import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import { AuthContext } from "../Context/AuthContext";


const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (CurrentUser) => {
      setUser(CurrentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const googleLogin = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
    return result;
  };

  const authInfo = {
      createUser,
      loginUser,
      logOutUser,
      googleLogin,
      updateUserProfile,
      loading,
      user
  };
  return (
    <AuthContext value={authInfo}>
      {children}
   </AuthContext>
  );
};

export default AuthProvider;
