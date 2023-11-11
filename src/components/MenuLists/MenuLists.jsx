import PropTypes from "prop-types";

const MenuLists = ({ item }) => {
  const { name, image, recipe, price } = item;
  return (
    <div className="flex justify-between items-center gap-6">
      <img
        className="w-28 h-24 rounded-full rounded-tl-none"
        src={image}
        alt="recipe image"
      />
      <div className="space-y-2">
        <h2 className="text-xl font-medium">
          {name} -----------------------------
        </h2>
        <p>{recipe}</p>
      </div>
      <p className="text-xl text-[#BB8506]">{price}</p>
    </div>
  );
};

MenuLists.propTypes = {
  item: PropTypes.array,
};

export default MenuLists;
