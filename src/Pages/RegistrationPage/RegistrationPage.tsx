import Navbar from "@/Navbar/Navbar";
import { useRegistrationMutation } from "@/Redux/feature/Auth/authApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type RegistrationFormData = {
  name: string;
  email: string;
  password: string;
};

const RegistrationPage = () => {
  const [registration, { isLoading }] = useRegistrationMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>();

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const res = await registration(userData).unwrap();

      if (res?.success) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error(res?.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* <Navbar /> */}
      
      <div className="relative flex items-center justify-center p-4 md:p-8 h-[calc(100vh-80px)]">
        <div className="w-full max-w-md">
          {/* Transparent Form Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-white/20">
            {/* Form Header */}
            <div className="bg-black/30 p-6 text-center border-b border-white/10">
              <h2 className="text-3xl font-bold text-white">Join Our Community</h2>
              <p className="text-white/80 mt-1">Create your account today</p>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                    errors.name ? "border-red-400 focus:ring-red-400" : "border-white/20 focus:ring-blue-400"
                  } focus:outline-none focus:ring-2 text-white placeholder-white/50 transition-all`}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-300">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: "Email is required" })}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                    errors.email ? "border-red-400 focus:ring-red-400" : "border-white/20 focus:ring-blue-400"
                  } focus:outline-none focus:ring-2 text-white placeholder-white/50 transition-all`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-300">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", { required: "Password is required" })}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                    errors.password ? "border-red-400 focus:ring-red-400" : "border-white/20 focus:ring-blue-400"
                  } focus:outline-none focus:ring-2 text-white placeholder-white/50 transition-all`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-300">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  "Register Now"
                )}
              </button>

              {/* Login Link */}
              <div className="text-center pt-2">
                <p className="text-sm text-white/80">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="font-medium text-white hover:text-blue-200 transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;