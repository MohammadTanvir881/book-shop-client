import Navbar from "@/Navbar/Navbar";
import { Outlet } from "react-router-dom";


const MainPage = () => {
    return (
        <div className="container mx-auto px-2">
             <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainPage;