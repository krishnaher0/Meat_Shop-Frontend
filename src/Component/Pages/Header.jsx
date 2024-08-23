import Hamburger from "./Hamburger";
import { listStyle } from "./Config";
import { Link } from "react-router-dom";
import { useAuth } from '../config/AuthContext';
import UserDropdown from "../Home/Login/UserDropdown";
const Header = () => {
  const { isLoggedIn } = useAuth();
  return (
    <header className="shadow md:shadow-lg fixed h-[4rem] w-[100%] flex justify-between items-center bg-[#fff]">
      <div className="w-[92%] flex justify-between mx-auto p-3 relative">
        <div className="w-[100px] flex">
            <h2 className="font-bold text-2xl">try</h2>
            <h2 className="text-red-project font-bold text-2xl">Meat</h2>
        </div>
        <div className="w-[40px] flex justify-center md:w-[70%] ">
          <Hamburger />
          <div className="hidden md:flex md:justify-center md:items-center md:w-[70%] xl:w-[65%]">
            <ul className="md:flex md:w-[100%] xl:w-[100%] md:justify-around">
            <Link to="/home">
            <li className={listStyle}>Home</li>
            </Link>
             <Link to="/products">
            <li className={listStyle}>Products</li>
            </Link>
              <Link to="/about">
            <li className={listStyle}>About Us</li>
            </Link>
               <Link to="/contact">
            <li className={listStyle}>Contact</li>
            </Link>
            <Link to="/cart">
            <li className={listStyle}>Cart</li>
            </Link>
            </ul>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-10">
        {isLoggedIn ? (
            <UserDropdown />
          ) : (
            <Link to="/login">
              <button className="md:w-[100%] text-[18px] font-medium md:bg-orange-project md:rounded-md tracking-wider">
               Login
              </button>
            </Link>
          )}
          </div>
      </div>
    </header>
  );//end
};
export default Header;
