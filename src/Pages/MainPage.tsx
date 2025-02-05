import Navbar from "@/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";

const MainPage = () => {
  return (
    <div>
      <div className="container mx-auto px-2">
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainPage;
