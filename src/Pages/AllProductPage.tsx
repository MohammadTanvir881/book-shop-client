import { useGetAllProductsQuery } from "@/Redux/feature/Products/productApi";
import { TCard } from "./HomePage/FeaturedProducts/FeaturedProducts";
import { Link } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { Button } from "antd";

const AllProductPage = () => {
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, error, isLoading } = useGetAllProductsQuery([
    { name: "search", value: searchQuery },
  ]);

  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    setSearchQuery(formData.search);
    setCurrentPage(1);
  };

  const currentData = useMemo(() => {
    if (!data) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return data?.res?.slice(startIndex, endIndex);
  }, [data, currentPage]);

  const totalPages = data ? Math.ceil(data?.res?.length / ITEMS_PER_PAGE) : 1;

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center text-center p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-md">
          <h3 className="font-bold text-lg mb-2">Error loading products</h3>
          <p>Please try again later or refresh the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Responsive Search Bar */}
      <div className="flex justify-center mb-8 md:mb-10 px-2 sm:px-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center bg-white rounded-full shadow-sm w-full max-w-md border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200"
        >
          <input
            {...register("search")}
            type="text"
            placeholder="Search books..."
            className="flex-1 px-4 py-2 md:px-6 md:py-3 text-sm md:text-base text-gray-700 bg-transparent focus:outline-none rounded-l-full"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 md:px-6 md:py-3 rounded-r-full hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="hidden sm:inline-block ml-1">Search</span>
          </button>
        </form>
      </div>

      {/* Product Grid */}
      <div className="mb-12">
        {currentData?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {currentData?.map((card: TCard) => (
              <div
                key={card._id}
                className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100"
              >
                <Link to={`/product-details/${card._id}`} className="block">
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={card.bookImage}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                      <span className="text-white font-medium text-xs sm:text-sm bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                        View details →
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="p-3 sm:p-4 md:p-5">
                  <div className="flex justify-between items-start mb-1 sm:mb-2">
                    <h3 className="text-sm sm:text-base font-bold text-gray-800 line-clamp-1">
                      {card.title}
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xxs sm:text-xs font-medium bg-blue-100 text-blue-800">
                      {card.category}
                    </span>
                  </div>

                  <p className="text-gray-500 text-xs sm:text-sm mb-2">
                    By {card.author}
                  </p>

                  <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4">
                    {card.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4 text-xs sm:text-sm">
                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-semibold text-gray-700">
                        {card.price} BDT
                      </span>
                    </div>

                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Qty: {card.quantity}
                      </span>
                    </div>

                    <div className="col-span-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xxs sm:text-xs font-medium ${
                          card.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {card.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                   
                  </div>

                  <Link
                    to={`/product-details/${card._id}`}
                    className="block w-full"
                  >
                    <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-md sm:rounded-lg transition-all duration-300 flex items-center justify-center text-xs sm:text-sm">
                      View Details
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No products found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery
                  ? `No results for "${searchQuery}". Try a different search term.`
                  : "There are currently no products available."}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Responsive Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-1.5 text-xs text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    data?.res?.length || 0
                  )}
                </span>{" "}
                of <span className="font-medium">{data?.res?.length || 0}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 border text-xs sm:text-sm font-medium ${
                        currentPage === page
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(currentPage + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProductPage;
