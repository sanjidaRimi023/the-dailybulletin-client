import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Shared/Navbar';
import Footer from '../Components/Shared/Footer';
import Toast from '../Components/Shared/Toast';

const MainLayout = () => {
    return (
        <>
            <Toast></Toast>
            <Navbar />
            <div className="container mx-auto min-h-[calc(100vh-426px)]">
                <Outlet />
            </div>
            <Footer/>
        </>
    );
};

export default MainLayout;