import { useQuery } from "@tanstack/react-query";
import useAuth from "./../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCar, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = [] } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  return (
    <div className="mt-10 mx-44">
      <div className="my-14">
        <h2 className="text-3xl font-bold">
          <span>Hi, Welcome </span>
          {user?.displayName ? user.displayName : " Back!"}
        </h2>
      </div>
      <div className="stats shadow w-full p-5">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaWallet className="text-3xl" />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">${stats?.revenue}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-3xl" />
          </div>
          <div className="stat-title">Customers</div>
          <div className="stat-value">{stats.users}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUtensils className="text-3xl" />
          </div>
          <div className="stat-title">Menu Items</div>
          <div className="stat-value">{stats.menuItems}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaCar className="text-3xl" />
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value">{stats.orders}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
