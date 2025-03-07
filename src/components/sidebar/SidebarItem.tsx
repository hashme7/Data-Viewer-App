import React from "react";
import { sidebarProps } from "../../types/sidebar/sidebarTypes";
import { Link } from "react-router-dom";

const SidebarItem: React.FC<sidebarProps> = ({ icon, label,to }) => {
  return (
    <Link to={to} className="flex items-center gap-3 p-5  text-xl hover:bg-gray-300 font-medium cursor-pointer">
      {icon}
      <span className="hidden md:inline-block">{label}</span>
    </Link>
  );
};

export default SidebarItem;
