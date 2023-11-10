import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
    return (
        <div className="font-inter">
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MainLayout;