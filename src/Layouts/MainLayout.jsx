import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Shared/Navbar';
import Footer from '../Components/Shared/Footer';

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer/>
        </>
    );
};

export default MainLayout;