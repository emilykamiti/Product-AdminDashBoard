import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import axios from "axios";

const Products = ({ onOrder }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedCard, setExpandedCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderMessage, setOrderMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
        setCategories([
          "All",
          ...new Set(response.data.map((p) => p.category)),
        ]);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleOrder = async (product) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      const orderData = {
        name: product.title,
        productId: product.id.toString(),
        price: product.price,
        status: "pending",
      };

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      setOrderMessage(`Successfully ordered ${product.title}`);
      if (onOrder) {
        onOrder(response.data.data.order);
      }
    } catch (err) {
      console.error("Order error details:", err);
      setOrderMessage(
        `Failed to order ${product.title}: ${err.response?.data?.message || err.message}`
      );
    }
  };

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when filtering
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  if (loading) {
    return <div className="text-center p-4">Loading products...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!products || products.length === 0) {
    return <div className="text-center p-4">No products available.</div>;
  }

  return (
    <div className="space-y-4 p-4">
      {orderMessage && (
        <div className="p-4 bg-green-100 text-green-800 rounded-lg">
          {orderMessage}
        </div>
      )}

      {/* Category Filter */}
      <div className="flex space-x-4 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-lg text-sm ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow`}
          >
            <div className="p-4">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  className="h-20 w-20 object-contain"
                  src={product.image}
                  alt={product.title}
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 truncate">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => toggleCard(product.id)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {expandedCard === product.id ? "Less Info" : "More Info"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOrder(product);
                  }}
                  className="flex items-center px-3 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Order Now
                </button>
              </div>

              {expandedCard === product.id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <div className="mt-3 flex space-x-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                      Rating: {product.rating?.rate || "N/A"}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                      Stock: {product.rating?.count || 0}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {Array.from(
          { length: Math.ceil(filteredProducts.length / productsPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded-lg text-sm ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Products;
