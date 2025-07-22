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
import useAxios from "../Hooks/useAxios";
import { toast } from "react-toastify";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();
  const axiosInstance = useAxios();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = () => {
    localStorage.removeItem("token");
    return signOut(auth);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const googleLogin = async () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        axiosInstance.post("/jwt", {
            email: currentUser.email,
          })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
              toast.success(res.data.message || "JWT Created Successfully!");
          });
      } else {
        localStorage.removeItem("token");
      }
    });

    return () => unsubscribe();
  }, [axiosInstance]);

  const authInfo = {
    createUser,
    loginUser,
    logOutUser,
    googleLogin,
    updateUserProfile,
    loading,
    user,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
