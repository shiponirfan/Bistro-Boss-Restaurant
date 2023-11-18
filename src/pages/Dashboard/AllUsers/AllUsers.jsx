import { FaTrash, FaUsers } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: `${user.userName} is an Admin now!`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const handleUserDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="mt-10">
      <SectionTitle heading={"MANAGE ALL USERS"} subHeading={"How Many?"} />
      <div className="bg-white p-14 shadow-lg mx-44 my-14">
        <div className="flex  pb-8">
          <h1 className="text-4xl font-bold">Total Users: {users.length}</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-[#D1A054] text-lg text-white">
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={user._id} className="text-lg font-bold">
                  <th>
                    <h2>{index + 1}</h2>
                  </th>
                  <td>
                    <h2>{user.userName}</h2>
                  </td>
                  <td>
                    <h2>{user.userEmail}</h2>
                  </td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn bg-orange-500 text-white hover:bg-orange-600"
                      >
                        {" "}
                        <FaUsers />{" "}
                      </button>
                    )}
                  </td>
                  <th>
                    <button
                      onClick={() => handleUserDelete(user._id)}
                      className="btn bg-red-700 text-white hover:bg-red-800"
                    >
                      {" "}
                      <FaTrash />{" "}
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
