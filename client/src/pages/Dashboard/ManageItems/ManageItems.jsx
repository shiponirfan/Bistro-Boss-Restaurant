import { FaEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleMenuDelete = (item) => {
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
          axiosSecure.delete(`/food-menu/${item._id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${item.name} has been deleted`,
                showConfirmButton: false,
                timer: 1500
              });
              refetch();
            }
          });
        }
      });
    };

    return (
        <div className="mt-10">
      <SectionTitle heading={"MANAGE ALL ITEMS"} subHeading={"Hurry Up!"} />
      <div className="bg-white p-14 shadow-lg mx-44 my-14">
        <div className="flex  pb-8">
          <h1 className="text-4xl font-bold">Total Items: {menu.length}</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-[#D1A054] text-lg text-white">
                <th></th>
                <th>ITEM IMAGE</th>
                <th>ITEM NAME</th>
                <th>PRICE</th>
                <th>UPDATE</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {menu?.map((item, index) => (
                <tr key={item._id} className="text-lg font-bold">
                  <th>
                    <h2>{index + 1}</h2>
                  </th>
                  <td>
                  <div className="avatar">
              <div className="mask mask-squircle w-16 h-16">
                <img src={item.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
                  </td>
                  <td>
                    <h2>{item.name}</h2>
                  </td>
                  <td>
                    <h2>${item.price}</h2>
                  </td>
                  <td>
                  <Link to={`/dashboard/updateItems/${item._id}`}>
                  <button
                      className="btn bg-orange-500 text-white hover:bg-orange-600"
                    >
                      {" "}
                      <FaEdit />{" "}
                    </button>
                  </Link>
                  </td>
                  <th>
                    <button
                      onClick={() => handleMenuDelete(item)}
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

export default ManageItems;