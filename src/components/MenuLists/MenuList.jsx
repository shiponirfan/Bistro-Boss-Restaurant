import MenuListsCard from "./MenuListsCard";
import PropTypes from "prop-types";
import useMenu from "../../hooks/useMenu";
import { Link } from "react-router-dom";
const MenuList = ({category, tabCategory}) => {
    const [menu] = useMenu();
    const menuItems = menu.filter((item) => item.category === category);
    return (
        <section className="container mx-auto px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-8">
        {menuItems?.map((item) => (
          <MenuListsCard key={item._id} item={item}></MenuListsCard>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link to={`/ordered-food/${tabCategory}`}>
        <button className="text-xl font-medium py-2 hover:text-yellow-500 hover:border-yellow-500 duration-300 px-6 border-b-4 rounded-xl border-black">
        ORDER YOUR FAVOURITE FOOD
        </button>
        </Link>
      </div>
    </section>
    );
};
MenuList.propTypes = {
    category: PropTypes.string,
    tabCategory: PropTypes.string,
  };
export default MenuList;