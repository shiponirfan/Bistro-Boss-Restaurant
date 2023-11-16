import { NavLink, Outlet } from "react-router-dom";
import { FaCalendar, FaHome, FaList, FaMailBulk, FaMoneyBill, FaShopify, FaShoppingCart, FaStar } from "react-icons/fa";
import useCarts from "../hooks/useCarts";
const Dashboard = () => {
  const [carts] = useCarts();
  return (
    <div className="flex">
      <div className="w-72 p-10 min-h-screen bg-[#D1A054]">
        <ul className="space-y-5 dashboard-menu">
          <li>
            <NavLink className="flex items-center hover:text-white transition gap-2 text-xl font-medium" to="/dashboard/userHome">
              <FaHome />
              User Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/reservation" className="flex items-center hover:text-white transition gap-2 text-xl font-medium">
              <FaCalendar />
              Reservation
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentHistory" className="flex items-center hover:text-white transition gap-2 text-xl font-medium">
              <FaMoneyBill />
              Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart" className="flex items-center hover:text-white transition gap-2 text-xl font-medium">
              <FaShoppingCart />
              My Cart ({carts.length})
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/review" className="flex items-center hover:text-white transition gap-2 text-xl font-medium">
              <FaStar />
              Add Review
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/booking" className="flex items-center hover:text-white transition gap-2 text-xl font-medium">
              <FaList />
              My Booking
            </NavLink>
          </li>

          <div className="divider"></div> 

          <li>
            <NavLink className="flex items-center hover:text-white transition gap-2 text-xl font-medium" to="/">
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="flex items-center hover:text-white transition gap-2 text-xl font-medium" to="/menu">
              <FaList />
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink className="flex items-center hover:text-white transition gap-2 text-xl font-medium" to="/ordered-food/salad">
              <FaShopify />
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink className="flex items-center hover:text-white transition gap-2 text-xl font-medium" to="/contact-us/salad">
              <FaMailBulk />
              Contact
            </NavLink>
          </li>

        </ul>
      </div>
      <div className="flex-1 p-5 bg-slate-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
