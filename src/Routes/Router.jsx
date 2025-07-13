import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AddArticle from "../Pages/AddArticle";
import SubscriptionPage from "../Pages/Subscription.jsx/SubscriptionPage";
import DashboardLayout from "../Layouts/dashboard-layout";
import UserOverView from "../Pages/Dashboard/User/use-over-view";


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
            }
        ]
    }
]);
export default router;
