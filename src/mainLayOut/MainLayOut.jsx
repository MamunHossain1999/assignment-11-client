import Navber from "../components/Navber";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";


const MainLayOut = () => {
    return (
        <div className="w-8/12 mx-auto">
            <Navber/>
            <div className="min-h-[calc(100vh-350px)]"><Outlet/></div>
            <Footer/>
           
        </div>
    );
};

export default MainLayOut;