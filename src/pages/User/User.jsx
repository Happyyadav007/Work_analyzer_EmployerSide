import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllUsers } from "../../api/employerApi";
import { toast, ToastContainer } from "react-toastify"; // ✅ Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // ✅ Import styles

const User = () => {
  // Mock navigate function for demonstration
  const navigate = useNavigate(); // ✅ Correct hook

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null); // For 3-dot menu

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const res = await fetchAllUsers();
        setLoading(false);

        if (res.success) {
          setUsers(res.data);
        } else {
          toast.error(res.message || "Failed to fetch users");
        }
      } catch (error) {
        setLoading(false);
        toast.error("An error occurred while fetching users.");
        console.error("Fetch users error:", error);
      }
    };

    loadUsers();
  }, []);

  // Format date strings nicely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  // Navigation handlers
  const handleAddUser = () => {
    navigate("/users/adduser");
  };

  const handleView = (id) => {
    navigate(`/users/view/${id}`);
    setOpenMenuId(null);
  };

  const handleEdit = (id) => {
    navigate(`/users/edit/${id}`);
    setOpenMenuId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // TODO: Add actual API delete call
      setUsers(users.filter((user) => user._id !== id));
    }
    setOpenMenuId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-100 py-8 px-4">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl shadow-gray-900/5 p-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-light text-gray-900 tracking-tight">
                User Management
              </h1>
              <p className="text-sm text-gray-500 mt-1 font-light">
                Manage and oversee all system users
              </p>
            </div>
            <button
              onClick={handleAddUser}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transform hover:-translate-y-0.5"
            >
              <span className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>Add User</span>
              </span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl shadow-gray-900/5 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-indigo-600 border-t-transparent"></div>
                <p className="text-sm text-gray-600 font-light">
                  Loading users...
                </p>
              </div>
            </div>
          ) : (
            <div>
              {users.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-light">No users found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {users.map((user, index) => (
                    <div
                      key={user._id}
                      className={`p-6 hover:bg-gray-50/50 transition-all duration-200 ${
                        index === 0 ? "" : "border-t border-gray-100/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-5">
                          {/* Avatar */}
                          <div className="relative">
                            <img
                              src={
                                user.profile_image_url
                                  ? user.profile_image_url
                                  : "https://ui-avatars.com/api/?name=" +
                                    encodeURIComponent(user.name) +
                                    "&background=6366f1&color=fff&size=128"
                              }
                              alt={`${user.name} profile`}
                              className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100 shadow-sm"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
                          </div>

                          {/* User Info */}
                          <div className="space-y-1">
                            <h3 className="text-base font-medium text-gray-900 tracking-tight">
                              {user.name}
                            </h3>
                            <div className="flex items-center space-x-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
                                {user.role}
                              </span>
                              <span className="text-sm text-gray-600 font-light">
                                {user.phone}
                              </span>
                            </div>
                            <div className="flex items-center space-x-6 text-xs text-gray-500">
                              <div className="flex items-center space-x-1">
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                                <span>
                                  Updated: {formatDate(user.updated_at)}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                  />
                                </svg>
                                <span>
                                  Last login: {formatDate(user.last_login)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions Menu */}
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenMenuId(
                                openMenuId === user._id ? null : user._id
                              )
                            }
                            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                            aria-label="Open menu"
                          >
                            <svg
                              className="w-5 h-5 text-gray-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <circle cx="3" cy="10" r="2" />
                              <circle cx="10" cy="10" r="2" />
                              <circle cx="17" cy="10" r="2" />
                            </svg>
                          </button>

                          {openMenuId === user._id && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-xl shadow-gray-900/10 z-10 overflow-hidden">
                              <button
                                onClick={() => handleView(user._id)}
                                className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                              >
                                <svg
                                  className="w-4 h-4 mr-3 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                                View Details
                              </button>
                              <button
                                onClick={() => handleEdit(user._id)}
                                className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                              >
                                <svg
                                  className="w-4 h-4 mr-3 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                                Edit User
                              </button>
                              <button
                                onClick={() => handleDelete(user._id)}
                                className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                              >
                                <svg
                                  className="w-4 h-4 mr-3 text-red-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                                Delete User
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
