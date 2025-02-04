import Navbar from "@/Navbar/Navbar";
import { useGetSingleProductQuery } from "@/Redux/feature/Products/productApi";
import { Link, useParams } from "react-router-dom";
import { TCard } from "./HomePage/FeaturedProducts/FeaturedProducts";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleProductQuery(id);

  const product = data?.res;
  console.log(product);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div className="container mx-auto px-5">
      <Navbar></Navbar>

      <div>
        {product?.map((p : TCard)=> (
          <div key={p._id} className="flex my-5 flex-col md:flex-row justify-center px-10 md:h-[350px] gap-10 border-2 rounded-xl p-5">
            {/* book img part */}
            <div className=" w-full md:w-1/4">
              <img
                className="h-[100%] w-[100%]  rounded-xl "
                src={p.bookImage}
                alt=""
              />
            </div>

            {/* book details part */}
            <div className="w-full md:w-3/4">
              <h1 className="text-2xl md:text-3xl font-bold">{p.title}</h1>
              <p className="font-medium text-lg my-2 pb-3 border-b border-solid">
                by {p.author}
              </p>

              <div>
                <p className="md:flex space-y-3 md:space-y-0 gap-2 my-3 items-center  pb-2    ">
                  <h1 className="text-sm md:text-xl font-bold">Description : {p.description}</h1>
                  <div className="flex flex-col  md:flex-row gap-3 md:gap-3 md:items-center">
                
                    <p className="text-sm md:text-xl font-medium flex items-center gap-1  md:gap-3">
                      <span>
                    
                      </span>{" "}
                      Category : <span className="text-green-500">{p.category}</span>{" "}
                    </p>
                  </div>
                </p>

                <div>
                  {/* <p className="flex gap-3 items-center text-lg font-medium border-b-2 border-solid pb-4"> <span><HiOutlineUsers /></span>Publisher : <span>{publisher} </span> <span><MdOutlineContactPage /></span> Page :<span>{totalPages}</span> <span>Rating : {rating}</span></p> */}
                  <div className="flex flex-col md:flex-row gap-2 md:items-center justify-start border-b-2 border-solid pb-2">
                    <p className="text-sm md:text-lg font-medium flex gap-1 md:gap-2 items-center">
                      {" "}
                      <span>
                      
                      </span>
                      Price : <span className="text-red-500">{p.price} BDT </span>
                    </p>
                    <p className="text-sm md:text-lg font-medium flex gap-2 items-center">
                      {" "}
                      <span>
                
                      </span>{" "}
                      Quantity Available :<span className="text-green-500">{p.quantity} Piece </span>
                    </p>
                    <p className="text-sm md:text-lg font-medium flex gap-2 items-center">
                      {" "}
                      <span>
                
                      </span>{" "}
                      In-Stock :<span className={p.inStock ? "text-green-500" : "text-red-500"}>{p.inStock ? "Available" : "Not Available"} </span>
                    </p>
                    {/* <p className="text-lg font-medium flex gap-2 items-center"> <span>Rating : {rating}</span></p> */}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3 mt-4 ">
               <Link to="/"> <button className="btn btn-outline px-5 text-blue-500 bg-blue-50">
                  Return Home
                </button></Link>
                
                <button className="btn btn-outline px-5 text-amber-500 bg-amber-50">
                  Buy Now
                </button>
               
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
