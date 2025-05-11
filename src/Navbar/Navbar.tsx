import { logout, useCurrentUser } from "@/Redux/feature/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/feature/hook";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaShoppingCart } from "react-icons/fa"; // Import the cart icon

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(useCurrentUser);
  console.log(user, "user for nav");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logout Successful");
  };

  const navOptions = (
    <>
      {" "}
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-green-500" : "text-gray-900"
        }
      >
        <li>
          <a>Home Page</a>
        </li>
      </NavLink>
      <NavLink
        to="/all-product"
        className={({ isActive }) =>
          isActive ? "text-green-500" : "text-gray-900"
        }
      >
        <li>
          <a>All Product </a>
        </li>
      </NavLink>
      {user && user?.role === "admin" && (
        <NavLink
          to="/dash-board/states-management"
          className={({ isActive }) =>
            isActive ? "text-green-500" : "text-gray-900"
          }
        >
          <li>
            <a>Dashboard </a>
          </li>
        </NavLink>
      )}
      {user && user?.role === "user" && (
        <NavLink
          to="/dash-board/my-profile"
          className={({ isActive }) =>
            isActive ? "text-green-500" : "text-gray-900"
          }
        >
          <li>
            <a>Dashboard </a>
          </li>
        </NavLink>
      )}
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "text-green-500" : "text-gray-900"
        }
      >
        <li>
          <a>About Us</a>
        </li>
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive ? "text-green-500" : "text-gray-900"
        }
      >
        <li>
          <a>Contact Us</a>
        </li>
      </NavLink>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {navOptions}
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl gap-0">
          Book <span className="text-green-500">Shop</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-2 z-10">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        <div className="flex items-center gap-2">
          {/* Cart icon with link */}
          <Link to="/cart" className="btn btn-ghost btn-circle  text-green-500">
            <div className="indicator">
              <FaShoppingCart className="h-5 w-5" />
              {/* You can add a badge for cart items count if needed */}
              {/* <span className="badge badge-sm indicator-item">8</span> */}
            </div>
          </Link>

          {user?.userEmail ? (
            <button className="bg-green-500 rounded-md" onClick={handleLogout}>
              <a className="btn bg-green-500 text-white hover:bg-green-400">
                Logout
              </a>
            </button>
          ) : (
            <Link to="/login">
              <a className="btn bg-green-500 text-white hover:bg-green-400">
                login
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
