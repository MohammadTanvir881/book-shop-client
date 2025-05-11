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
import { adminPaths, userPaths } from "./Pages/DashBoard/admin.routes";
import UpdateBooks from "./Pages/UpdateBooks";
import ChangePasswordPage from "./Pages/ChangePasswordPage";
import CheckOutPage from "./Pages/CheckOutPage";
import PaymentSuccess from "./Pages/PaymentSuccess";
import PaymentFailed from "./Pages/PaymentFailed";
import PrivateRoute from "./Pages/DashBoard/PrivateRoute";
import ContactUs from "./Pages/ContactUs/ContactUs";
import CartPage from "./Pages/CartPage/CartPage";
import StaticCartPage from "./Pages/CartPage/CartPage";

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
      {
        path: "contact",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute role={["user", "admin"]}>
            {/* <CartPage></CartPage> */}
            <StaticCartPage></StaticCartPage>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dash-board",
    element: (
      <PrivateRoute role="admin">
        <DashBoard></DashBoard>
      </PrivateRoute>
    ),
    children: RoutesGenerator(adminPaths),
  },
  {
    path: "/dash-board",
    element: (
      <PrivateRoute role="user">
        <DashBoard></DashBoard>
      </PrivateRoute>
    ),
    children: RoutesGenerator(userPaths),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/check-out/:id",
    element: (
      <PrivateRoute role={["user", "admin"]}>
        <CheckOutPage></CheckOutPage>
      </PrivateRoute>
    ),
  },
  {
    path: "/product-details/:id",
    element: <ProductDetailsPage></ProductDetailsPage>,
  },
  {
    path: "/payment/success",
    element: <PaymentSuccess></PaymentSuccess>,
  },
  {
    path: "/payment/fail",
    element: <PaymentFailed></PaymentFailed>,
  },
  {
    path: "/change-password/:id",
    element: (
      <PrivateRoute role="user">
        <ChangePasswordPage></ChangePasswordPage>
      </PrivateRoute>
    ),
  },
  {
    path: "/product-update/:id",
    element: (
      <PrivateRoute role="admin">
        <UpdateBooks></UpdateBooks>
      </PrivateRoute>
    ),
  },
  {
    path: "/registration",
    element: <RegistrationPage></RegistrationPage>,
  },
]);
