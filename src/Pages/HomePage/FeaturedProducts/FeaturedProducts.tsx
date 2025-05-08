import { useGetAllProductsQuery } from "@/Redux/feature/Products/productApi";
import { Link } from "react-router-dom";

export type TCard = {
  _id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  bookImage: string;
  inStock: boolean;
  quantity: number;
  category: string;
  description: string;
  publisher?: string;
  totalPages?: number;
  isbn?: string;
  publicationDate?: string;
  rating?: number;
};

const FeaturedProducts = () => {
  const { data, isLoading } = useGetAllProductsQuery(undefined);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">
            Loading featured products...
          </p>
        </div>
      </div>
    );
  }

  const firstSixCards = data?.res?.slice(0, 8);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-green-500 font-semibold mb-2 inline-block">
            Featured Collection
          </span>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Discover Our <span className="text-green-500">Premium</span>{" "}
            Selection
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {firstSixCards?.map((card: TCard) => (
            <div
              key={card._id}
              className="group  rounded-none relative bg-white  shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100"
            >
              {/* Sale Badge */}
              {card.originalPrice && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Save{" "}
                    {Math.round(
                      ((card.originalPrice - card.price) / card.originalPrice) *
                        100
                    )}
                    %
                  </span>
                </div>
              )}

              {/* Image Container */}
              <div className="relative h-52 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={card.bookImage}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content Container */}
              <div className="p-6 relative">
                {/* Category Tag */}
                <span className="absolute -top-4 right-6 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {card.category}
                </span>

                {/* Title and Author */}
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-500">by {card.author}</p>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {card.description}
                </p>

                {/* Price and Stock */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-xl font-bold text-gray-800">
                      {card.price} BDT
                    </span>
                    {card.originalPrice && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        {card.originalPrice} BDT
                      </span>
                    )}
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${
                      card.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {card.inStock
                      ? `${card.quantity} available`
                      : "Out of stock"}
                  </div>
                </div>

                {/* Rating (if available) */}
                {card.rating && (
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(card.rating!)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                      ({card.rating.toFixed(1)})
                    </span>
                  </div>
                )}

                {/* View Details Button */}
                <Link
                  to={`/product-details/${card._id}`}
                  className="block w-full text-center bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/all-product"
            className="inline-flex items-center px-8 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore All Products
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
