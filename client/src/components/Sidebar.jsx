import React, { useState } from "react";
import {
  Home,
  ShoppingCart,
  BarChart,
  Package,
  Tag,
  Menu,
  X,
} from "lucide-react";

const Sidebar = ({ activeSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <Home size={20} />,
      id: "dashboard",
    },
    {
      name: "Product",
      icon: <Package size={20} />,
      id: "products",
    },
    {
      name: "Order",
      icon: <ShoppingCart size={20} />,
      id: "orders",
    },
    {
      name: "Statistics",
      icon: <BarChart size={20} />,
      id: "statistics",
    },
    {
      name: "Offer",
      icon: <Tag size={20} />,
      id: "offers",
    },
  ];

  return (
    <aside
      className={`h-screen bg-blue-800 text-white p-4 ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 flex flex-col sticky top-0`}
    >
      {/* Logo */}
      <h1
        className={`text-xl font-bold mb-8 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        eProduct
      </h1>

      {/* Navigation Links */}
      <nav
        className={`w-[80px] ${isOpen ? "w-[250px]" : ""} transition-all duration-300`}
      >
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`relative group rounded-l-[80px] ${
                activeSection === item.id ? "bg-white" : "hover:bg-white"
              }`}
            >
              <div
                className={`absolute right-0 top-[-50px] w-[50px] h-[50px] bg-transparent rounded-full 
            pointer-events-none ${
              activeSection === item.id ||
              "group-hover:shadow-[35px_35px_0_10px_#fff]"
            }`}
              ></div>
              <div
                className={`absolute right-0 bottom-[-50px] w-[50px] h-[50px] bg-transparent rounded-full 
            pointer-events-none ${
              activeSection === item.id ||
              "group-hover:shadow-[35px_-35px_0_10px_#fff]"
            }`}
              ></div>

              <button
                onClick={() =>
                  onSectionChange(item.id) ||
                  "group-hover:shadow-[35px_-35px_0_10px_#fff]"
                }
                className={`flex items-center w-full p-3 transition-colors relative z-10
            ${
              activeSection === item.id
                ? "text-blue-800"
                : "text-gray-200 hover:text-blue-800"
            }`}
              >
                <span className="min-w-[60px] flex justify-center text-2xl">
                  {item.icon}
                </span>
                {isOpen && (
                  <span className="text-sm whitespace-nowrap">{item.name}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
