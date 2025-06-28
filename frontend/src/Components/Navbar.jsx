import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Navbar = ({ bgColor = "#4B5563" }) => {
  const { token, setToken, user } = useContext(AppContext);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Booking", path: "/booking" },
    { name: "Services", path: "/services" },
    {
      name: "Product",
      path: "https://bookyourdrone.org/product-category/drone/",
    },
    { name: "Quote Calculator", path: "/quotecalculator" },
    { name: "Training", path: "/training" },
    { name: "Careers", path: "/career" },
    { name: "Contact", path: "/contact" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsNavbarScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setIsProfileMenuOpen(false);
  };

  return (
    <header
      className={`shadow-md fixed w-full transition-all duration-300 z-50 ${
        isNavbarScrolled ? "bg-gray-800 shadow-lg" : bgColor
      }`}
    >
      <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <NavLink to="/">
            <img
              src="https://i.postimg.cc/t41860t1/logo-Darhub.jpg"
              className="w-36 rounded-lg"
              alt="Darhub Logo"
            />
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 items-center">
          {menuItems.map((item) =>
            item.name === "Product" ? (
              <li key={item.name}>
                <a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={handleLinkClick}
                >
                  {item.name}
                </a>
              </li>
            ) : (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      isActive
                        ? "text-blue-400 border-b-2 border-blue-400"
                        : "text-white hover:text-gray-300"
                    }`
                  }
                  onClick={handleLinkClick}
                >
                  {item.name}
                </NavLink>
              </li>
            )
          )}

          {/* Profile Dropdown or SignUp/Login */}
          {token ? (
            <li className="relative">
              <button
                onClick={handleProfileClick}
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                {user?.name || "Hi Profile "}
                <img
                  src={user?.image || "/default-profile.jpg"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full inline-block ml-2"
                />
              </button>
              {isProfileMenuOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <li>
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      View Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my-order"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      My Order
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/refund-reviews-status"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      Refund & Reviews Status
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li>
              <NavLink
                to="/login"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
                onClick={handleLinkClick}
              >
                SignUp/Login
              </NavLink>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* ✅ Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-800 px-4 pb-4">
          <ul className="space-y-2">
            {menuItems.map((item) =>
              item.name === "Product" ? (
                <li key={item.name}>
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={handleLinkClick}
                  >
                    {item.name}
                  </a>
                </li>
              ) : (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-sm font-medium transition-all ${
                        isActive
                          ? "text-blue-400 border-b border-blue-400"
                          : "text-white hover:text-gray-300"
                      }`
                    }
                    onClick={handleLinkClick}
                  >
                    {item.name}
                  </NavLink>
                </li>
              )
            )}

            {token ? (
              <>
                <li>
                  <NavLink
                    to="/profile"
                    className="block px-3 py-2 text-white hover:text-gray-300"
                    onClick={handleLinkClick}
                  >
                    View Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/my-order"
                    className="block px-3 py-2 text-white hover:text-gray-300"
                    onClick={handleLinkClick}
                  >
                    My Order
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/refund-reviews-status"
                    className="block px-3 py-2 text-white hover:text-gray-300"
                    onClick={handleLinkClick}
                  >
                    Refund & Reviews Status
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-white hover:text-gray-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className="block px-3 py-2 text-white hover:text-gray-300"
                  onClick={handleLinkClick}
                >
                  SignUp/Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
