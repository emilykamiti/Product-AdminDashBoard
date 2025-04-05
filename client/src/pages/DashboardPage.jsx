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
  const [filter, setFilter] = useState("All Orders");

  // Fetch products when component mounts
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

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
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

  const handleOrder = async (product) => {
    const handleOrder = async (product) => {
      console.log("Product received in handleOrder:", product); // Debug log

      const orderData = {
        name: product.title, // Required field
        productId: product.id?.toString(), // Convert to string if it exists
        price: product.price, // Required field
        status: "pending", // Optional, has default value
      };

      try {
        console.log("Sending order data:", orderData); // Debug log

        const response = await axios.post(
          "http://localhost:5000/api/orders",
          orderData
        );

        console.log("Order created:", response.data); // Debug log
        setOrders([...orders, response.data.data.order]); // Add the new order to the list
      } catch (err) {
        console.error("Failed to create order:", {
          message: err.message,
          response: err.response?.data,
        });
      }
    };
    const token = localStorage.getItem("token");
    const orderData = {
      name: product.title, // Required field
      productId: product.id?.toString(), // Required field
      price: product.price, // Required field
      status: "pending", // Optional, has default value
    };

    try {
      console.log("Sending order data:", orderData); // Debug log

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Order created:", response.data); // Debug log
      setOrders([...orders, response.data.data.order]); // Add the new order to the list
    } catch (err) {
      console.error("Failed to create order:", {
        message: err.message,
        response: err.response?.data,
      });
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "All Orders") return true;
    return order.status === filter.toLowerCase();
  });
  const renderDashboardContent = () => (
    <div className="space-y-6">
      {/* Recent Orders */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <Orders orders={orders.slice(0, 5)} />
      </div>
    </div>
  );

  const renderMainContent = () => {
    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;

    switch (activeSection) {
      case "dashboard":
        return renderDashboardContent();
      case "orders":
        return <Orders orders={orders} />;
      case "products":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <Products
              products={products}
              onOrder={handleOrder}
              isEmbedded={true}
            />
          </div>
        );
      case "statistics":
        return <div>Statistics Content</div>;
      case "offers":
        return <div>Offers Content</div>;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">
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
