import React, { useEffect, useState } from "react";

// Dummy data simulation – replace with API calls in production
const mockData = {
  activeProjects: 5,
  completedProjects: 12,
  delayedProjects: 2,
  totalBudget: 1000000,
  usedBudget: 650000,
  milestones: {
    completed: 30,
    missed: 5,
  },
  galleryImages: [
    "/images/project1.jpg",
    "/images/project2.jpg",
    "/images/project3.jpg",
  ],
  notifications: [
    "Project Alpha delayed due to material shortage.",
    "New image uploaded for Project Beta.",
    "Milestone reached for Project Gamma.",
  ],
  kpi: {
    contractorPerformance: 92,
    projectCompletionRate: 80,
  },
};

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setData(mockData);
    }, 500);
  }, []);

  if (!data)
    return (
      <div className="text-center py-10 text-gray-500">
        Loading dashboard...
      </div>
    );

  const {
    activeProjects,
    completedProjects,
    delayedProjects,
    totalBudget,
    usedBudget,
    milestones,
    galleryImages,
    notifications,
    kpi,
  } = data;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Project Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card title="Active Projects" value={activeProjects} color="blue" />
        <Card
          title="Completed Projects"
          value={completedProjects}
          color="green"
        />
        <Card title="Delayed Projects" value={delayedProjects} color="red" />
      </div>

      {/* Budget + Time Tracking */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold text-lg mb-2">Budget Summary</h2>
          <p>Total: ₹{totalBudget.toLocaleString()}</p>
          <p>Used: ₹{usedBudget.toLocaleString()}</p>
          <div className="mt-2 h-4 w-full bg-gray-200 rounded">
            <div
              className="h-4 bg-blue-500 rounded"
              style={{ width: `${(usedBudget / totalBudget) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold text-lg mb-2">Milestone Tracking</h2>
          <p>Completed: {milestones.completed}</p>
          <p>Missed: {milestones.missed}</p>
        </div>
      </div>

      {/* Daily Status & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold text-lg mb-2">Notifications</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {notifications.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>

        {/* KPI Metrics */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold text-lg mb-2">KPI Metrics</h2>
          <p>Contractor Performance: {kpi.contractorPerformance}%</p>
          <p>Project Completion Rate: {kpi.projectCompletionRate}%</p>
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="font-semibold text-lg mb-4">Latest Image Uploads</h2>
        <div className="flex gap-4 overflow-x-auto">
          {galleryImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Gallery ${idx}`}
              className="w-32 h-32 object-cover rounded shadow"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value, color }) => {
  const colorMap = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
  };
  return (
    <div className={`p-4 rounded shadow ${colorMap[color]} `}>
      <h3 className="text-sm uppercase font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default Dashboard;
