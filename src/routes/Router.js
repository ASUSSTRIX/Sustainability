import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import DashBoard from "../pages/Supplier/DashBoard";
import Reporting from "../pages/Supplier/Reporting";
import Goal from "../pages/Supplier/Goals/Goal";
import Goalspillar from "../pages/Supplier/Goals/Goalspillar";
import Goals from "../pages/Supplier/Goals/Goals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/goals", element: <Goalspillar /> },
      { path: "/reporting", element: <Reporting /> },
      { path: "/dashboard", element: <DashBoard /> },
    ]
  },
  {
    path:"goal",
    element:<Goals/>
  }
]);

export default router;
