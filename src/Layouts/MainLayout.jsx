"use client";
import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";
import Toast from "../Components/Shared/Toast";
import AOS from "aos";
import "aos/dist/aos.css";
import useAuth from "../Hooks/useAuth";
import LoadSpinner from "../Components/Ui/LoadSpinner";

const MainLayout = () => {

  const { loading } = useAuth();

  useEffect(() => {
    AOS.init({
        duration: 1000,
        mirror: true,	
    });
  }, []);

  if (loading) {
    return <LoadSpinner />
    
  }
  return (
    <>
      <Toast></Toast>
      <Navbar />
      <div className="min-h-[calc(100vh-345px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
