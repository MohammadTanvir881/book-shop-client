import { Link } from "react-router-dom";

const genres = [
  {
    name: "Fiction",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
  },
  {
    name: "Mystery",
    image:
      "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    name: "Sci-Fi",
    image:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=1476&q=80",
  },
  {
    name: "Biography",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1473&q=80",
  },
  {
    name: "History",
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
  },
  {
    name: "Children",
    image:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=1476&q=80",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Browse by Genre
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {genres.map((genre) => (
            <div
              key={genre.name}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition h-48"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
              <img
                src={genre.image}
                alt={genre.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
                <h3 className="text-white text-xl font-bold mb-2">
                  {genre.name}
                </h3>
                <Link to={"/all-product"}>
                  {" "}
                  <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition opacity-0 group-hover:opacity-100">
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
