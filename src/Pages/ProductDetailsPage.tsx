import Navbar from "@/Navbar/Navbar";
import { useGetSingleProductQuery } from "@/Redux/feature/Products/productApi";
import { Link, useParams } from "react-router-dom";
import { TCard } from "./HomePage/FeaturedProducts/FeaturedProducts";
import Footer from "./Footer/Footer";
import { FaArrowLeft, FaShoppingCart, FaHome, FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleProductQuery(id);

  const product = data?.res;

  if (isLoading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  // Function to render rating stars
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-3 px-5 border-b">
        <div className="container mx-auto flex items-center text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600 flex items-center">
            <FaHome className="mr-1" /> Home
          </Link>
          <IoIosArrowForward className="mx-2" />
          <Link to="/all-product" className="hover:text-blue-600">Products</Link>
          <IoIosArrowForward className="mx-2" />
          <span className="text-gray-400">Details</span>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-5 py-8">
        {product?.map((p: TCard) => (
          <div key={p._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Book Image Section */}
              <div className="w-full lg:w-2/5 p-6 flex justify-center bg-gray-50">
                <div className="relative w-full h-96 lg:h-auto max-w-md">
                  <img
                    className="w-full h-full object-contain rounded-lg shadow-md"
                    src={p.bookImage}
                    alt={p.title}
                  />
                  {p.inStock ? (
                    <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      In Stock
                    </span>
                  ) : (
                    <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Book Details Section */}
              <div className="w-full lg:w-3/5 p-8">
                <div className="mb-6">
                  <Link to="/all-product" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
                    <FaArrowLeft className="mr-2" /> Back to Products
                  </Link>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{p.title}</h1>
                  <p className="text-lg text-gray-600 mb-4">by {p.author}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex mr-3">
                      {renderRatingStars(p.rating || 4.5)}
                    </div>
                    <span className="text-gray-500 text-sm">(24 reviews)</span>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl font-bold text-gray-900 mr-4">৳{p.price}</span>
                    {p.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">৳{p.originalPrice}</span>
                    )}
                    {p.originalPrice && (
                      <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                        {Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>

                  <p className="text-gray-700 mb-6">{p.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="block text-gray-500 text-sm">Category</span>
                      <span className="font-medium text-green-600">{p.category}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Availability</span>
                      <span className={`font-medium ${p.inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {p.inStock ? `${p.quantity} in stock` : 'Out of stock'}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Publisher</span>
                      <span className="font-medium">{p.publisher || 'Unknown'}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Pages</span>
                      <span className="font-medium">{p.totalPages || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/" className="flex-1">
                    <button className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-300">
                      <FaHome className="mr-2" /> Return Home
                    </button>
                  </Link>
                  
                  <Link to={`/check-out/${p._id}`} className="flex-1">
                    <button 
                      disabled={!p.inStock}
                      className={`w-full flex items-center justify-center px-6 py-3 rounded-md text-white transition duration-300 ${p.inStock ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                      <FaShoppingCart className="mr-2" /> {p.inStock ? 'Buy Now' : 'Out of Stock'}
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="border-t border-gray-200 px-8 py-6">
              <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Product Details</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>ISBN: {p.isbn || 'N/A'}</li>
                    <li>Language: English</li>
                    <li>Publication Date: {p.publicationDate || 'N/A'}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Shipping Info</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>Free shipping on orders over ৳500</li>
                    <li>Delivery within 3-5 business days</li>
                    <li>Cash on delivery available</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;