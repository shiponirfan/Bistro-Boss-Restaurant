import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const MainLayout = () => {
  const location = useLocation();
  const isLogin = location.pathname.includes("login") || location.pathname.includes("signup");
  return (
    <div className="font-inter">
      {isLogin || <Navbar />}
      <Outlet />
      {isLogin || <Footer />}
    </div>
  );
};

export default MainLayout;
