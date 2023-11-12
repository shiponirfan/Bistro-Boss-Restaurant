import { Helmet } from "react-helmet-async";
import About from "../../components/About/About";
import CallToAction from "../../components/CallToAction/CallToAction";
import Categories from "../../components/Categories/Categories";
import ChefRecommends from "../../components/ChefRecommends/ChefRecommends";
import Featured from "../../components/Featured/Featured";
import MainBanner from "../../components/MainBanner/MainBanner";
import Testimonials from "../../components/Testimonials/Testimonials";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuList from "../../components/MenuLists/MenuList";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home - Bistro Boss</title>
      </Helmet>
      <MainBanner />
      <Categories />
      <About />
      <div className="py-28">
        <SectionTitle heading={"TODAY'S OFFER"} subHeading={"Don't miss"} />
        <MenuList category={"popular"} />
      </div>
      <CallToAction />
      <ChefRecommends />
      <Featured />
      <Testimonials />
    </div>
  );
};

export default Home;
