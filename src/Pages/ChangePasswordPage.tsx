import Navbar from "@/Navbar/Navbar";
import { useChangePasswordMutation } from "@/Redux/feature/User/UserApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [changePassword] = useChangePasswordMutation();

  const handlePasswordChange: SubmitHandler<FieldValues> = async (e) => {
    e.preventDefault();
    const form = e.target;
    const oldPassword = form.oldPassword.value;
    const newPassword = form.newPassword.value;
    const data = {
      oldPassword,
      newPassword,
    };

    try {
      const response = await changePassword(data)
        .unwrap()
        .then((response) => {
          toast.success("Password Changed Successfully");
          navigate(-1);
        })
        .catch((error) => {
          toast.error(error?.data?.message || "Something went wrong");
        });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Information */}
          <div className="lg:w-1/2">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Account Security</h1>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Password Requirements</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Ensure your new password meets these requirements:
                    </p>
                    <ul className="mt-2 list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Minimum 8 characters long</li>
                      <li>At least one uppercase letter</li>
                      <li>At least one number or special character</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Security Tips</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      For better security, avoid using easily guessable information like:
                    </p>
                    <ul className="mt-2 list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Your name or email address</li>
                      <li>Common words or sequences</li>
                      <li>Personal information like birthdays</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Update your account password for enhanced security
                </p>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div>
                  <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="oldPassword"
                      name="oldPassword"
                      type="password"
                      required
                      className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter current password"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      required
                      className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-green-600 hover:text-green-500">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
                  >
                    Update Password
                  </button>
                </div>

                <div className="text-sm text-center">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="font-medium text-gray-600 hover:text-gray-500"
                  >
                    Cancel and go back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;