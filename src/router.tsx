import { createBrowserRouter } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import HomePage from "./Pages/HomePage/HomePage";
import AllProductPage from "./Pages/AllProductPage";
import AboutPage from "./Pages/AboutPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import DashBoard from "./Pages/DashBoard/DashBoard";
import RoutesGenerator from "./Pages/DashBoard/RoutesGenerator";
import { adminPaths } from "./Pages/DashBoard/admin.routes";
import UpdateBooks from "./Pages/UpdateBooks";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage></MainPage>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "all-product",
        element: <AllProductPage></AllProductPage>,
      },
      {
        path: "about",
        element: <AboutPage></AboutPage>,
      },
    ],
  },
  {
    path: "/dash-board",
    element: <DashBoard></DashBoard>,
    children: RoutesGenerator(adminPaths),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/product-details/:id",
    element: <ProductDetailsPage></ProductDetailsPage>,
  },
  {
    path: "/product-update/:id",
    element: <UpdateBooks></UpdateBooks>,
  },
  {
    path: "/registration",
    element: <RegistrationPage></RegistrationPage>,
  },
]);
