import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div>
      <div className="container mx-auto">
        <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-md max-w-md w-full overflow-hidden">
            {/* Header */}
            <div className="bg-green-100 p-6 flex flex-col items-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <FaCheck className="text-white text-3xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                Payment Successful
              </h1>
              <p className="text-green-600 mt-1">
                Thank you for your purchase!
              </p>
              <Link to="/">
                {" "}
                <button className="btn bg-green-500 hover:bg-green-600 text-white my-5">
                  Back Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
