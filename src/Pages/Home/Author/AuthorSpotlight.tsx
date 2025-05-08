import { Link } from "react-router-dom";

const AuthorSpotlight = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Author Spotlight
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 rounded-lg p-8 shadow-md">
          {/* Author Image */}
          <div className="md:w-1/3 w-full">
            <img
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
              alt="Author"
              className="w-full rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Author Details */}
          <div className="md:w-2/3 w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Featured Author: John Green
            </h3>
            <p className="text-green-500 font-medium mb-4">
              Bestselling author of "The Fault in Our Stars" and "Looking for
              Alaska"
            </p>
            <p className="text-gray-700 mb-6">
              "John Green's novels have captivated millions of readers worldwide
              with their poignant storytelling and authentic characters. His
              latest work, 'Turtles All the Way Down,' explores themes of mental
              health with his signature blend of humor and heart."
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to={"/all-product"} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                View Books
              </Link>
              <a
                href="#"
                className="px-4 py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-50 transition"
              >
                Read Biography
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorSpotlight;
