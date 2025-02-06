import Navbar from "@/Navbar/Navbar";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/Redux/feature/Products/productApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { TCard } from "./HomePage/FeaturedProducts/FeaturedProducts";

// Define the type for form fields
type BookFormFields = {
  title: string;
  author: string;
  file: FileList;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
};

const UpdateBooks = () => {
  const { id } = useParams();
  console.log(id);
  const { data: product, isLoading } = useGetSingleProductQuery(id);

  if (isLoading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>;
      </div>
    );
  }

  const productDetails: TCard = product?.res[0];
  console.log(productDetails);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormFields>(); // Using defined type

  const [updateProduct] = useUpdateProductMutation();

  const onSubmit: SubmitHandler<BookFormFields> = async (data) => {
    // const loadingToast = toast.loading("Creating...", { duration: 2000 });
    const toastId = toast.loading("Updating Product");
    console.log("filedata", data);
    try {
      const response = await updateProduct({
        productId: id,
        updatedData: {
          title: data.title,
          author: data.author,
          description: data.description,
          inStock: data.inStock,
          category: data.category,
          price: Number(data.price),
          quantity: Number(data.quantity),
        },
      }).unwrap();

      toast.success("Product updated successfully!");
      console.log("Updated response:", response);
      toast.success("Product Updated Successfully");
      toast.dismiss(toastId);
      navigate(-1);
    } catch (error) {
      toast.error("Failed to update product.");
      console.error("Update error:", error);
    }
  };
  return (
    <div className="container mx-auto">
      <Navbar></Navbar>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Update Books</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              defaultValue={productDetails?.title}
              {...register("title", { required: "Title is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Author */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              defaultValue={productDetails?.author}
              {...register("author", { required: "Author is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              defaultValue={productDetails?.price}
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be a positive number" },
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              defaultValue={productDetails?.category}
              {...register("category", { required: "Category is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              defaultValue={productDetails?.description}
              {...register("description", {
                required: "Description is required",
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              defaultValue={productDetails?.quantity}
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: 1, message: "Quantity must be at least 1" },
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>

          {/* In Stock */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              In Stock
            </label>
            <select
              {...register("inStock", {
                required: "In Stock status is required",
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.inStock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.inStock.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBooks;
