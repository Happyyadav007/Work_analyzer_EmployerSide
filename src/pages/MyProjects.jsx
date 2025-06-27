import React from "react";
import ProjectCard from "../components/ProjectCard";

const demoProjects = [
  {
    id: "1",
    name: "Website Redesign",
    client: "Acme Corp",
    location: "New York",
    progress: 70,
    budgetUsed: 35000,
    budgetTotal: 50000,
    startDate: "2024-01-15",
    endDate: "2024-07-01",
    daysLeft: 24,
    status: "Ongoing",
  },
  {
    id: "2",
    name: "Mobile App Development",
    client: "Beta Inc",
    location: "San Francisco",
    progress: 100,
    budgetUsed: 80000,
    budgetTotal: 80000,
    startDate: "2023-10-01",
    endDate: "2024-04-15",
    daysLeft: 0,
    status: "Completed",
  },
  {
    id: "3",
    name: "Data Migration",
    client: "Gamma LLC",
    location: "Chicago",
    progress: 40,
    budgetUsed: 10000,
    budgetTotal: 25000,
    startDate: "2024-05-01",
    endDate: "2024-12-01",
    daysLeft: 177,
    status: "On Hold",
  },
];

export default function MyProjects() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
