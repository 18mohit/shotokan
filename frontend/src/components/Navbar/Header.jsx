import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import { FaAngleDown } from "react-icons/fa6";
import punch from '../../assets/punch.jpeg';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const [isNavVisible, setIsNavVisible] = useState(true);

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };
  return (
    <>
      <header className="bg-gray-800 text-white">
      <div className="flex flex-col sm:flex-row items-center justify-between px-[1.5vw] py-4">
          <div className="sm:hidden flex items-center mb-4 sm:mb-0">
            <NavLink to="/" className="text-white">
              <img
                src={logo}
                alt="Logo1"
                className="h-[30vw] w-[30vw] rounded-full inline"
              />
            </NavLink>
          </div>
          <div className="hidden sm:flex items-center">
            <NavLink to="/" className="text-white">
              <img
                src={logo}
                alt="Martial Arts Logo"
                className="h-16 sm:h-[8vw] sm:w-[8.8vw] rounded-full inline"
              />
            </NavLink>
          </div>
          <div className="text-center w-full">
          <h1 className="sm:text-[2vw] text-[5vw] font-bold ">
            NIHON SHOTOKAN KARATE ASSOCIATION - INDIA
          </h1>
          <h2 className="sm:text-[1vw] text-[2.5vw] font-mono ">Affiliated With:NIHON SHOTOKAN KARATE DO SHUUGOUKAI - JAPAN </h2>
          </div>
        </div>

        <div className="container mx-auto flex justify-between items-center px-[1.5vw]">
          <nav className="sm:flex flex-wrap sm:ml-auto w-full sm:w-auto">
        <div className="sm:hidden flex justify-between">
        <img
          src={punch}
          alt="Toggle navigation"
          onClick={toggleNavVisibility}
          className="cursor-pointer h-[11vw] w-[11vw] rounded-full "
        />
          <NavLink
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
          to="/login" className="text-white">
          <button className="h-[11vw] -mr-[1.3vw] bg-blue-600 font-bold px-[4vw] transition duration-300">
            Login
        </button>
          </NavLink>
      </div>
            {isNavVisible && (
              <ul className="flex flex-col sm:flex-row sm:flex-wrap text-[5vw] sm:text-[1.4vw] ml-[1vw] sm:space-x-8">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-400 hover:text-yellow-400"
                      : "hover:text-yellow-400"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-400 hover:text-yellow-400"
                      : "hover:text-yellow-400"
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/gallery"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-400 hover:text-yellow-400"
                      : "hover:text-yellow-400"
                  }
                >
                  Photo Gallery
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/team"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-400 hover:text-yellow-400"
                      : "hover:text-yellow-400"
                  }
                >
                  Our Team
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-400 hover:text-yellow-400"
                      : "hover:text-yellow-400"
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
              <NavLink
      onMouseEnter={toggleDropdown}
      onMouseLeave={closeDropdown}
      // to="/login"
      className={({ isActive }) =>
        isActive ? 'hover:text-yellow-400' : 'hover:text-yellow-400'
      }
    >
      <div className="flex">
        Login
        <div className="relative top-2 left-1">
          <FaAngleDown />
        </div>
      </div>
      <ul
        className={`${
          isDropdownOpen ? 'block' : 'hidden'
        } absolute bg-gray-700 bg-opacity-100 shadow-md border-black rounded-2xl overflow-hidden z-20 flex flex-col`}
      >
        <NavLink
        to="/login/student"
        className="p-3 hover:bg-gray-600 hover:text-yellow-400 text-white">
          Student
        </NavLink>
        <NavLink
        to="/login/sensei"
        className="p-3 hover:bg-gray-600 hover:text-yellow-400 text-white">
          Sensei
        </NavLink>
        <NavLink
          to="/login/owner"
          className="p-3 hover:bg-gray-600 hover:text-yellow-400 text-white"
        >
          Owner
        </NavLink>
      </ul>
              </NavLink>
              </li>
            </ul>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
