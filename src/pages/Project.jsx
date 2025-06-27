// src/pages/Project.jsx
import React, { useState, useEffect } from "react";
import { FiEdit, FiEye, FiUpload, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const mockProjects = [
  {
    id: 1,
    title: "Modern Villa",
    location: "Dubai, UAE",
    client: "Ali Hassan",
    type: "Residential",
    team: ["Sarah", "John"],
    status: "In Progress",
    budget: "$150,000",
    progress: 65,
  },
  {
    id: 2,
    title: "Office Tower",
    location: "Abu Dhabi, UAE",
    client: "XYZ Corp",
    type: "Commercial",
    team: ["Mina", "David"],
    status: "Completed",
    budget: "$1,200,000",
    progress: 100,
  },
];

const Project = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Simulate API call
    setProjects(mockProjects);
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Projects</h1>
        <Link
          to="/projects/new"
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <FiPlus className="mr-2" /> New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded shadow-md p-4 border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{project.title}</h2>
                <p className="text-sm text-gray-500">{project.location}</p>
                <p className="text-sm text-gray-700 mt-1">
                  Client: <span className="font-medium">{project.client}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Type: <span className="font-medium">{project.type}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Budget: <span className="font-medium">{project.budget}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      project.status === "Completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {project.status}
                  </span>
                </p>
                <p className="text-sm mt-2">
                  Progress:
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </p>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <Link
                  to={`/projects/view/${project.id}`}
                  className="text-blue-500 hover:underline flex items-center"
                >
                  <FiEye className="mr-1" /> View
                </Link>
                <Link
                  to={`/projects/edit/${project.id}`}
                  className="text-yellow-500 hover:underline flex items-center"
                >
                  <FiEdit className="mr-1" /> Edit
                </Link>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-600">Team:</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.team.map((member, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded"
                  >
                    {member}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button className="flex items-center text-sm text-indigo-600 hover:underline">
                <FiUpload className="mr-1" /> Upload Progress Image
              </button>
              <Link
                to={`/projects/${project.id}/documents`}
                className="text-sm text-gray-600 hover:underline"
              >
                View Docs
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
