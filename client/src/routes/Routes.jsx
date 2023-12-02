import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import OurMenu from "../pages/OurMenu/OurMenu";
import OrderedFood from "../pages/OrderedFood/OrderedFood";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layouts/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItems from "../pages/Dashboard/UpdateItems/UpdateItems";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from './../pages/Dashboard/AdminHome/AdminHome';

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "menu",
        element: <OurMenu />,
      },
      {
        path: "ordered-food/:tabCategory",
        element: <OrderedFood />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // User routes
      {
        path: "userHome",
        element: <UserHome/>
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "payment",
        element: <Payment/>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory/>,
      },

      // Admin routes

      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "addItems",
        element: (
          <AdminRoute>
            <AddItems />
          </AdminRoute>
        ),
      },
      {
        path: "manageItems",
        element: (
          <AdminRoute>
            <ManageItems />
          </AdminRoute>
        ),
      },
      {
        path: "updateItems/:id",
        element: (
          <AdminRoute>
            <UpdateItems />
          </AdminRoute>
        ),
        loader: ({params})=> fetch(`http://localhost:5000/api/v1/food-menu/${params.id}`)
      },
    ],
  },
]);

export default Routes;
