import { useCurrentUser } from "@/Redux/feature/Auth/authSlice";
import { useGetAllOrderQuery } from "@/Redux/feature/Order/OrderApi";
import { useAppSelector } from "@/Redux/feature/hook";
import { TOrders } from "./OrderManagementPage";
import { useState } from "react";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 10; // Display 10 books per page

const MyOrder = () => {
  const { data, isLoading } = useGetAllOrderQuery(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const currentUser = useAppSelector(useCurrentUser);
  console.log(currentUser);
  const products = data?.data;
  console.log(products);

  if (isLoading) {
    return <p>loading...</p>;
  }

  const myOrders = products?.filter(
    (data: TOrders) => data.email === currentUser?.userEmail
  );
  console.log("myOrders", myOrders);

  const totalItems = myOrders?.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  // Paginate data
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = myOrders?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (paginatedData?.length === 0) {
    return (
      <p className="flex justify-center text-3xl font-bold">
        No Order Available Yet
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>ProductID</th>
            <th>Quantity</th>
            <th>Price BDT</th>
            <th>Shipped Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData?.map((product: TOrders) => (
            <tr key={product._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">{product.email}</div>
                  </div>
                </div>
              </td>
              <td>{product.address}</td>
              <td className="font-semibold">{product.phone}</td>
              <td className="font-semibold">{product.product}</td>
              <td className="font-semibold">{product.quantity}</td>
              <td className="font-semibold">{product.totalPrice} BDT</td>
              <td
                className={
                  product.isShipped
                    ? "font-semibold text-green-500"
                    : "font-semibold text-red-500"
                }
              >
                {product.isShipped ? "Shipped" : "Pending"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyOrder;
