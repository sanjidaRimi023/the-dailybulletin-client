import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import SubscriptionPage from "../Pages/Subscription/SubscriptionPage";
import DashboardLayout from "../Layouts/dashboard-layout";
import AboutUs from "../Pages/about-us";
import UserArticle from "../Pages/Dashboard/User/UserArticle";
import ManageArticle from "../Pages/Dashboard/User/manage-article";
import AllArticle from "../Pages/all-article";
import ArticleDetail from "../Pages/ArticleDetail";
import AddPublisher from "../Pages/Dashboard/Admin/AddPublisher";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import AdminOverview from "../Pages/Dashboard/Admin/AdminOverview";
import ManageAllArticles from "../Pages/Dashboard/Admin/ManageAllArticles";
import ManagePublisher from "../Pages/Dashboard/Admin/ManagePublisher";
import UserOverView from "../Pages/Dashboard/User/UserOverView";
import UserProfile from "../Pages/Dashboard/User/UserProfile";
import ForbiddenPage from "../Pages/ForbiddenPage";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import AddArticle from "../Pages/Dashboard/User/AddArticle";
import TermsCondition from "../Components/Ui/TermsCondition";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/terms-condition",
        element: <TermsCondition/>,
      },
      {
        path: "/all-article",
        element: <PrivateRoute>
          <AllArticle />
        </PrivateRoute>,
      },
      {
        path: "/article-detail/:id",
        element: <PrivateRoute>
          <ArticleDetail />
        </PrivateRoute>,
      },
      {
        path: "/forbidden-page",
        element: <ForbiddenPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "user",
        element: <PrivateRoute>
          <UserOverView />
        </PrivateRoute>,
      },
      {
        path: "user/my-article",
        element: <PrivateRoute>
          <UserArticle />
        </PrivateRoute>,
      },
      {
        path: "user/manage-article",
        element: <PrivateRoute>
           <ManageArticle />
        </PrivateRoute>,
      },
      {
        path: "user/add-article",
        element: <PrivateRoute>
          <AddArticle />
        </PrivateRoute>,
      },
      {
        path: "user/profile",
        element: <PrivateRoute>
          <UserProfile />
        </PrivateRoute>,
      },
      {
        path: "user/subscription",
        element: <PrivateRoute>
          <SubscriptionPage />
        </PrivateRoute>,
      },
      //   admin
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminOverview />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-articles",
        element: (
          <AdminRoute>
            <ManageAllArticles />
          </AdminRoute>
        ),
      },
      {
        path: "admin/add-publisher",
        element: (
          <AdminRoute>
            <AddPublisher />
          </AdminRoute>
        ),
      },
      
      {
        path: "/dashboard/admin/manage-publisher",
        element: (
          <AdminRoute>
            <ManagePublisher />
          </AdminRoute>
        ),
      },
    ],

  },
  {
    path: "*",
    element: <ErrorPage/>
  }
]);
export default router;
