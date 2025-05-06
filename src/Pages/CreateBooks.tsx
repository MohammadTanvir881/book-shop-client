import { useAddProductMutation } from "@/Redux/feature/Products/productApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type BookFormFields = {
  title: string;
  author: string;
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
  } = useForm<BookFormFields>();

  const [addProduct] = useAddProductMutation();

  const onSubmit: SubmitHandler<BookFormFields> = async (data) => {
    const loadingToast = toast.loading("Creating book...", { 
      duration: 2000,
      position: "top-center"
    });

    try {
      data.price = Number(data.price);
      data.quantity = Number(data.quantity);
      data.inStock = Boolean(data.inStock);

      await addProduct(data).unwrap();
      toast.success("Book created successfully!", {
        position: "top-center",
        duration: 2000
      });
      reset();
    } catch (error) {
      toast.error("Failed to create book", {
        position: "top-center",
        duration: 2000
      });
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Add New Book
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Fill in the details to add a new book to your collection
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-8 sm:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Book Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    className={`block w-full px-4 py-3 rounded-lg border ${errors.title ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} shadow-sm focus:outline-none focus:ring-2`}
                    placeholder="Enter book title"
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                {/* Author */}
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                    Author <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="author"
                    type="text"
                    {...register("author", { required: "Author is required" })}
                    className={`block w-full px-4 py-3 rounded-lg border ${errors.author ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} shadow-sm focus:outline-none focus:ring-2`}
                    placeholder="Enter author name"
                  />
                  {errors.author && (
                    <p className="mt-2 text-sm text-red-600">{errors.author.message}</p>
                  )}
                </div>

                {/* Image URL */}
                <div className="sm:col-span-2">
                  <label htmlFor="bookImage" className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="bookImage"
                    type="text"
                    {...register("bookImage", {
                      required: "Image URL is required",
                      pattern: {
                        value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i,
                        message: "Please enter a valid image URL",
                      },
                    })}
                    className={`block w-full px-4 py-3 rounded-lg border ${errors.bookImage ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} shadow-sm focus:outline-none focus:ring-2`}
                    placeholder="https://example.com/book-cover.jpg"
                  />
                  {errors.bookImage && (
                    <p className="mt-2 text-sm text-red-600">{errors.bookImage.message}</p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price (BDT) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">৳</span>
                    </div>
                    <input
                      id="price"
                      type="number"
                      {...register("price", {
                        required: "Price is required",
                        min: { value: 0, message: "Price must be positive" },
                      })}
                      className={`block w-full pl-8 pr-4 py-3 rounded-lg border ${errors.price ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} shadow-sm focus:outline-none focus:ring-2`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-2 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="category"
                    type="text"
                    {...register("category", { required: "Category is required" })}
                    className={`block w-full px-4 py-3 rounded-lg border ${errors.category ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} shadow-sm focus:outline-none focus:ring-2`}
                    placeholder="e.g. Fiction, Science"
                  />
                  {errors.category && (
                    <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    {...register("quantity", {
                      required: "Quantity is required",
                      min: { value: 1, message: "Quantity must be at least 1" },
                    })}
                    className={`block w-full px-4 py-3 rounded-lg border ${errors.quantity ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} shadow-sm focus:outline-none focus:ring-2`}
                    placeholder="0"
                  />
                  {errors.quantity && (
                    <p className="mt-2 text-sm text-red-600">{errors.quantity.message}</p>
                  )}
                </div>

                {/* In Stock */}
                <div>
                  <label htmlFor="inStock" className="block text-sm font-medium text-gray-700 mb-1">
                    Availability <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="inStock"
                    {...register("inStock", { required: "Availability is required" })}
                    className={`block w-full px-4 py-3 rounded-lg border ${errors.inStock ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} shadow-sm focus:outline-none focus:ring-2`}
                  >
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                  </select>
                  {errors.inStock && (
                    <p className="mt-2 text-sm text-red-600">{errors.inStock.message}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  rows={4}
                  {...register("description", { required: "Description is required" })}
                  className={`block w-full px-4 py-3 rounded-lg border ${errors.description ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} shadow-sm focus:outline-none focus:ring-2`}
                  placeholder="Enter book description"
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              {/* Preview Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Preview
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600">
                      <img
                        src=""
                        alt=""
                        id="imagePreview"
                        className="mx-auto h-32 w-auto object-contain hidden"
                      />
                      <p id="noPreviewText" className="text-gray-500 italic">
                        Image preview will appear here
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookForm;