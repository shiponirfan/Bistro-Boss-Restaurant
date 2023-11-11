import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import MenuLists from "../MenuLists/MenuLists";

const PopularMenu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("/public/menu.json")
      .then((res) => res.json())
      .then((data) => {
        const menuItems = data.filter((item) => item.category === "popular");
        setMenu(menuItems);
      });
  }, []);
  return (
    <section className="py-24 container mx-auto px-6 lg:px-8">
      <SectionTitle heading={"FROM OUR MENU"} subHeading={"Check it out"} />
      <div className="grid md:grid-cols-2 gap-8">
        {menu?.map((item) => (
          <MenuLists key={item._id} item={item}></MenuLists>
        ))}
      </div>
      <div className="text-center mt-12">
        <button className="text-xl font-medium py-2 hover:text-yellow-500 hover:border-yellow-500 duration-300 px-6 border-b-4 rounded-xl border-black">
          View Full Menu
        </button>
      </div>
    </section>
  );
};

export default PopularMenu;
