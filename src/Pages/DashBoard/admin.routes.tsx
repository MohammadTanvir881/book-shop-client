import AllBooks from "../AllBooks";
import CreateBooks from "../CreateBooks";
import UserManagement from "../UserManagement";

export const adminPaths = [
  {
    name : "User-Management",
    path : "user-management",
    element : <UserManagement></UserManagement>
  }
  ,
  {
    name: "Books Management",
    children: [
      {
        name: "Create-Books",
        path: "create-books",
        element: <CreateBooks></CreateBooks>,
      },
      {
        name: "All-Books",
        path: "all-books",
        element: <AllBooks></AllBooks>,
      },
    
    ],
  },
];

export const userPaths = [];
