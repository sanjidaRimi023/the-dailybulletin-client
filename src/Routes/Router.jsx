import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import SubscriptionPage from "../Pages/Subscription.jsx/SubscriptionPage";
import DashboardLayout from "../Layouts/dashboard-layout";
import UserOverView from "../Pages/Dashboard/User/use-over-view";
import AboutUs from "../Pages/about-us";
import AddArticle from "../Pages/AddArticle";
import UserArticle from "../Pages/Dashboard/User/userArticle";
import ManageArticle from "../Pages/Dashboard/User/manage-article";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                path: "/",
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/add-article',
                element: <AddArticle />
            },
            {
                path: '/about-us',
                element: <AboutUs />
            },
            {
                path: '/subscription',
                element: <SubscriptionPage />
            },
            {
                path: '/payment',
                element: <SubscriptionPage />
            },


        ]

    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "user",
                element: <UserOverView />
            },
            {
                path: "user/my-article",
                element: <UserArticle/>
            },
            {
                path: "user/manage-article",
                element: <ManageArticle/>
            }
        ]
    }
]);
export default router;
