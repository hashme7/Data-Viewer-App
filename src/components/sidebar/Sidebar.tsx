import React from "react";
import SidebarItem from "./SidebarItem";
import {
  MdOutlineStoreMallDirectory,
  MdOutlineInsertChart,
} from "react-icons/md";
import { LuShapes } from "react-icons/lu";
import { FaChartBar } from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <aside className="md:w-64 w-16 h-full flex flex-col mt-4 z-10 ">
      <nav className="flex flex-col gap-2">
        <SidebarItem icon={<MdOutlineStoreMallDirectory />} label="Store" />
        <SidebarItem icon={<LuShapes />} label="SKU" />
        <SidebarItem icon={<FaChartBar />} label="Planning" />
        <SidebarItem icon={<MdOutlineInsertChart />} label="Chart" />
      </nav>
    </aside>
  );
};

export default Sidebar;
