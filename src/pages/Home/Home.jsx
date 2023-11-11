import About from "../../components/About/About";
import CallToAction from "../../components/CallToAction/CallToAction";
import Categories from "../../components/Categories/Categories";
import ChefRecommends from "../../components/ChefRecommends/ChefRecommends";
import Featured from "../../components/Featured/Featured";
import MainBanner from "../../components/MainBanner/MainBanner";
import PopularMenu from "../../components/PopularMenu/PopularMenu";

const Home = () => {
    return (
        <div>
            <MainBanner/>
            <Categories/>
            <About/>
            <PopularMenu/>
            <CallToAction/>
            <ChefRecommends/>
            <Featured/>
        </div>
    );
};

export default Home;