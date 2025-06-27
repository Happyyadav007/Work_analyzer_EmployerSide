import React, { useState } from "react";

const mockMaterials = [
  {
    id: 1,
    name: "Teak Wood Panel",
    image: "/images/teak-panel.jpg",
    imageLabel: "Kitchen Laminate Sample 2",
    category: "Woodwork",
    room: "Kitchen",
    status: "Not Purchased",
    location: "Kitchen Cabinet Top",
    vendor: {
      name: "ABC Woodworks",
      phone: "1234567890",
      email: "abc@wood.com",
    },
    purchaseDate: null,
    attachments: ["invoice1.pdf"],
    comments: "Pending budget approval",
  },
  {
    id: 2,
    name: "Hettich Hinge",
    image: "/images/hinge.jpg",
    imageLabel: "Cabinet Hinge Closeup",
    category: "Hardware",
    room: "Living Room",
    status: "Installed",
    location: "TV Unit Door",
    vendor: {
      name: "HingeMart",
      phone: "9876543210",
      email: "sales@hingemart.com",
    },
    purchaseDate: "2025-05-15",
    attachments: [],
    comments: "Installed last week",
  },
];

const roomOptions = ["All", "Living Room", "Kitchen", "Bedroom 1", "Bathroom"];
const statusOptions = ["All", "Installed", "Purchased", "Not Purchased"];

const MaterialsSection = () => {
  const [filterType, setFilterType] = useState("room"); // 'room' or 'status'
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filterData = (material) => {
    if (selectedFilter === "All") return true;
    return filterType === "room"
      ? material.room === selectedFilter
      : material.status === selectedFilter;
  };

  const groupedMaterials = mockMaterials.filter(filterData);

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">
        🧱 Material Section (My Project)
      </h2>

      {/* Filter Toggle Slider */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 bg-white p-2 rounded shadow">
          <button
            onClick={() => {
              setFilterType("room");
              setSelectedFilter("All");
            }}
            className={`px-4 py-2 rounded ${
              filterType === "room" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            🏠 Room-Wise
          </button>
          <button
            onClick={() => {
              setFilterType("status");
              setSelectedFilter("All");
            }}
            className={`px-4 py-2 rounded ${
              filterType === "status" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            🟢 Status-Wise
          </button>
        </div>

        {/* Filter Dropdown */}
        <select
          className="p-2 border rounded bg-white shadow"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          {(filterType === "room" ? roomOptions : statusOptions).map(
            (opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            )
          )}
        </select>
      </div>

      {/* Materials Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm table-auto">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="px-3 py-2">Image</th>
              <th className="px-3 py-2">Material Name</th>
              <th className="px-3 py-2">Image Label</th>
              <th className="px-3 py-2">Room</th>
              <th className="px-3 py-2">Location</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Vendor</th>
              <th className="px-3 py-2">Purchase Date</th>
              <th className="px-3 py-2">Attachments</th>
              <th className="px-3 py-2">Comments</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groupedMaterials.map((mat) => (
              <tr key={mat.id} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2">
                  <img
                    src={mat.image}
                    alt={mat.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-3 py-2">{mat.name}</td>
                <td className="px-3 py-2 italic text-xs">{mat.imageLabel}</td>
                <td className="px-3 py-2">{mat.room}</td>
                <td className="px-3 py-2">{mat.location}</td>
                <td className="px-3 py-2">{mat.category}</td>
                <td className="px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      mat.status === "Installed"
                        ? "bg-green-200 text-green-800"
                        : mat.status === "Purchased"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {mat.status}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <div className="text-sm">{mat.vendor.name}</div>
                  <a
                    href={`tel:${mat.vendor.phone}`}
                    className="text-blue-500 text-xs block"
                  >
                    📞 {mat.vendor.phone}
                  </a>
                  <a
                    href={`mailto:${mat.vendor.email}`}
                    className="text-blue-500 text-xs block"
                  >
                    ✉️ {mat.vendor.email}
                  </a>
                </td>
                <td className="px-3 py-2">{mat.purchaseDate || "—"}</td>
                <td className="px-3 py-2 text-xs">
                  {mat.attachments.length > 0
                    ? mat.attachments.map((file, idx) => (
                        <div key={idx}>
                          <a href="#" className="text-blue-500 underline">
                            {file}
                          </a>
                        </div>
                      ))
                    : "—"}
                </td>
                <td className="px-3 py-2 text-xs">{mat.comments}</td>
                <td className="px-3 py-2 text-xs space-y-1">
                  <button className="text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
                    Suggest Change
                  </button>
                  {mat.status === "Not Purchased" && (
                    <button className="text-green-700 bg-green-100 px-2 py-1 rounded block mt-1">
                      Request Purchase
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {groupedMaterials.length === 0 && (
              <tr>
                <td colSpan="12" className="text-center text-gray-500 py-6">
                  No materials found for selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaterialsSection;
