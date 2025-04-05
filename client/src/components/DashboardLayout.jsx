import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const DashboardLayout = () => {
  const [activeSection, setActiveSection] = useState("orders");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onSectionChange={setActiveSection} />
      <div className="flex-1">
        <Header />
        <main className="p-6 transition-all">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
