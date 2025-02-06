import Navbar from "@/Navbar/Navbar";
import { useGetSingleProductQuery } from "@/Redux/feature/Products/productApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TCard } from "./HomePage/FeaturedProducts/FeaturedProducts";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "@/Redux/feature/hook";
import { useCurrentUser } from "@/Redux/feature/Auth/authSlice";
import { useAddOrderMutation } from "@/Redux/feature/Order/OrderApi";
import Footer from "./Footer/Footer";

const CheckOutPage = () => {
  const { id } = useParams();
  const user = useAppSelector(useCurrentUser);
  const navigate = useNavigate();
  const [addOrder] = useAddOrderMutation();
  //   console.log("current user", user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data, isLoading } = useGetSingleProductQuery(id);
  const product = data?.res;
  // if (isLoading) {
  //   return (
  //     <div className="h-[100vh] flex justify-center items-center">
  //       <span className="loading loading-ring loading-lg"></span>;
  //     </div>
  //   );
  // }
  //   console.log(product);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    // Handle form submission here
    const checkOutData = {
      email: user?.userEmail,
      product: product[0]?._id,
      quantity: Number(data.quantity),
      totalPrice: product[0]?.price * Number(data.quantity),
      address: data.address,
      phone: Number(data.phone),
    };
    console.log(checkOutData);
    const res = await addOrder(checkOutData)
      .unwrap()
      .then((result: any) => {
        window.location.replace(result.url);

        console.log(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <div className="container mx-auto">
        <Navbar></Navbar>
        {/* checkOut information */}
        <div className="flex flex-col md:flex-col lg:flex-col gap-2">
          {/* Product Information */}
          <div>
            {product?.map((p: TCard) => (
              <div
                key={p._id}
                className="flex flex-1 my-5 flex-col md:flex-row justify-center px-10 md:h-[350px] gap-10 border-2 rounded-xl p-5"
              >
                {/* book img part */}
                <div className=" w-full md:w-1/4">
                  <img
                    className="h-[100%] w-[100%]  rounded-xl "
                    src={p.bookImage}
                    alt=""
                  />
                </div>

                {/* book details part */}
                <div className="w-full md:w-3/4">
                  <h1 className="text-2xl md:text-3xl font-bold">{p.title}</h1>
                  <p className="font-medium text-lg my-2 pb-3 border-b border-solid">
                    by {p.author}
                  </p>

                  <div>
                    <p className="md:flex space-y-3 md:space-y-0 gap-2 my-3 items-center  pb-2    ">
                      <h1 className="text-sm md:text-xl font-bold">
                        Description : {p.description}
                      </h1>
                      <div className="flex flex-col  md:flex-row gap-3 md:gap-3 md:items-center">
                        <p className="text-sm md:text-xl font-medium flex items-center gap-1  md:gap-3">
                          <span></span> Category :{" "}
                          <span className="text-green-500">{p.category}</span>{" "}
                        </p>
                      </div>
                    </p>

                    <div>
                      {/* <p className="flex gap-3 items-center text-lg font-medium border-b-2 border-solid pb-4"> <span><HiOutlineUsers /></span>Publisher : <span>{publisher} </span> <span><MdOutlineContactPage /></span> Page :<span>{totalPages}</span> <span>Rating : {rating}</span></p> */}
                      <div className="flex flex-col md:flex-row gap-2 md:items-center justify-start border-b-2 border-solid pb-2">
                        <p className="text-sm md:text-lg font-medium flex gap-1 md:gap-2 items-center">
                          {" "}
                          <span></span>
                          Price :{" "}
                          <span className="text-red-500">{p.price} BDT </span>
                        </p>
                        <p className="text-sm md:text-lg font-medium flex gap-2 items-center">
                          {" "}
                          <span></span> Quantity Available :
                          <span className="text-green-500">
                            {p.quantity} Piece{" "}
                          </span>
                        </p>
                        <p className="text-sm md:text-lg font-medium flex gap-2 items-center">
                          {" "}
                          <span></span> In-Stock :
                          <span
                            className={
                              p.inStock ? "text-green-500" : "text-red-500"
                            }
                          >
                            {p.inStock ? "Available" : "Not Available"}{" "}
                          </span>
                        </p>
                        {/* <p className="text-lg font-medium flex gap-2 items-center"> <span>Rating : {rating}</span></p> */}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-3 mt-4 ">
                    <Link to="/">
                      {" "}
                      <button className="btn w-full btn-outline px-5 text-blue-500 bg-blue-50">
                        Return Home
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* form Information */}
          <div className="flex-1">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg"
            >
              {/* Address */}
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Present-Address
                </label>
                <input
                  type="text"
                  id="address"
                  {...register("address", {
                    required: "Address is required",
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.address && (
                  <span className="text-red-500 text-sm">
                    {errors.address.message as string}
                  </span>
                )}
              </div>
              {/* Phone Number */}
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone-Number
                </label>
                <input
                  type="number"
                  id="phone"
                  {...register("phone", {
                    required: "Phone Number is required",
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">
                    {errors.phone.message as string}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  {...register("quantity", {
                    required: "Quantity is required",
                    min: 1,
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.quantity && (
                  <span className="text-red-500 text-sm">
                    {errors.quantity.message as string}
                  </span>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default CheckOutPage;
