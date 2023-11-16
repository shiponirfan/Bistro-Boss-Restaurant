import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCarts from "../../hooks/useCarts";

const FoodMenuCard = ({ item }) => {
  const { name, image, recipe, price, _id } = item;
  const { user } = useAuth();
  const [, refetch] = useCarts();
  const axios = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const handleAddToCart = () => {
    if (user && user.email) {
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };
      axios.post("/api/v1/carts", cartItem).then((res) => {

        if (res.data.insertedId) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: `${name} added to your cart`,
          });
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You Are Not Logged In",
        text: "Please log in to add to cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="card bg-[#F3F3F3] rounded-none">
      <img src={image} alt="recipes" />
      <div className="card-body items-center text-center space-y-3">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions">
          <button
            onClick={handleAddToCart}
            className="text-xl bg-[#E8E8E8] font-medium py-3 hover:bg-gray-800 text-yellow-500 border-yellow-500 duration-300 px-8 border-b-4 rounded-lg "
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

FoodMenuCard.propTypes = {
  item: PropTypes.object,
};

export default FoodMenuCard;
