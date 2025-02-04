import Navbar from "@/Navbar/Navbar";
import { useRegistrationMutation } from "@/Redux/feature/Auth/authApi";

import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Define the form data type
type LoginFormData = {
  name: string;
  email: string;
  password: string;
};

const RegistrationPage = () => {
  const [registration] = useRegistrationMutation();
  //   console.log(registration)

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    console.log("Form Data:", data);
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      console.log(userData);

      const res = await registration(userData).unwrap();
      console.log("response", res);

      if (res?.success) {
        toast.success("Registration successful!");
        navigate("/login"); // Redirect to login after success
      } else {
        toast.error(res?.message || "Registration failed");
      }
    } catch (error) {
        console.log(error)
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="container mx-auto">
      <Navbar></Navbar>
      <div className="min-h-screen md:mx-auto px-3 md:px-10  flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Registration</h2>

          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              UserName
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </button>
          <p className="pt-3">
            already Registered?{" "}
            <Link className="text-blue-400" to="/login">
              Login now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
