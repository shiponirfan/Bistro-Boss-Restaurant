import { FaTrash } from "react-icons/fa";
import useCarts from "../../../hooks/useCarts";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Cart = () => {
  const [carts, refetch] = useCarts();
  const totalPrice = carts.reduce((total, item) => total + item.price, 0);
  const axios = useAxiosSecure();
  const handleDelete = (id) => {
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
        axios.delete(`/carts/${id}`).then((res) => {
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
      <SectionTitle heading={"WANNA ADD MORE?"} subHeading={"My Cart"} />
      <div className="bg-white p-14 shadow-lg mx-44 my-14">
        <div className="flex justify-evenly pb-8">
          <h1 className="text-4xl font-bold">Total Orders: {carts.length}</h1>
          <h1 className="text-4xl font-bold">Total Price: {totalPrice}</h1>
          <button className="btn bg-[#D1A054] text-white text-xl hover:bg-orange-400">
            Pay
          </button>
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
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart, index) => (
                <tr key={cart._id} className="text-lg font-bold">
                  <th>
                    <h2>{index + 1}</h2>
                  </th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-16 h-16">
                        <img src={cart.image} alt={cart.name} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <h2>{cart.name}</h2>
                  </td>
                  <td>
                    <h2>{cart.price}</h2>
                  </td>
                  <th>
                    <button
                      onClick={() => handleDelete(cart._id)}
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

export default Cart;
