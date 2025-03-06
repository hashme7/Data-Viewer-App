import React, { useState } from "react";
import logo from "../assets/Gsynergy Logo V2 Long Description.svg";
import { FaUserCircle } from "react-icons/fa";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="p-4 bg-white shadow-md flex items-center justify-between px-6">
      <div className="flex items-center justify-between w-full">
        <img src={logo} alt="G Synergy Logo" className="h-7 sm:h-10" />
        <h1 className="text-xl font-semibold text-gray-700">Data Viewer App</h1>
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaUserCircle className="text-2xl text-gray-600" />
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
              <ul className="py-2 text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => alert("Logged out!")}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
