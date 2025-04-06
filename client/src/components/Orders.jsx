import React, { useState } from "react";
import {
  FaEllipsisV,
  FaCalendarAlt,
  FaCog,
  FaChevronDown,
} from "react-icons/fa";

const Orders = ({ orders }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filter, setFilter] = useState("All Orders");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionMenu, setActionMenu] = useState(null); // Track which action menu is open
  const ordersPerPage = 5;

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const toggleActionMenu = (orderId) => {
    setActionMenu(actionMenu === orderId ? null : orderId);
  };

  const handleViewOrder = (orderId) => {
    console.log(`Viewing order: ${orderId}`);
    // Add logic to view order details
  };

  const handleDeleteOrder = (orderId) => {
    console.log(`Deleting order: ${orderId}`);
    // Add logic to delete the order
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "All Orders") return true;
    return order.status === filter.toLowerCase();
  });

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <div className="space-y-4 bg-white rounded-lg shadow overflow-hidden">
      {/* Filters Section */}
      <div className="flex items-center justify-between p-4 bg-gray-50">
        <div className="flex items-center space-x-4">
          {["All Orders", "Dispatch", "Pending", "Completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`text-sm font-medium ${
                filter === status
                  ? "text-blue-600 underline"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-gray-500" />
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            Download Report
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Product ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedOrders.map((order) => (
            <tr key={order._id}>
              {/* Product ID */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.productId || "N/A"}
              </td>

              {/* User Details */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.user ? (
                  <div>
                    <span className="font-medium">{order.user.name}</span>
                    <br />
                  </div>
                ) : (
                  <span className="text-gray-500 text-xs">No user data</span>
                )}
              </td>

              {/* Address */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.user?.address || "N/A"}
              </td>

              {/* Date with Dropdown */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="relative">
                  <button
                    onClick={() => toggleOrderDetails(order._id)}
                    className="flex items-center space-x-2"
                  >
                    <FaCalendarAlt className="text-gray-500" />
                    <span>
                      {order.date
                        ? new Date(order.date).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </button>
                  {expandedOrder === order._id && order.date && (
                    <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-4 z-10">
                      <p className="text-sm text-gray-600">
                        Full Date: {new Date(order.date).toString()}
                      </p>
                    </div>
                  )}
                </div>
              </td>

              {/* Price */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${order.price?.toFixed(2) || "0.00"}
              </td>

              {/* Status */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                >
                  {order.status || "Unknown"}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="relative">
                  <button
                    onClick={() => toggleActionMenu(order._id)}
                    className="flex items-center space-x-2"
                  >
                    <FaCog className="text-gray-500" />
                    <FaChevronDown className="text-gray-500" />
                  </button>
                  {actionMenu === order._id && (
                    <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-2 z-10">
                      <button
                        onClick={() => handleViewOrder(order._id)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View Order
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order._id)}
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                      >
                        Delete Order
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg text-sm ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
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
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;
