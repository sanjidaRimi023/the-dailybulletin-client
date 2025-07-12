import { Link, useLocation } from "react-router";
import logo from "../../assets/nav-logo.png";
import useAuth from "../../Hooks/useAuth";
import NavUserDropdown from "../Customs/nav-user-dropdown";
import { Typewriter } from "react-simple-typewriter";
const Navbar = () => {
  const { pathname: path } = useLocation();
  const { user } = useAuth();
  console.log(user);

  return (
    <nav className="flex justify-between items-center lg:px-20 py-2 sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-900/70 shadow-sm">
      {/* logo part */}
      <div className="w-10 flex items-center gap-2">
        <img src={logo} alt="" />
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          <Typewriter
            words={["The_Daily_Bulletin"]}
            loop={5}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </div>

      {/* nav item part */}
      <div className="space-x-5">
        <Link
          to="/"
          className={`px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 relative        overflow-hidden
               ${path === "/" ? " text-blue-500" : "text-gray-700"}
           group
          `}
        >
          <span className="relative z-10">Home</span>
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link
          to="/all-article"
          className={`px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 relative        overflow-hidden
               ${path === "/all-article" ? " text-blue-500" : "text-gray-700"}
           group
          `}
        >
          All Article
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          to="/subscription"
          className={`px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 relative        overflow-hidden
               ${path === "/subscription" ? " text-blue-500" : "text-gray-700"}
           group
          `}
        >
          Subscriptions
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>

      {/* dropdown part */}
      {user?.email ? (
        <NavUserDropdown user={user} />
      ) : (
        <div className="space-x-4">
          <Link to="/login">
            <button className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 shadow cursor-pointer">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-4 py-2 rounded-md bg-blue-500 text-white shadow cursor-pointer">
              Register
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
