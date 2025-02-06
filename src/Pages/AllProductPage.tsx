import { useGetAllProductsQuery } from "@/Redux/feature/Products/productApi";
import { TCard } from "./HomePage/FeaturedProducts/FeaturedProducts";
import { Link } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMemo, useState } from "react";

const AllProductPage = () => {
  const ITEMS_PER_PAGE = 8; // Items per page
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch all products without pagination
  const { data, error, isLoading } = useGetAllProductsQuery([
    { name: "search", value: searchQuery },
  ]);

  console.log("Data from API:", data);
  console.log("Error:", error);
  console.log("Is Loading:", isLoading);

  // React Hook Form Setup
  const { register, handleSubmit } = useForm();

  // Handle form submission for search
  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    setSearchQuery(formData.search);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle pagination manually: calculate start and end indices for current page
  const currentData = useMemo(() => {
    if (!data) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return data?.res?.slice(startIndex, endIndex);
  }, [data, currentPage]);

  // Calculate total pages based on the total number of items
  const totalPages = data ? Math.ceil(data?.res?.length / ITEMS_PER_PAGE) : 1;

  // Loading state
  if (isLoading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>;
      </div>
    );
  }

  // Error handling state
  if (error) {
    return <div>Error loading products!</div>;
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="flex justify-center my-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center bg-white shadow-md rounded-lg p-2 w-80"
        >
          <input
            {...register("search")}
            type="text"
            placeholder="Search..."
            className="flex-1 px-4 py-2 text-gray-700 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-20 md:gap-10 mx-3 lg:mx-10">
          {currentData?.map((card: TCard) => (
            <div
              key={card._id}
              className="card card-compact bg-base-100  shadow-xl"
            >
              <figure className="h-56">
                <img src={card.bookImage} alt={card.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{card.title}</h2>
                <h4 className="text-xl text-blue-400">
                  Author : {card.author}
                </h4>
                <p className="text-lg">{card.description}</p>
                <p className="text-lg">Category : {card.category}</p>
                <p className="text-lg">
                  Price: <span className="text-red-500">{card.price}</span> BDT
                </p>
                <p className="text-lg">
                  In-Stock: {card.inStock ? "YES" : "NO"}
                </p>
                <p className="text-lg">
                  Quantity Available:{" "}
                  <span className="text-green-500">{card.quantity}</span>
                </p>
                <div className="card-actions justify-end">
                  <Link to={`/product-details/${card._id}`}>
                    <button className="btn bg-green-500 text-white hover:bg-green-400">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center my-5 space-x-4">
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-200 rounded-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProductPage;
