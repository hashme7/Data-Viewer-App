import React from "react";
import { sidebarProps } from "../../types/sidebar/sidebarTypes";

const SidebarItem: React.FC<sidebarProps> = ({ icon, label }) => {
  return (
    <div className="flex items-center gap-3 p-5 text-2xl hover:bg-gray-300 font-normal cursor-pointer">
      {icon}
      <span className="hidden md:inline-block">{label}</span>
    </div>
  );
};

export default SidebarItem;
