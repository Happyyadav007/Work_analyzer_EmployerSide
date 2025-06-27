import React from "react";

export default function OverviewSection() {
  return (
    <section className="space-y-4 bg-white p-5 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Project Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
        <p>
          <strong>Project Name:</strong> New HQ Build
        </p>
        <p>
          <strong>Project Code:</strong> HQ2024
        </p>
        <p>
          <strong>Client:</strong> Acme Corp – John Doe (123-456-7890)
        </p>
        <p>
          <strong>Location:</strong> San Francisco, CA
        </p>
        <p>
          <strong>Project Manager:</strong> Jane Smith
        </p>
        <p>
          <strong>Team:</strong> ContractorX, Site Supervisor A
        </p>
        <p>
          <strong>Start Date:</strong> 2024-01-01
        </p>
        <p>
          <strong>End Date:</strong> 2024-12-31
        </p>
        <p>
          <strong>Days Remaining:</strong> 208
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className="text-blue-600 font-semibold">Ongoing</span>
        </p>
      </div>
    </section>
  );
}
