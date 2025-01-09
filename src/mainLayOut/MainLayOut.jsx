import Navber from "../components/Navber";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayOut = () => {
  return (
    <div >
      <Navber />
      <div className="min-h-[calc(100vh-350px)] dark:bg-slate-800 ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayOut;
