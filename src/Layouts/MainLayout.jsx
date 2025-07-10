import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Shared/Navbar';
import Footer from '../Components/Shared/Footer';

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto min-h-[calc(100vh-426px)]">
                <Outlet />
            </div>
            <Footer/>
        </>
    );
};

export default MainLayout;