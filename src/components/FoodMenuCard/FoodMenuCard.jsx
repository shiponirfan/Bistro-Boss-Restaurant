import PropTypes from "prop-types";

const FoodMenuCard = ({ item }) => {
  const { name, image, recipe} = item;
  return (
    <div className="card bg-[#F3F3F3] rounded-none">
      <img src={image} alt="recipes" />
      <div className="card-body items-center text-center space-y-3">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions">
          <button className="text-xl bg-[#E8E8E8] font-medium py-3 hover:bg-gray-800 text-yellow-500 border-yellow-500 duration-300 px-8 border-b-4 rounded-lg ">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

FoodMenuCard.propTypes = {
  item: PropTypes.array,
};

export default FoodMenuCard;
