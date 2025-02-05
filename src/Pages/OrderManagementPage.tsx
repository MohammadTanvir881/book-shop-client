import {
  useDeleteOrderMutation,
  useGetAllOrderQuery,
  useUpdateOrderMutation,
} from "@/Redux/feature/Order/OrderApi";
import { Result } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";

export type TOrders = {
  _id: string;
  email: string;
  product: string;
  quantity: number;
  totalPrice: number;
  address: string;
  phone: number;
  paidStatus: boolean;
  tranjectionId: string;
  isShipped: boolean;
  updatedAt: string;
  createdAt: string;
};

const ITEMS_PER_PAGE = 10; // Display 10 books per page
const OrderManagementPage = () => {
  const { data, isLoading } = useGetAllOrderQuery(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const totalItems = data?.data?.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  // Paginate data
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data?.data?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if(paginatedData?.length ===0){
    return <p className="flex justify-center text-3xl font-bold">No Order Available Yet</p>
  }


  const handleUpdateOrder = (orderId: string) => {
    Swal.fire({
      title: "Shipped This Product?",
      text: "This product will be shipped",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Shipped",
    }).then((result) => {
      if (result.isConfirmed) {
        updateOrder(orderId)
          .unwrap()
          .then((result) => {
            toast.success("Order Updated Successfully");
          });
        Swal.fire({
          title: "Shipped",
          text: "Product Has been shipped",
          icon: "success",
        });
      }
    });
  };

  const handleDeleteOrder = (orderId: string) => {
    console.log(orderId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrder(orderId)
          .unwrap()
          .then((result) => {
            toast.success("Order deleted Successfully");
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

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
            <th>Actions</th>
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
              <th className="flex flex-col gap-1 md:flex-row lg:flex-row">
                <Link to="">
                  {" "}
                  {product.isShipped ? (
                    <button
                      className="btn btn-ghost btn-xs mx-1 bg-green-400 text-white"
                      disabled
                    >
                      Shipped
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateOrder(product._id)}
                      className="btn btn-ghost btn-xs mx-1 bg-green-400 text-white"
                    >
                      Shipped
                    </button>
                  )}
                </Link>
                <button
                  onClick={() => handleDeleteOrder(product._id)}
                  className="btn btn-ghost btn-xs bg-red-400 text-white"
                >
                  Delete
                </button>
              </th>
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

export default OrderManagementPage;
