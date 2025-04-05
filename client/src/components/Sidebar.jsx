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
      name: "Product",
      icon: <Package size={20} />,
      id: "products",
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
      {/* Toggle Button */}
      <button
        className="absolute top-6 -right-8 bg-blue-700 p-2 rounded-full text-white lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Logo */}
      <h1
        className={`text-xl font-bold mb-8 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        eProduct
      </h1>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors w-full text-left 
                  ${activeSection === item.id ? "bg-blue-700" : "hover:bg-blue-700/50"}`}
              >
                <span>{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
