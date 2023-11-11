import About from "../../components/About/About";
import Categories from "../../components/Categories/Categories";
import MainBanner from "../../components/MainBanner/MainBanner";
import PopularMenu from "../../components/PopularMenu/PopularMenu";

const Home = () => {
    return (
        <div>
            <MainBanner/>
            <Categories/>
            <About/>
            <PopularMenu/>
        </div>
    );
};

export default Home;