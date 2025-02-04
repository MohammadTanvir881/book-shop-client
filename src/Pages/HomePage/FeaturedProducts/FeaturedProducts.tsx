import { useGetAllProductsQuery } from "@/Redux/feature/Products/productApi";
import { Link } from "react-router-dom";

export type TCard = {
  _id: string;
  author: string;
  bookImage: string;
  category: string;
  description: string;
  inStock: boolean;
  isDeleted: boolean;
  price: number;
  quantity: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

const FeaturedProducts = () => {
  const { data } = useGetAllProductsQuery(undefined);

  const firstSixCards = data?.res?.slice(0, 6);
  console.log(firstSixCards);
  return (
    <div>
      <h1 className="text-center my-10 text-3xl font-semibold">
        This is Featured <span className="text-green-400">Product Section</span>
      </h1>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-20 md:gap-10 mx-auto ">
          {firstSixCards?.map((card : TCard) => (
            <div key={card._id} className="card card-compact bg-base-100  shadow-xl">
              <figure className="h-56">
                <img src={card.bookImage} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{card.title}</h2>
                <p className="text-lg">{card.description}</p>
                <p className="text-lg">
                  Price : <span className="text-red-500">{card.price}</span> BDT
                </p>
                <p className="text-lg">
                  In-Stock :{card.inStock ? " YES" : "NO"}
                </p>
                <p className="text-lg">
                  Quantity Available :{" "}
                  <span className="text-green-500">{card.quantity}</span>
                </p>
                <div className="card-actions justify-end">
                 <Link to={`/product-details/${card._id}`}> <button className="btn bg-green-500 text-white hover:bg-green-400">
                    view Details
                  </button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center my-10">
        <Link to="/all-product">
          <button className="btn bg-gray-800 text-white">View All Products</button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
