import { useState, useEffect } from "react";
import Navbar from "@/Navbar/Navbar";
import { useGetSingleProductQuery } from "@/Redux/feature/Products/productApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TCard } from "./HomePage/FeaturedProducts/FeaturedProducts";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "@/Redux/feature/hook";
import { useCurrentUser } from "@/Redux/feature/Auth/authSlice";
import { useAddOrderMutation } from "@/Redux/feature/Order/OrderApi";
import Footer from "./Footer/Footer";
import {
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaShoppingCart,
  FaCheck,
  FaExclamationCircle,
} from "react-icons/fa";
import { BsCreditCard } from "react-icons/bs";
import { MdPayment } from "react-icons/md";

const CheckOutPage = () => {
  const { id } = useParams();
  const user = useAppSelector(useCurrentUser);
  const navigate = useNavigate();
  const [addOrder] = useAddOrderMutation();
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isFormValid, setIsFormValid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
    trigger,
  } = useForm({ mode: "onChange" });

  const quantity = watch("quantity", 1);
  const address = watch("address", "");
  const phone = watch("phone", "");
  const { data, isLoading } = useGetSingleProductQuery(id);
  const product = data?.res;

  // Check if form is valid for current step
  useEffect(() => {
    const checkFormValidity = async () => {
      if (activeStep === 1) {
        await trigger(["address", "phone", "quantity"]);
        setIsFormValid(isValid);
      } else if (activeStep === 2) {
        setIsFormValid(true); // Payment method is always selected by default
      } else if (activeStep === 3) {
        setIsFormValid(true); // Review step doesn't need validation
      }
    };
    
    checkFormValidity();
  }, [activeStep, trigger, isValid, isDirty]);

  if (isLoading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const checkOutData = {
      email: user?.userEmail,
      product: product[0]?._id,
      quantity: Number(data.quantity),
      totalPrice: product[0]?.price * Number(data.quantity),
      address: data.address,
      phone: Number(data.phone),
    };

    const res = await addOrder(checkOutData)
      .unwrap()
      .then((result: any) => {
        window.location.replace(result.url);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const nextStep = async () => {
    if (activeStep === 1) {
      const isValid = await trigger(["address", "phone", "quantity"]);
      if (!isValid) return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => setActiveStep((prev) => prev - 1);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Checkout Progress */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-4xl">
            <div className="flex items-center">
              {/* Step 1 */}
              <div
                className={`flex flex-col items-center ${
                  activeStep >= 1 ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeStep >= 1 ? "bg-indigo-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {activeStep > 1 ? <FaCheck /> : 1}
                </div>
                <span className="mt-2 text-sm font-medium">Shipping</span>
              </div>

              <div
                className={`flex-1 h-1 mx-2 ${
                  activeStep >= 2 ? "bg-indigo-600" : "bg-gray-200"
                }`}
              ></div>

              {/* Step 2 */}
              <div
                className={`flex flex-col items-center ${
                  activeStep >= 2 ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeStep >= 2 ? "bg-indigo-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {activeStep > 2 ? <FaCheck /> : 2}
                </div>
                <span className="mt-2 text-sm font-medium">Payment</span>
              </div>

              <div
                className={`flex-1 h-1 mx-2 ${
                  activeStep >= 3 ? "bg-indigo-600" : "bg-gray-200"
                }`}
              ></div>

              {/* Step 3 */}
              <div
                className={`flex flex-col items-center ${
                  activeStep >= 3 ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeStep >= 3 ? "bg-indigo-600 text-white" : "bg-gray-200"
                  }`}
                >
                  3
                </div>
                <span className="mt-2 text-sm font-medium">Review</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Checkout Form */}
          <div className="lg:w-2/3">
            {activeStep === 1 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-indigo-600" />
                  Shipping Information
                </h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="p-3 bg-gray-100 rounded-md">
                    {user?.userEmail}
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Shipping Address
                  </label>
                  <textarea
                    id="address"
                    placeholder="Enter your shipping address"
                    required
                    {...register("address", {
                      required: "Address is required",
                      minLength: {
                        value: 10,
                        message: "Address should be at least 10 characters",
                      },
                    })}
                    rows={3}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FaExclamationCircle className="mr-1" />
                      {errors.address.message as string}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      +880
                    </span>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="1234567890"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Please enter a valid 10-digit phone number",
                        },
                      })}
                      className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FaExclamationCircle className="mr-1" />
                      {errors.phone.message as string}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={product?.[0]?.quantity || 10}
                    defaultValue="1"
                    {...register("quantity", {
                      required: "Quantity is required",
                      min: {
                        value: 1,
                        message: "Minimum quantity is 1",
                      },
                      max: {
                        value: product?.[0]?.quantity || 10,
                        message: `Maximum available quantity is ${
                          product?.[0]?.quantity || 10
                        }`,
                      },
                    })}
                    className={`mt-1 block w-24 px-3 py-2 border ${
                      errors.quantity ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.quantity && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FaExclamationCircle className="mr-1" />
                      {errors.quantity.message as string}
                    </p>
                  )}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={nextStep}
                    disabled={!isFormValid}
                    className={`px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${
                      isFormValid
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <MdPayment className="mr-2 text-indigo-600" />
                  Payment Method
                </h2>

                <div className="space-y-4 mb-6">
                  <div
                    className={`border rounded-md p-4 cursor-pointer ${
                      paymentMethod === "card"
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                          paymentMethod === "card"
                            ? "border-indigo-500 bg-indigo-500"
                            : "border-gray-400"
                        }`}
                      >
                        {paymentMethod === "card" && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <BsCreditCard className="mr-2 text-gray-600" />
                          <span className="font-medium">Credit/Debit Card</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Pay with Visa, Mastercard, or other credit/debit cards
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border rounded-md p-4 cursor-pointer ${
                      paymentMethod === "cod"
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                          paymentMethod === "cod"
                            ? "border-indigo-500 bg-indigo-500"
                            : "border-gray-400"
                        }`}
                      >
                        {paymentMethod === "cod" && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <FaShoppingCart className="mr-2 text-gray-600" />
                          <span className="font-medium">Cash on Delivery</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Pay when you receive your order
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <button
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <FaCheck className="mr-2 text-indigo-600" />
                  Review Your Order
                </h2>

                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Shipping Information
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700">{user?.userEmail}</p>
                    <p className="text-gray-700">{address}</p>
                    <p className="text-gray-700">+880 {phone}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Payment Method
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center">
                      {paymentMethod === "card" ? (
                        <>
                          <BsCreditCard className="mr-2 text-gray-600" />
                          <span>Credit/Debit Card ending in ****</span>
                        </>
                      ) : (
                        <>
                          <FaShoppingCart className="mr-2 text-gray-600" />
                          <span>Cash on Delivery</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors flex items-center"
                  >
                    <FaLock className="mr-2" />
                    Place Your Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              {product?.map((p: TCard) => (
                <div key={p._id} className="flex mb-4">
                  <div className="w-20 h-20 rounded-md overflow-hidden">
                    <img
                      src={p.bookImage}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-500">by {p.author}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm font-medium">
                        Qty: {quantity || 1}
                      </span>
                      <span className="text-sm font-medium">
                        ৳{(p.price * (quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-medium">
                    ৳{product?.[0]?.price * (quantity || 1)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Shipping</span>
                  <span className="text-sm font-medium">৳60.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Tax</span>
                  <span className="text-sm font-medium">
                    ৳{(product?.[0]?.price * (quantity || 1) * 0.05).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                  <span className="text-base font-medium">Total</span>
                  <span className="text-base font-bold">
                    ৳
                    {(
                      product?.[0]?.price * (quantity || 1) +
                      60 +
                      product?.[0]?.price * (quantity || 1) * 0.05
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              {activeStep === 3 && (
                <div className="mt-6 p-4 bg-green-50 rounded-md">
                  <div className="flex items-center text-green-700">
                    <FaCheck className="mr-2" />
                    <span className="text-sm">
                      Your order qualifies for free shipping
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold mb-4">Need help?</h2>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <FaPhone className="mr-2 text-indigo-600" />
                <span>+880 1234 567890</span>
              </div>
              <p className="text-sm text-gray-500">
                Our customer service is available 24/7 to assist you with any
                questions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckOutPage;