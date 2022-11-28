import { createBrowserRouter } from "react-router-dom";
import Payment from "../components/Payment/Payment";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import AddAProduct from "../Pages/AddAProduct";
import AllBuyers from "../Pages/AllBuyers";
import AllUsers from "../Pages/AllUsers";
import Blog from "../Pages/Blog";
import BuyerProduct from "../Pages/BuyerProduct";
import Dashboard from "../Pages/Dashboard";
import Error from "../Pages/Error";
import Home from "../Pages/Home";
import MyProduct from "../Pages/MyProduct";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import ViewProduct from "../Pages/ViewProduct";
import WishList from "../Pages/WishList";
import AdminRoute from "./AdminRoute/AdminRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import SellerRoute from "./SellerRoute/SellerRoute";

const router = createBrowserRouter([
    {
        path: '/', element: <Main></Main>,
        errorElement: <Error></Error>,
        children: [
            {
               path: '/', element: <Home></Home>
            },
            {
               path: '/my-order', element: <PrivateRoute><BuyerProduct></BuyerProduct></PrivateRoute>
            },
            {
               path: '/my-wishlist', element: <PrivateRoute><WishList></WishList></PrivateRoute>
            },
            {
               path: '/category/:id', element: <ViewProduct></ViewProduct>,
               loader: ({params}) => fetch(`http://localhost:5000/mobiles?category=${params.id}`)
            },
            {
               path: '/payments/:id',  
               element: <Payment />,
               loader: ({ params }) => fetch(`http://localhost:5000/bookings/${params.id}`)
           },
            {
               path: '/payments-wish/:id',
               element: <Payment />,
               loader: ({ params }) => fetch(`http://localhost:5000/purchase-wish/${params.id}`)
           },
            {
               path: '/blog', element: <Blog></Blog>
            },
            {
               path: '/sign-in', element: <Signin></Signin>
            },
            {
               path: '/sign-up', element: <Signup></Signup>
            }
        ]
    },
    {
        path: '/dashboard',
        errorElement: <Error></Error>,
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
         {
            path: '/dashboard', element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
         },
         {
            path: '/dashboard/add-a-product', element: <PrivateRoute><SellerRoute><AddAProduct></AddAProduct></SellerRoute></PrivateRoute>
         },
         {
            path: '/dashboard/my-product', element: <PrivateRoute><SellerRoute><MyProduct></MyProduct></SellerRoute></PrivateRoute>
         },
         {
            path: '/dashboard/:role', element: <PrivateRoute><AdminRoute><AllUsers></AllUsers></AdminRoute></PrivateRoute>
         },
         {
            path: '/dashboard/my-buyers', element: <PrivateRoute><SellerRoute><AllBuyers></AllBuyers></SellerRoute></PrivateRoute>,

         },
         
        ]
    }
])

export default router;