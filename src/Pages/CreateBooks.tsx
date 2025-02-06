import { useAddProductMutation } from "@/Redux/feature/Products/productApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

// Define the type for form fields
type BookFormFields = {
  title: string;
  author: string;
  file: FileList;
  bookImage: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
};

const BookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormFields>(); // Using defined type


  const [addProduct, error] = useAddProductMutation();
  console.log(error);

  const onSubmit: SubmitHandler<BookFormFields> = async (data) => {
    const loadingToast = toast.loading("Creating...", { duration: 2000 });
    console.log(data.file);
    // Check if file is selected
    if (!data.file || data.file.length === 0) {
      console.error("File is required");
      return; // Exit if file is not selected
    }
    console.log(data);

    const file = data.file[0];
    if (!file) {
      return;
    }
    console.log(file);

    const formData = new FormData();
    formData.append("file", file); // Append the file
    formData.append("upload_preset", "tanvir-rashid"); // Use your upload preset

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_NAME
        }/image/upload`, // Replace with your Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudinaryData = await response.json();
      if (!cloudinaryData.secure_url) {
        throw new Error("Image upload failed");
      }
      console.log("Uploaded Image URL:", cloudinaryData.secure_url);

      data.price = Number(data.price);
      data.quantity = Number(data.quantity);
      data.inStock = Boolean(data.inStock);
      data.bookImage = cloudinaryData.secure_url;

      console.log("data" , JSON.stringify(data));
      // const bookData = JSON.stringify(data)
      // formData.append("file", data.file[0]);
      // formData.append("data", JSON.stringify(data));

      // console.log(Object.fromEntries(formData));

      addProduct(data)
        .unwrap()
        .then((response) => {
          console.log("Product added successfully", response);
          toast.success("Books Created Successfully");
          toast.dismiss(loadingToast);
          reset();
        })
        .catch((err) => {
          console.error("Error adding product", err);
        });
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Book Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Author */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            {...register("author", { required: "Author is required" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
          )}
        </div>
        {/* File Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload File
          </label>
          <input
            type="file"
            {...register("file", { required: "File is required" })}
            className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {errors.file && (
            <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be a positive number" },
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
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
  );
};

export default BookForm;
