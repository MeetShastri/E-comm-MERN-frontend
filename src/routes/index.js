import { createBrowserRouter } from "react-router-dom";

import App from "../App";  
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login  />
            },
            {
                path: "forgotpassword",
                element: <ForgotPassword />
            },
            {
                path: "signup",
                element: <SignUp />
            },
            {
                path: "productcategory/:categoryName",
                element: <CategoryProduct />
            },
            {
                path: "adminpanel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "allusers",
                        element: <AllUsers />
                    },
                    {
                        path: "allproducts",
                        element: <AllProducts />
                    }
                ]
            },
        ],
    },
]);

export default router