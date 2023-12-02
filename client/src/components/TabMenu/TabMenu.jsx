import PropTypes from "prop-types";
import FoodMenuCard from "../FoodMenuCard/FoodMenuCard";

const TabMenu = ({ categories }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {categories?.map((item) => (
        <FoodMenuCard key={item._id} item={item}></FoodMenuCard>
      ))}
    </div>
  );
};

TabMenu.propTypes = {
  categories: PropTypes.array,
};

export default TabMenu;
