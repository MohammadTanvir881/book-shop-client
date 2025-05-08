import { useCurrentUser } from "@/Redux/feature/Auth/authSlice";
import { useGetAllUsersQuery } from "@/Redux/feature/User/UserApi";
import { useAppSelector } from "@/Redux/feature/hook";
import { TUser } from "./UserManagement";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const user = useAppSelector(useCurrentUser);
  const currentUserEmail = user?.userEmail;
  const { data, isLoading } = useGetAllUsersQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const currentUser = data?.data.filter(
    (user: TUser) => user.email === currentUserEmail
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-green-500 px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
        </div>
        
        {currentUser.map((user: TUser) => (
          <div key={user._id} className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Summary Card */}
              <div className="w-full md:w-1/3 bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-green-600">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <span className="text-sm text-gray-500">{user.role}</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${user.isBlocked ? "text-red-500" : "text-green-500"}`}>
                      {user.isBlocked ? "Deactivated" : "Active"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                  
                  <div className="pt-4">
                    <Link to={`/change-password/${user._id}`}>
                      <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition duration-200">
                        Change Password
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Account Details Section */}
              <div className="w-full md:w-2/3">
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="border-b border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-semibold">Account Details</h3>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    <div className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                          <p className="mt-1 text-sm font-medium">{user.name}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Email Address</h4>
                          <p className="mt-1 text-sm font-medium">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Account Type</h4>
                          <p className="mt-1 text-sm font-medium capitalize">{user.role}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Account Status</h4>
                          <p className={`mt-1 text-sm font-medium ${user.isBlocked ? "text-red-500" : "text-green-500"}`}>
                            {user.isBlocked ? "Deactivated" : "Active"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Additional sections can be added here */}
                <div className="mt-6 bg-white rounded-lg border border-gray-200">
                  <div className="border-b border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-semibold">Security</h3>
                  </div>
                  <div className="px-6 py-4">
                    <Link to={`/change-password/${user._id}`}>
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200">
                        Change Password
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;