import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import ChefRecommendsCard from "./ChefRecommendsCard";

const ChefRecommends = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("/public/menu.json")
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
      });
  }, []);
  return (
    <section className="py-24 container mx-auto px-6 lg:px-8">
      <SectionTitle heading={"FROM OUR MENU"} subHeading={"Check it out"} />
      <div className="grid md:grid-cols-3 gap-6">
        {menu?.slice(0, 3)?.map((item) => (
          <ChefRecommendsCard key={item._id} item={item}></ChefRecommendsCard>
        ))}
      </div>
    </section>
  );
};

export default ChefRecommends;
