import React from "react";
import { sidebarProps } from "../../types/sidebar/sidebarTypes";
import { NavLink } from "react-router-dom";

const SidebarItem: React.FC<sidebarProps> = ({ icon, label,to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-5 text-xl font-medium cursor-pointer transition-all duration-300 ${
          isActive ? "bg-gray-300 text-black" : "hover:bg-gray-300"
        }`
      }
    >
      {icon}
      <span className="hidden md:inline-block">{label}</span>
    </NavLink>
  );
};

export default SidebarItem;
