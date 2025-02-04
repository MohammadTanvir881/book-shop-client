import { useState } from "react";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/Redux/feature/Products/productApi";
import { TCard } from "./HomePage/FeaturedProducts/FeaturedProducts";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ITEMS_PER_PAGE = 10; // Display 10 books per page

const AllBooks = () => {
  const { data } = useGetAllProductsQuery(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteBooks] = useDeleteProductMutation();

  if (!data || !data.res) {
    return <p>Loading...</p>;
  }

  const totalItems = data.res.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Paginate data
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.res.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDelete = (id: string) => {
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
        console.log("Delete this", id);
        deleteBooks({productId : id});
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
            <th>Books</th>
            <th>Descriptions</th>
            <th>Price BDT</th>
            <th>IN-STOCK</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((product: TCard) => (
            <tr key={product._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={product.bookImage} alt="Book" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{product.title}</div>
                    <div className="text-sm opacity-50">{product.author}</div>
                  </div>
                </div>
              </td>
              <td>{product.description}</td>
              <td className="font-semibold">{product.price}</td>
              <td
                className={
                  product.inStock
                    ? "text-green-500 font-semibold"
                    : "text-red-500 font-semibold"
                }
              >
                {product.inStock ? "YES" : "NO"}
              </td>
              <td className="font-semibold">{product.quantity}</td>
              <th className="flex flex-col gap-1 md:flex-row lg:flex-row">
                <Link to={`/product-update/${product._id}`}>
                  {" "}
                  <button className="btn btn-ghost btn-xs mx-1 bg-green-400 text-white">
                    Update
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
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

export default AllBooks;
