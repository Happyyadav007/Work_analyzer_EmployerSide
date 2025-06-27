import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Folder,
  Users,
  Package,
  DollarSign,
  FileText,
  UserCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";
import { useState } from "react";
import { logoutUser } from "../api/employerApi";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);

  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/projects", label: "Projects", icon: Folder },
    { path: "/myprojects", label: "My Projects", icon: Folder },
    { path: "/users", label: "Users", icon: Users },
    { path: "/items", label: "Items", icon: Package },
    { path: "/finance", label: "Finance", icon: DollarSign },
    { path: "/document", label: "Document", icon: FileText },
    { path: "/workers", label: "Workers", icon: UserCheck },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const isActiveRoute = (path) => location.pathname === path;

  const handleLogout = async () => {
    // Clear user auth data (token, user info)
    try {
      await logoutUser();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/users/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const LogoutModal = () => {
    if (!showLogoutModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-black rounded-lg shadow-xl p-6 w-96 border border-yellow-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-yellow-400">
              Confirm Logout
            </h3>
            <button
              onClick={() => setShowLogoutModal(false)}
              className="p-1 rounded-lg hover:bg-yellow-700/20 transition-colors"
            >
              <X className="w-5 h-5 text-yellow-400" />
            </button>
          </div>
          <p className="text-yellow-200 mb-6">
            Are you sure you want to logout? You will need to sign in again to
            access your account.
          </p>
          <div className="flex space-x-3 justify-end">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="px-4 py-2 rounded-lg border border-yellow-400 text-yellow-300 hover:bg-yellow-700/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-yellow-500 text-black hover:bg-yellow-400 transition-all duration-200 shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`bg-black text-yellow-100 h-screen flex flex-col transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        } shadow-2xl`}
      >
        {/* Header */}
        <div className="p-4 border-b border-yellow-700/50 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <img
                src="/images/logo.png"
                alt="Velocity Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="font-semibold text-lg text-yellow-300">
                Velocity
              </span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-yellow-700/20 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-yellow-400" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-yellow-400" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = isActiveRoute(item.path);

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-yellow-500 text-black shadow-md"
                        : "text-yellow-200 hover:bg-yellow-700/20 hover:text-yellow-100"
                    }`}
                    title={isCollapsed ? item.label : ""}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-yellow-700/50">
          <div
            className={`flex items-center space-x-3 mb-3 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-md">
              <span className="text-black text-sm font-medium"></span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-yellow-100 truncate">
                  {currentUser.name}
                </p>
                <p className="text-xs text-yellow-400 truncate">
                  {currentUser.role}
                </p>
              </div>
            )}
          </div>

          {/* Logout Button under User */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 bg-yellow-500 text-black hover:bg-yellow-400 ${
              isCollapsed ? "justify-center" : ""
            }`}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal />
    </>
  );
};

export default Sidebar;
