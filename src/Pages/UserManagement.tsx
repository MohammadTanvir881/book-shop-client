import { useGetAllUsersQuery } from "@/Redux/feature/User/UserApi";
import { useState } from "react";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 10; // Display 10 books per page

export type TUser = {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  isBlocked: boolean;
};

const UserManagement = () => {
  const { data } = useGetAllUsersQuery(undefined);

  const [currentPage, setCurrentPage] = useState(1);
  console.log(data?.data);
  if (!data || !data?.data) {
    return <p>Loading...</p>;
  }

  const totalItems = data.data.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Paginate data
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.data.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Account Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((user: TUser) => (
            <tr key={user._id}>
              <td>
                <div className="flex items-center gap-3">
                  {/* <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={product.bookImage} alt="Book" />
                    </div>
                  </div> */}
                  <div>
                    <div className="font-bold">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="font-semibold text-[12px] uppercase">
                {user.role}
              </td>
              <td
                className={user.isBlocked ? "Text-red-500" : "text-green-500"}
              >
                {user.isBlocked ? "De-active" : "Active"}
              </td>

              <th className="flex flex-col gap-1 md:flex-row lg:flex-row">
                <button className="btn btn-ghost btn-xs mx-1 bg-green-400 text-white">
                  Make Admin
                </button>

                <button className="btn btn-ghost btn-xs bg-blue-400 text-white">
                  Deactivate
                </button>
                <button className="btn btn-ghost btn-xs bg-red-400 text-white">
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
