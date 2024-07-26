import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import { FaAngleDown } from "react-icons/fa";
import punch from "../../assets/punch.jpeg";
import { useDispatch } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";

function Header() {
  const dispatch = useDispatch();
  const [isNavVisible, setIsNavVisible] = useState(true);

  const toggleNavVisibility = () => {
    setIsNavVisible((prev) => !prev);
  };

  const user = false;

  return (
    <header className="bg-gray-800 text-white">
      <div className="flex flex-col sm:flex-row items-center justify-between px-[1.5vw] py-4">
        <div className="sm:hidden flex items-center mb-4 sm:mb-0">
          <NavLink to="/" className="text-white">
            <img
              src={logo}
              alt="Logo"
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
          <h1 className="sm:text-[2vw] text-[5vw] font-bold">
            NIHON SHOTOKAN KARATE ASSOCIATION - INDIA
          </h1>
          <h2 className="sm:text-[1vw] text-[2.5vw] font-mono">
            Affiliated With: NIHON SHOTOKAN KARATE DO SHUUGOUKAI - JAPAN
          </h2>
        </div>
      </div>

      <div className="container mx-auto flex justify-between items-center px-[1.5vw]">
        <nav className="sm:flex flex-wrap sm:ml-auto w-full sm:w-auto">
          <div className="sm:hidden flex justify-between">
            <img
              src={punch}
              alt="Toggle navigation"
              onClick={toggleNavVisibility}
              className="cursor-pointer h-[11vw] w-[11vw] rounded-full"
            />
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
             
              <li className="items-center">
                {
                  !user ? (
                    <div className="items-center sm:-mt-2 mt-0">
                      <NavLink
                      to="/login">
                      <Button className=" w-[15vw] text-wrap sm:w-[6vw] bg-slate-50 text-black hover:bg-slate-200">Login</Button>
                      </NavLink>
                      <NavLink
                      to="/signup">
                      <Button className=" w-[15vw] text-wrap sm:w-[6vw] ">SignUp</Button>
                      </NavLink>
                    </div>
                  ) : (
                    <Popover>
                    <PopoverTrigger asChild>
                      <Avatar className="cursor-pointer" >
                        <AvatarImage src="https://github.com/shadcn.png" />
                      </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="flex gap-10 ">
                      <Avatar className="cursor-pointer" >
                        <AvatarImage src="https://github.com/shadcn.png" />
                      </Avatar>
                        <div>
                          <h1 className="font-medium">Patel Mohit</h1>
                          <h1 className="font-medium text-gray-500">bio of mohit</h1>
                        </div>
                      </div>
                        <div className="flex flex-col ">
                          <div className="flex items-center">
                            <User2/>
                          <Button variant="link" className="font-medium text-gray-500">view profile</Button>
                          </div>
                          <div className="flex items-center">
                            <LogOut/>
                          <Button variant="link" className="font-medium text-gray-500">logout</Button>
                          </div>
                        </div>
                    </PopoverContent>
                  </Popover>
                  )
                }
                
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
