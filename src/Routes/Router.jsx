import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
// import SubscriptionPage from "../Pages/Subscription.jsx/SubscriptionPage";
import DashboardLayout from "../Layouts/dashboard-layout";
import UserOverView from "../Pages/Dashboard/User/use-over-view";
import AboutUs from "../Pages/about-us";
import AddArticle from "../Pages/AddArticle";
import UserArticle from "../Pages/Dashboard/User/userArticle";
import ManageArticle from "../Pages/Dashboard/User/manage-article";
import AllArticle from "../Pages/all-article";
import ArticleDetail from "../Pages/ArticleDetail";
// import PamentPage from "../Pages/Subscription.jsx/PamentPage";


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
                path: '/all-article',
                element: <AllArticle/>
            },
            {
                path: '/article-detail/:id',
                element: <ArticleDetail/>
            },
            // {
            //     path: '/subscription',
            //     element: <SubscriptionPage />
            // },
            // {
            //     path: '/payment',
            //     element: <PamentPage/>
            // },
            


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
