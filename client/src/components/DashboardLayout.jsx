import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";

const DashboardLayout = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 bg-white shadow-md">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet context={{ activeSection, setActiveSection }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
