import featuredImg from "../../assets/home/featured.jpg";
import SectionTitle from "../SectionTitle/SectionTitle";

const Featured = () => {
  return (
    <section className="featured-section bg-fixed">
      <div className="bg-black bg-opacity-70 py-32 text-white">
        <SectionTitle heading={"FROM OUR MENU"} subHeading={"Check it out"} />
        <div className="container mx-auto px-6 lg:px-8 flex gap-8 justify-between items-center">
          <div className="h-[400px] flex-1">
            <img
              className="w-full h-full object-cover"
              src={featuredImg}
              alt="featured img"
            />
          </div>
          <div className="flex-1 space-y-2">
            <h4>March 20, 2023</h4>
            <h3>WHERE CAN I GET SOME?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              voluptate facere, deserunt dolores maiores quod nobis quas quasi.
              Eaque repellat recusandae ad laudantium tempore consequatur
              consequuntur omnis ullam maxime tenetur.
            </p>
            <button className="text-xl font-medium py-2 hover:text-yellow-500 hover:border-yellow-500 duration-300 px-6 border-b-4 rounded-xl border-white">
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
