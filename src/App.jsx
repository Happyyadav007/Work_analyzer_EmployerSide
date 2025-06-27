import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import User from "./pages/User/User";
import Login from "./pages/User/Login";
import AddUser from "./pages/User/AddUser";
import "./App.css";
import ItemPage from "./pages/Item/ItemPage";
import AddItem from "./pages/Item/AddItem";
import MyProjectDetail from "./pages/MyProjectDetail";
import MyProjects from "./pages/MyProjects";
import BudgetFileManager from "./components/ProjectDetail/BudgetFileManager";

// Create a wrapper to use useLocation outside Router
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/users/login";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (conditionally rendered) */}
      {!hideSidebar && <Sidebar />}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header (optional) */}
        {!hideSidebar && (
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-800">
                Project Management System
              </h1>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">Welcome back, Timo</div>
              </div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <main
          className={`flex-1 overflow-x-hidden overflow-y-auto ${
            hideSidebar ? "bg-white p-0" : "bg-gray-50 p-6"
          }`}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/myprojects" element={<MyProjects />} />
            <Route path="/users" element={<User />} />
            <Route path="/users/adduser" element={<AddUser />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/budgettracker/:id" element={<BudgetFileManager />} />
            <Route path="/myproject/:projectId" element={<MyProjectDetail />} />
            <Route path="/items" element={<ItemPage />} />
            <Route path="/item/additem" element={<AddItem />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AppWrapper;
