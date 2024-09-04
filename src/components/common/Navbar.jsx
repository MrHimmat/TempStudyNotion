import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import { logout } from "../../services/operations/authAPI"; // Import your logout function

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // To dispatch actions like logout

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Manage menu visibility

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const handleButtonClick = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close menu after navigation
  };

  const handleLogout = () => {
    dispatch(logout(navigate)); // Dispatch logout action to clear user state
    navigate('/'); // Redirect to home page
  };

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <>
              <button
                onClick={() => handleButtonClick("/login")}
                className="rounded-[8px] instructor border border-richblack-700 transition-transform duration-200 transform hover:scale-105  bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
              >
                Log in
              </button>
              <button
                onClick={() => handleButtonClick("/signup")}
                className="rounded-[8px] instructor border border-richblack-700 transition-transform duration-200 transform hover:scale-105  bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
              >
                Sign up
              </button>
            </>
          )}
          {/* {token !== null && (
            <>
              <button
                onClick={() => handleButtonClick("/dashboard")}
                className="rounded-[8px] border border-richblack-700 transition-transform duration-200 transform hover:scale-105  bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="rounded-[8px] border border-richblack-700 transition-transform duration-200 transform hover:scale-105  bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
              >
                Logout
              </button>
            </>
          )} */}
          {token !== null && <ProfileDropdown />}
        </div>
        <button
          className="mr-4 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-richblack-800 z-50 transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col p-4">
          <button
            className="self-end text-white mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <AiOutlineClose fontSize={24} />
          </button>
          <nav className="flex flex-col flex-grow">
            <ul className="space-y-4">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <>
                      <div
                        className="group relative flex cursor-pointer items-center gap-1 text-richblack-25"
                      >
                        <p>{link.title}</p>
                        <BsChevronDown />
                        <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                          <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                          {loading ? (
                            <p className="text-center">Loading...</p>
                          ) : subLinks.length ? (
                            <>
                              {subLinks
                                ?.filter(
                                  (subLink) => subLink?.courses?.length > 0
                                )
                                ?.map((subLink, i) => (
                                  <Link
                                    to={`/catalog/${subLink.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                    key={i}
                                  >
                                    <p>{subLink.name}</p>
                                  </Link>
                                ))}
                            </>
                          ) : (
                            <p className="text-center">No Courses Found</p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      to={link?.path}
                      className={`block ${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                      onClick={() => setIsMenuOpen(false)} // Close menu on link click
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            {/* Mobile Logout and Dashboard */}
            <div className="mt-4">
              {token === null && (
                <>
                  <button
                    onClick={() => handleButtonClick("/login")}
                    className="block w-full rounded-[8px] border border-richblack-700 transition-transform duration-200 transform hover:scale-105  bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => handleButtonClick("/signup")}
                    className="block w-full rounded-[8px] border border-richblack-700 transition-transform duration-200 transform hover:scale-105  bg-richblack-800 px-[12px] py-[8px] text-richblack-100 mt-2"
                  >
                    Sign up
                  </button>
                </>
              )}
              {token !== null && (
                <>
                  <button
                    onClick={() => handleButtonClick("/dashboard/my-profile")}
                    className="block w-full rounded-[8px] border border-richblack-700 transition-transform duration-200 transform hover:scale-105  bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full rounded-[8px] border border-richblack-700 transition-transform duration-200 transform hover:scale-105  bg-richblack-800 px-[12px] py-[8px] text-richblack-100 mt-2"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
