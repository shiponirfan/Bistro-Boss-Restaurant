import SectionTitle from "../SectionTitle/SectionTitle";
import FoodMenuCard from "../FoodMenuCard/FoodMenuCard";
import useMenu from "../../hooks/useMenu";

const ChefRecommends = () => {
  const [menu] = useMenu();
  
  return (
    <section className="py-24 container mx-auto px-6 lg:px-8">
      <SectionTitle heading={"FROM OUR MENU"} subHeading={"Check it out"} />
      <div className="grid md:grid-cols-3 gap-6">
        {menu?.slice(0, 3)?.map((item) => (
          <FoodMenuCard key={item._id} item={item}></FoodMenuCard>
        ))}
      </div>
    </section>
  );
};

export default ChefRecommends;
