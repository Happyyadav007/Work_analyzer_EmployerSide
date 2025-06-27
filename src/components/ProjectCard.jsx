import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/myproject/${project.id}`);
  };

  const statusStyles = {
    Ongoing: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    "On Hold": "bg-yellow-100 text-yellow-700",
    Delayed: "bg-red-100 text-red-700",
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 p-6"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {project.name}
          </h2>
          <p className="text-sm text-gray-500">
            {project.client} • {project.location}
          </p>
        </div>
        <div
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            statusStyles[project.status]
          }`}
        >
          {project.status}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="text-sm text-gray-700 space-y-1 mb-4">
        <p>
          <span className="font-medium">Budget:</span> $
          {project.budgetUsed.toLocaleString()} / $
          {project.budgetTotal.toLocaleString()}
        </p>
        <p>
          <span className="font-medium">Timeline:</span> {project.startDate} –{" "}
          {project.endDate}
        </p>
        <p>
          <span className="font-medium">Time Left:</span> {project.daysLeft}{" "}
          days
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-blue-600 font-medium flex items-center gap-1">
          View Details
          <ArrowRightIcon className="w-4 h-4" />
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert("Update Status clicked");
          }}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Update Status
        </button>
      </div>
    </div>
  );
}
