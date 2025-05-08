const AboutSection = () => {
  return (
    <div className="bg-gray-100">
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              What our customers are saying
            </h1>
            <div className="w-20 h-1 bg-green-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="relative p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="absolute top-0 left-0 w-8 h-8 text-green-500 opacity-20"
                >
                  <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                  <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                </svg>
                <p className="text-gray-600 italic mb-6">
                  "Absolutely love this product! The quality exceeded my expectations, and the customer service was fantastic. Will definitely be purchasing again!"
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                    alt="Emily R." 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">Emily R.</p>
                    <p className="text-green-500 text-sm">Verified Buyer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="relative p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="absolute top-0 left-0 w-8 h-8 text-green-500 opacity-20"
                >
                  <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                  <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                </svg>
                <p className="text-gray-600 italic mb-6">
                  "Fast delivery and great packaging! The product is exactly as described, and I couldn't be happier with my purchase. Highly recommend!"
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                    alt="James L." 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">James L.</p>
                    <p className="text-green-500 text-sm">Verified Buyer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 - Added new testimonial */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="relative p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="absolute top-0 left-0 w-8 h-8 text-green-500 opacity-20"
                >
                  <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                  <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                </svg>
                <p className="text-gray-600 italic mb-6">
                  "The attention to detail is incredible. Every aspect of the service was perfect, from ordering to delivery. 5 stars!"
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                    alt="Sarah K." 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">Sarah K.</p>
                    <p className="text-green-500 text-sm">Repeat Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-green-500 text-white p-6 rounded-lg">
              <p className="text-3xl font-bold">98%</p>
              <p className="text-sm">Customer Satisfaction</p>
            </div>
            <div className="bg-green-600 text-white p-6 rounded-lg">
              <p className="text-3xl font-bold">10K+</p>
              <p className="text-sm">Happy Customers</p>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-lg">
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-sm">Support Available</p>
            </div>
            <div className="bg-green-600 text-white p-6 rounded-lg">
              <p className="text-3xl font-bold">5★</p>
              <p className="text-sm">Average Rating</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
