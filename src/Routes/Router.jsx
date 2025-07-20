import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import SubscriptionPage from "../Pages/Subscription/SubscriptionPage";
import DashboardLayout from "../Layouts/dashboard-layout";
import UserOverView from "../Pages/Dashboard/User/use-over-view";
import AboutUs from "../Pages/about-us";
import AddArticle from "../Pages/AddArticle";
import UserArticle from "../Pages/Dashboard/User/userArticle";
import ManageArticle from "../Pages/Dashboard/User/manage-article";
import AllArticle from "../Pages/all-article";
import ArticleDetail from "../Pages/ArticleDetail";
import AddPublisher from "../Pages/Dashboard/Admin/AddPublisher";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import AdminOverview from "../Pages/Dashboard/Admin/AdminOverview";
import ManageAllArticles from "../Pages/Dashboard/Admin/ManageAllArticles";
import ManagePublisher from "../Pages/Dashboard/Admin/ManagePublisher";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/add-article",
        element: <AddArticle />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/all-article",
        element: <AllArticle />,
      },
      {
        path: "/article-detail/:id",
        element: <ArticleDetail />,
      },
      {
        path: "/subscription",
        element: <SubscriptionPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "user",
        element: <UserOverView />,
      },
      {
        path: "user/my-article",
        element: <UserArticle />,
      },
      {
        path: "user/manage-article",
        element: <ManageArticle />,
      },
      //   admin
      {
        path: "/dashboard/admin",
        element: <AdminOverview />,
      },
      {
        path: "/dashboard/admin/manage-users",
        element: <ManageUsers />,
      },
      {
        path: "/dashboard/admin/manage-articles",
        element: <ManageAllArticles />,
      },
      {
        path: "/dashboard/admin/add-publisher",
        element: <AddPublisher />,
      },
        {
          path: "/dashboard/admin/manage-publisher",
          element: <ManagePublisher/>
      },
    ],
  },
]);
export default router;
