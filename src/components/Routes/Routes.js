import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";
import CategoryCollections from "../pages/CategoryCollections/CategoryCollections";
import AddProducts from "../pages/Dashboard/AddProducts";
import AllBuyers from "../pages/Dashboard/AllBuyers";
import AllSellers from "../pages/Dashboard/AllSellers";
import AllUsers from "../pages/Dashboard/AllUsers";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyOrders from "../pages/Dashboard/MyOrders";
import MyProducts from "../pages/Dashboard/MyProducts";
import ReportedProducts from "../pages/Dashboard/ReportedProducts";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>,
            },
            {
                path: '/categories/:id',
                element: <PrivateRoute><CategoryCollections></CategoryCollections></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/categories/${params.id}`)
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },

            {
                path: '/dashboard/allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },

            {
                path: '/dashboard/allbuyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>,
            },
            {
                path: '/dashboard/allsellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>,
            },
            {
                path: '/dashboard/addproducts',
                element: <SellerRoute><AddProducts></AddProducts></SellerRoute>
            },
            {
                path: '/dashboard/myproducts',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/myorders',
                element: <BuyerRoute><MyOrders></MyOrders></BuyerRoute>
            },
            {
                path: '/dashboard/reported',
                element: <AdminRoute><ReportedProducts></ReportedProducts></AdminRoute>
            }
        ]
    }
])

export default router