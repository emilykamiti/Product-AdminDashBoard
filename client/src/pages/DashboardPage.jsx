import { useState, useEffect } from "react";
import axios from "axios";
import Products from "../components/Products";
import Orders from "../components/Orders";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track sidebar state

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch orders from the API
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(response.data.data.orders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    if (activeSection === "orders" || activeSection === "dashboard") {
      fetchOrders();
    }
  }, [activeSection]);

  const renderMainContent = () => {
    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;

    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="p-6 shadow-sm">
              <Orders orders={orders.slice(0, 5)} />
            </div>
          </div>
        );
      case "orders":
        return <Orders orders={orders} />;
      case "products":
        return (
          <div className="bg-white rounded-lg">
            <Products products={products} isEmbedded={true} />
          </div>
        );
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onToggle={setIsSidebarOpen} // Pass the callback to Sidebar
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-[300px]" : "ml-[80px]"
        } md:ml-[300px]`}
      >
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">
            <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h1>
            {renderMainContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
