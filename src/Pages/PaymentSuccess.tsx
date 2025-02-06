import Navbar from "@/Navbar/Navbar";
import { Link } from "react-router-dom";
import Footer from "./Footer/Footer";

const PaymentSuccess = () => {
  return (
    <div>
      <div className="container mx-auto">
      <Navbar></Navbar>
      <div>
        <h1 className="flex gap-2 justify-center text-xl lg:text-4xl">
          Congratulations . Your Payment Is{" "}
          <span className="text-green-500 "> SuccessFull</span>
        </h1>
        <div className="flex justify-center">
         <Link to="/"> <button className="btn bg-green-400 text-white my-5">Back Home</button></Link>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default PaymentSuccess;
