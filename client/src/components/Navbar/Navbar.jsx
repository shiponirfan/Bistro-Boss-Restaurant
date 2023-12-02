import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import userImg from "../../assets/icon/user.png";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import useCarts from "../../hooks/useCarts";
import useAdmin from "../../hooks/useAdmin";

const Navbar = () => {
  const { user, userLogOut } = useAuth();
  const [isAdmin] = useAdmin();

  const [carts] = useCarts();

  const handleSignOut = () => {
    userLogOut().then(() => {
      Swal.fire("Logout Completed");
    });
  };

  const navMenu = (
    <>
      <li className="text-xl font-bold hover:text-[#EEFF25] duration-300">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#EEFF25]" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li className="text-xl font-bold hover:text-[#EEFF25] duration-300">
        <NavLink
          to="/contact-us"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#EEFF25]" : ""
          }
        >
          Contact Us
        </NavLink>
      </li>
      {user ? (
        isAdmin ? (
          <li className="text-xl font-bold hover:text-[#EEFF25] duration-300">
            <NavLink
              to="/dashboard/adminHome"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#EEFF25]" : ""
              }
            >
              Dashboard
            </NavLink>
          </li>
        ) : (
          <li className="text-xl font-bold hover:text-[#EEFF25] duration-300">
            <NavLink
              to="/dashboard/userHome"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#EEFF25]" : ""
              }
            >
              Dashboard
            </NavLink>
          </li>
        )
      ) : (
        ""
      )}
      <li className="text-xl font-bold hover:text-[#EEFF25] duration-300">
        <NavLink
          to="/menu"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#EEFF25]" : ""
          }
        >
          Our Menu
        </NavLink>
      </li>
      <li className="text-xl font-bold hover:text-[#EEFF25] duration-300">
        <NavLink
          to="/ordered-food/salad"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#EEFF25]" : ""
          }
        >
          Ordered Food
        </NavLink>
      </li>
    </>
  );
  return (
    <nav className="bg-black bg-opacity-50 fixed z-50 w-full">
      <div className="navbar justify-between text-white uppercase container mx-auto px-6 lg:px-8">
        <div>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
            </label>
            <ul
              tabIndex={0}
              className="menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navMenu}
            </ul>
          </div>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="hidden lg:flex space-x-6">
          <ul className="space-x-6 menu-horizontal px-1">{navMenu}</ul>
          {user ? (
            <button
              onClick={handleSignOut}
              className="text-xl font-bold hover:text-[#EEFF25] duration-300"
            >
              SIGN OUT
            </button>
          ) : (
            <Link to="/login">
              <button className="text-xl font-bold hover:text-[#EEFF25] duration-300">
                LOGIN
              </button>
            </Link>
          )}
          <Link to="/dashboard/cart">
            <button className="btn">
              <FaShoppingCart className="text-xl" />
              <div className="badge badge-secondary">+{carts.length}</div>
            </button>
          </Link>
          {user?.photoURL ? (
            <img className="w-16" src={user?.photoURL} alt="user" />
          ) : (
            <img className="w-16" src={userImg} alt="user" />
          )}
          {user?.displayName && <span>{user?.displayName}</span>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
