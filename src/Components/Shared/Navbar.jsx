
import { Link, useLocation } from "react-router";
import logo from "../../assets/logoimage-removebg-preview.png";
import useAuth from "../../Hooks/useAuth";
import NavUserDropdown from "../Customs/nav-user-dropdown";

const Navbar = () => {
  const { pathname: path } = useLocation()
  const { user } = useAuth();
  console.log(user)


  return (
    <nav className="flex justify-between items-center container mx-auto">
      {/* logo part */}
      <div className="w-48">
        <img src={logo} alt="" />
      </div>

      {/* nav item part */}
      <div className="space-x-5">
        <Link to="/" className={`px-2 py-1 rounded-md ${path == "/" ? "border border-blue-500 text-blue-500" : ""}`}>Home</Link>
        <Link to="/all-article" className={`px-2 py-1 rounded-md ${path == "/all-article" ? "border border-blue-500 text-blue-500" : ""}`}>All Article</Link>
        <Link to="/subscription" className={`px-2 py-1 rounded-md ${path == "/subscription" ? "border border-blue-500 text-blue-500" : ""}`}>Subscriptions</Link>
      </div>


      {/* dropdown part */}
      {
        user?.email ?
          <NavUserDropdown user={user} />
          :
          <div className="space-x-4">
            <Link to="/login">
              <button className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 shadow cursor-pointer">Login</button>
            </Link>
            <Link to="/register">
              <button className="px-4 py-2 rounded-md bg-blue-500 text-white shadow cursor-pointer">Register</button>
            </Link>
          </div>
      }
    </nav>
  );
};

export default Navbar;
