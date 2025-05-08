import AllBooks from "../AllBooks";
import CreateBooks from "../CreateBooks";
import MyOrder from "../MyOrder";
import MyProfile from "../MyProfile";
import OrderManagementPage from "../OrderManagementPage";
import AdminDashboard from "../Stat-Management/StateManagement";
import UserManagement from "../UserManagement";

export const adminPaths = [
  {
    name: "States-Management",
    path: "states-management",
    element: <AdminDashboard></AdminDashboard>,
  },
  {
    name: "User-Management",
    path: "user-management",
    element: <UserManagement></UserManagement>,
  },
  {
    name: "Order-Management",
    path: "order-management",
    element: <OrderManagementPage></OrderManagementPage>,
  },
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

export const userPaths = [
  {
    name: "My-Profile",
    path: "my-profile",
    element: <MyProfile></MyProfile>,
  },
  {
    name: "My Order",
    path: "my-order",
    element: <MyOrder></MyOrder>,
  },
];
