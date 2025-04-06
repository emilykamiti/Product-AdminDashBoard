import React, { useState } from "react";
import { FaCog, FaChevronDown } from "react-icons/fa";

const Orders = ({ orders }) => {
  const [filter, setFilter] = useState("All Orders");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionMenu, setActionMenu] = useState(null);
  const ordersPerPage = 5;

  const toggleActionMenu = (orderId) => {
    setActionMenu(actionMenu === orderId ? null : orderId);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "All Orders") return true;
    return order.status.toLowerCase() === filter.toLowerCase();
  });

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          {["All Orders", "Dispatch", "Pending", "Completed"].map((status) => (
            <button
              key={status}
              onClick={() => handleFilterChange(status)}
              className={`text-sm font-medium ${
                filter === status
                  ? "text-blue-500 underline"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-7 gap-4 bg-gray-100 p-4 rounded-t-lg">
        <div className="text-sm font-medium text-gray-600">Product ID</div>
        <div className="text-sm font-medium text-gray-600">User</div>
        <div className="text-sm font-medium text-gray-600">Address</div>
        <div className="text-sm font-medium text-gray-600">Date</div>
        <div className="text-sm font-medium text-gray-600">Price</div>
        <div className="text-sm font-medium text-gray-600">Status</div>
        <div className="text-sm font-medium text-gray-600">Actions</div>
      </div>

      {/* Orders as Rows */}
      <div className="space-y-4">
        {paginatedOrders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-7 gap-4 bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:bg-blue-500 hover:text-white hover:shadow-lg hover:scale-105 transition duration-200 transform"
          >
            {/* Product ID */}
            <div className="text-sm">{order.productId || "N/A"}</div>

            {/* User */}
            <div className="text-sm">
              {order.user ? (
                <div className="flex items-center space-x-3">
                  <img
                    src={
                      order.user?.profileImage &&
                      order.user.profileImage !== "default.png"
                        ? `/uploads/${order.user.profileImage}`
                        : "/uploads/default.png"
                    }
                    alt={order.user?.name || "Default User"}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="font-medium">{order.user.name}</span>
                </div>
              ) : (
                <span className="text-gray-500 text-xs">No user data</span>
              )}
            </div>

            {/* Address */}
            <div className="text-sm">{order.user?.address || "N/A"}</div>

            {/* Date */}
            <div className="text-sm">
              {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
            </div>

            {/* Price */}
            <div className="text-sm">${order.price?.toFixed(2) || "0.00"}</div>

            {/* Status */}
            <div className="flex items-center space-x-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  order.status === "completed"
                    ? "bg-green-500"
                    : order.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                }`}
              ></span>
              <span className="text-xs font-semibold">
                {order.status || "Unknown"}
              </span>
            </div>

            {/* Actions */}
            <div className="relative">
              <button
                onClick={() => toggleActionMenu(order._id)}
                className="flex items-center space-x-2"
              >
                <FaCog />
                <FaChevronDown />
              </button>
              {actionMenu === order._id && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 z-10">
                  <button
                    onClick={() => console.log(`Viewing order: ${order._id}`)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View
                  </button>
                  <button
                    onClick={() => console.log(`Deleting order: ${order._id}`)}
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8 px-4 py-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg text-sm ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-500"
          }`}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of{" "}
          {Math.ceil(filteredOrders.length / ordersPerPage)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(
                prev + 1,
                Math.ceil(filteredOrders.length / ordersPerPage)
              )
            )
          }
          disabled={
            currentPage === Math.ceil(filteredOrders.length / ordersPerPage)
          }
          className={`px-4 py-2 rounded-lg text-sm ${
            currentPage === Math.ceil(filteredOrders.length / ordersPerPage)
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-500"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;
