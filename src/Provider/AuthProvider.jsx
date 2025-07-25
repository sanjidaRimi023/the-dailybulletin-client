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
import useAxios from "../Hooks/useAxios";
import { AuthContext } from "../Context/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
    setLoading(true);
    localStorage.removeItem("token");
    return signOut(auth);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };
  // লোকাল ইউজার স্টেট আপডেট করার জন্য
  const updateUser = (updatedData) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedData }));
  };

  // নতুন এবং নিরাপদ পাসওয়ার্ড পরিবর্তনের ফাংশন
  const updateUserPassword = async (currentPassword, newPassword) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("No user is currently signed in.");
    }
    // Reauthentication-এর জন্য credential তৈরি করা
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );

    // প্রথমে ব্যবহারকারীকে reauthenticate করা
    await reauthenticateWithCredential(currentUser, credential);

    // সফলভাবে reauthenticate হলে পাসওয়ার্ড আপডেট করা
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
          const res = await axiosInstance.post("/jwt", {
            email: currentUser.email,
          });
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
          }
        } catch (error) {
          console.error("JWT Token fetch error:", error);
        }

        try {
          const { data: dbUser } = await axiosInstance.get(
            `/users/${currentUser.email}`
          );

          let isUserPremium = false;
          if (dbUser && dbUser.premiumExpiresAt) {
            const expiryDate = new Date(dbUser.premiumExpiresAt);
            if (expiryDate > new Date()) {
              isUserPremium = true;
            }
          }

          setUser({
            ...currentUser,
            ...dbUser,
            isPremium: isUserPremium,
          });
        } catch (error) {
          console.error("DB user data fetch error:", error);
          setUser({ ...currentUser, isPremium: false });
        }
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [axiosInstance]);

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
