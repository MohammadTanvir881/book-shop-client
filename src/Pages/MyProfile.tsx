import { useCurrentUser } from "@/Redux/feature/Auth/authSlice";
import { useGetAllUsersQuery } from "@/Redux/feature/User/UserApi";
import { useAppSelector } from "@/Redux/feature/hook";
import { TUser } from "./UserManagement";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const user = useAppSelector(useCurrentUser);
  const currentUserEmail = user?.userEmail;
  console.log(currentUserEmail);
  const { data, isLoading } = useGetAllUsersQuery(undefined);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const currentUser = data?.data.filter(
    (user: TUser) => user.email === currentUserEmail
  );

  console.log(currentUser);
  return (
    <div>
      {currentUser.map((user: TUser) => (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Account Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="font-bold">
                  {user.email}
                </td>
                <td className="font-semibold">{user.role}</td>
                <td className={user.isBlocked? "font-bold text-red-400" : "font-bold text-green-400"}>{user.isBlocked ? "Deactivate" : "Active"}</td>
               <Link to={`/change-password/${user._id}`}> <th>
                  <button className="btn btn-ghost btn-xs bg-gray-200">Change Password</button>
                </th></Link>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default MyProfile;
