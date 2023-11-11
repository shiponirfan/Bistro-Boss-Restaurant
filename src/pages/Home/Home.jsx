import About from "../../components/About/About";
import Categories from "../../components/Categories/Categories";
import MainBanner from "../../components/MainBanner/MainBanner";

const Home = () => {
    return (
        <div>
            <MainBanner/>
            <Categories/>
            <About/>
        </div>
    );
};

export default Home;