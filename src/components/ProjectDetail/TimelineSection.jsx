import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const viewOptions = ["Weekwise", "Level-wise", "Category-wise"];

// Mock data for graph and cards
const mockData = {
  Weekwise: [
    { label: "Week 1", planned: 20, actual: 15, delay: 1 },
    { label: "Week 2", planned: 40, actual: 38, delay: 0 },
    { label: "Week 3", planned: 60, actual: 50, delay: 2 },
    { label: "Week 4", planned: 80, actual: 72, delay: 1 },
  ],
  "Level-wise": [
    { label: "Basement", planned: 100, actual: 100, delay: 0 },
    { label: "Ground Floor", planned: 100, actual: 95, delay: 1 },
    { label: "First Floor", planned: 100, actual: 75, delay: 3 },
  ],
  "Category-wise": [
    { label: "Foundation", planned: 100, actual: 100, delay: 0 },
    { label: "Electrical", planned: 80, actual: 60, delay: 2 },
    { label: "Interior", planned: 50, actual: 20, delay: 4 },
  ],
};

export default function TimelineSection() {
  const [selectedView, setSelectedView] = useState("Weekwise");

  const data = mockData[selectedView];

  const getStatus = (delay) => {
    if (delay === 0) return "🟢 On Schedule";
    if (delay <= 2) return "🟡 Minor Delay";
    return "🔴 Delayed";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Project Timeline Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor project progress across different dimensions and track
            performance metrics
          </p>
        </div>

        <div className="space-y-8">
          {/* 1. View Switcher */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Analysis View
            </h2>
            <div className="flex gap-2">
              {viewOptions.map((view) => (
                <button
                  key={view}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedView === view
                      ? "bg-slate-700 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                  onClick={() => setSelectedView(view)}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Line Graph */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Progress Analysis – {selectedView}
              </h2>
              <p className="text-gray-600 text-sm">
                Comparative view of planned vs actual progress with delay
                indicators
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={{ stroke: "#d1d5db" }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={{ stroke: "#d1d5db" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} />
                  <Line
                    type="monotone"
                    dataKey="planned"
                    stroke="#1f2937"
                    strokeWidth={4}
                    name="Planned Progress"
                    dot={{ r: 6, strokeWidth: 2, fill: "#1f2937" }}
                    activeDot={{ r: 8, strokeWidth: 2, fill: "#1f2937" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#059669"
                    strokeWidth={4}
                    name="Actual Progress"
                    dot={{ r: 6, strokeWidth: 2, fill: "#059669" }}
                    activeDot={{ r: 8, strokeWidth: 2, fill: "#059669" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="delay"
                    stroke="#dc2626"
                    strokeWidth={4}
                    name="Delay (days)"
                    dot={{ r: 6, strokeWidth: 2, fill: "#dc2626" }}
                    activeDot={{ r: 8, strokeWidth: 2, fill: "#dc2626" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3. Segment Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.map((segment, idx) => (
              <div
                key={idx}
                className="border border-gray-200 bg-white shadow-lg rounded-lg overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 tracking-wide">
                    {segment.label}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="px-6 py-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {segment.actual}%
                      </div>
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Current Progress
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-700">
                        {segment.planned}%
                      </div>
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Target Progress
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Schedule Variance
                      </span>
                      <span className="text-sm font-bold text-gray-800">
                        {segment.delay} day(s)
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {getStatus(segment.delay)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={() =>
                      alert(`Viewing details for ${segment.label}`)
                    }
                    className="w-full bg-slate-700 hover:bg-slate-800 text-white font-medium px-4 py-2 rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                  >
                    View Detailed Report
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 4. Full Detail List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Comprehensive Segment Analysis – {selectedView}
              </h2>
              <p className="text-gray-600 text-sm">
                Detailed breakdown of all segments with performance indicators
              </p>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                      Segment
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                      Planned Progress
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                      Actual Progress
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                      Schedule Variance
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((seg, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          {seg.label}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {seg.planned}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {seg.actual}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {seg.delay} day(s)
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium">
                          {getStatus(seg.delay)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
