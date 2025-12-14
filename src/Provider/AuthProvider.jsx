import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import { AuthContext } from "../Context/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  const axiosSecure = useAxiosSecure()

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
    localStorage.removeItem("token");
    return signOut(auth);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const updateUser = (updatedData) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedData }));
  };

  const updateUserPassword = async (currentPassword, newPassword) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("No user is currently signed in.");
    }

    const credential = EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );

    await reauthenticateWithCredential(currentUser, credential);

    await updatePassword(currentUser, newPassword);
  };
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const res = await axiosSecure.post("/jwt", {
            email: currentUser.email,
          });
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
          }
          setUser(
            currentUser
          );
        } catch (error) {
          console.error("JWT Token fetch error:", error);
        }
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [axiosSecure]);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logOutUser,
    googleLogin,
    updateUserProfile,
    updateUser,
    updateUserPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
