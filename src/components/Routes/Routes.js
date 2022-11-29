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
import PrivateRoute from "./PrivateRoute";

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
                element: <CategoryCollections></CategoryCollections>,
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
                element: <AllUsers></AllUsers>
            },

            {
                path: '/dashboard/allbuyers',
                element: <AllBuyers></AllBuyers>,
                loader: () => fetch('http://localhost:5000/users/allbuyers')
            },
            {
                path: '/dashboard/allsellers',
                element: <AllSellers></AllSellers>,
                // loader: () => fetch('http://localhost:5000/users/allsellers')
            },
            {
                path: '/dashboard/addproducts',
                element: <AddProducts></AddProducts>
            },
            {
                path: '/dashboard/myproducts',
                element: <MyProducts></MyProducts>
            },
            {
                path: '/dashboard/myorders',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/reported',
                element: <ReportedProducts></ReportedProducts>
            }
        ]
    }
])

export default router