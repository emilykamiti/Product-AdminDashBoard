import React, { useState } from "react";
import { Home, ShoppingCart, BarChart, Package, Tag } from "lucide-react";

const Sidebar = ({ activeSection, onSectionChange, onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: <Home size={22} />, id: "dashboard" },
    { name: "Product", icon: <Package size={22} />, id: "products" },
    { name: "Order", icon: <ShoppingCart size={22} />, id: "orders" },
    { name: "Statistics", icon: <BarChart size={22} />, id: "statistics" },
    { name: "Offer", icon: <Tag size={22} />, id: "offers" },
  ];

  return (
    <aside
      className={`fixed top-0 h-screen bg-blue-500 text-white border-l-[10px] border-blue-500 
        transition-all duration-500 overflow-hidden z-50 ${
          isOpen ? "w-[300px]" : "w-[80px]"
        }`}
    >
      {/* Navigation */}
      <ul className="relative w-full">
        <li className="mb-10 pointer-events-none pl-8">
          {isOpen && <h1 className="text-2xl font-bold">eProduct</h1>}
        </li>
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`relative group w-full rounded-tl-[30px] rounded-bl-[30px] transition-colors
              ${
                activeSection === item.id
                  ? "bg-white text-blue-500"
                  : "hover:bg-white hover:text-blue-500 text-white"
              }`}
          >
            {/* Top curved shadow */}
            <div
              className={`absolute right-0 -top-[50px] w-[50px] h-[50px] bg-transparent rounded-full pointer-events-none 
              ${
                activeSection === item.id
                  ? "shadow-[35px_35px_0_10px_white]"
                  : "group-hover:shadow-[35px_35px_0_10px_white]"
              }`}
            ></div>

            {/* Bottom curved shadow */}
            <div
              className={`absolute right-0 -bottom-[50px] w-[50px] h-[50px] bg-transparent rounded-full pointer-events-none 
              ${
                activeSection === item.id
                  ? "shadow-[35px_-35px_0_10px_white]"
                  : "group-hover:shadow-[35px_-35px_0_10px_white]"
              }`}
            ></div>

            <button
              onClick={() => onSectionChange(item.id)}
              className={`flex items-center w-full px-4 py-3 transition-colors relative z-10`}
            >
              <span className="min-w-[60px] flex justify-center text-xl">
                {item.icon}
              </span>
              {isOpen && (
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
