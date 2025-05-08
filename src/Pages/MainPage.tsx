import Navbar from "@/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";

const MainPage = () => {
  return (
    <div>
      <div className="container mx-auto px-2 relative">
        <div className="sticky top-0 z-50">
          {" "}
          <Navbar></Navbar>
        </div>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainPage;
