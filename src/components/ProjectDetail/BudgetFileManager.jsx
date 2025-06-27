import React, { useState } from "react";
import {
  Download,
  Upload,
  Trash2,
  FileText,
  Calendar,
  Building,
  Package,
  Save,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const BudgetFileManager = () => {
  const [actualCost, setActualCost] = useState(82500);
  const [notes, setNotes] = useState(
    "Electrical costs increased due to concealed wiring request by client."
  );
  const [uploadedFile, setUploadedFile] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Sample data
  const budgetData = {
    segmentType: "Week",
    segmentName: "Week 1",
    projectName: "Penthouse Renovation – Mumbai",
    reportedBy: "Ravi Kumar",
    role: "Site Supervisor",
    dateRange: "June 1–7, 2025",
    expectedBudget: 80000,
    percentCompleted: 65,
    masterBudgetFile: {
      name: "Master_Budget_Week1.pdf",
      uploadedBy: "Project Manager",
      uploadedOn: "2025-05-28",
    },
  };

  const breakdownData = [
    {
      task: "Electrical Wiring",
      expectedCost: 30000,
      actualCost: 32000,
      variance: 2000,
      notes: "Client change order",
      hasInvoice: true,
    },
    {
      task: "Paint & Finish",
      expectedCost: 20000,
      actualCost: 20000,
      variance: 0,
      notes: "-",
      hasInvoice: true,
    },
    {
      task: "Lights & Fixtures",
      expectedCost: 30000,
      actualCost: 30500,
      variance: 500,
      notes: "Extra LED costs",
      hasInvoice: true,
    },
  ];

  const trendData = [
    { day: "Day 1", expected: 15000, actual: 16000 },
    { day: "Day 2", expected: 25000, actual: 26500 },
    { day: "Day 3", expected: 40000, actual: 42000 },
    { day: "Day 4", expected: 55000, actual: 58000 },
    { day: "Day 5", expected: 70000, actual: 74000 },
    { day: "Day 6", expected: 80000, actual: 82500 },
  ];

  const auditLog = [
    {
      action: "Actual cost updated from ₹75,000 → ₹82,500",
      user: "Site Supervisor Ravi",
      date: "06 June 2025",
      type: "update",
    },
    {
      action: "Budget report uploaded",
      user: "Ravi",
      date: "06 June 2025",
      type: "upload",
    },
    {
      action: 'Notes added: "Material rates hiked due to urgency."',
      user: "Ravi",
      date: "06 June 2025",
      type: "note",
    },
  ];

  const variance = actualCost - budgetData.expectedBudget;
  const variancePercent = (
    (variance / budgetData.expectedBudget) *
    100
  ).toFixed(1);

  const getStatusInfo = () => {
    if (variance > budgetData.expectedBudget * 0.1)
      return { color: "bg-red-500", text: "Over Budget", icon: "🔴" };
    if (variance > budgetData.expectedBudget * 0.05)
      return { color: "bg-yellow-500", text: "Near Limit", icon: "🟡" };
    return { color: "bg-green-500", text: "On Track", icon: "🟢" };
  };

  const status = getStatusInfo();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: file.size,
        uploadedBy: "Ravi Kumar",
        uploadedOn: new Date().toLocaleDateString(),
      });
    }
  };

  const handleSubmitReport = () => {
    alert("Report submitted successfully!");
  };

  const addComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          text: newComment,
          user: "Ravi Kumar",
          timestamp: new Date().toLocaleString(),
          type: "public",
        },
      ]);
      setNewComment("");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getSegmentIcon = () => {
    switch (budgetData.segmentType) {
      case "Week":
        return <Calendar className="w-4 h-4" />;
      case "Level":
        return <Building className="w-4 h-4" />;
      case "Category":
        return <Package className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900">
                Budget Details – {budgetData.segmentName}
              </h1>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {getSegmentIcon()}
                <span className="ml-1">{budgetData.segmentType}wise</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Project:</span>
              <p className="font-medium">{budgetData.projectName}</p>
            </div>
            <div>
              <span className="text-gray-500">Reported by:</span>
              <p className="font-medium">
                {budgetData.reportedBy}, {budgetData.role}
              </p>
            </div>
            <div>
              <span className="text-gray-500">Date Range:</span>
              <p className="font-medium">{budgetData.dateRange}</p>
            </div>
          </div>
        </div>

        {/* Budget Summary Box */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Budget Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Expected Budget</p>
              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(budgetData.expectedBudget)}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Actual Cost</p>
              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(actualCost)}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Variance</p>
              <p
                className={`text-xl font-bold ${
                  variance >= 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {variance >= 0 ? "+" : ""}
                {formatCurrency(variance)}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">% Completed</p>
              <p className="text-xl font-bold text-gray-900">
                {budgetData.percentCompleted}%
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Status</p>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">{status.icon}</span>
                <span className="font-bold text-sm">{status.text}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editable Fields Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Update Actuals</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Actual Cost (₹)
                </label>
                <input
                  type="number"
                  value={actualCost}
                  onChange={(e) => setActualCost(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes / Justification
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Explain variance or cost issues..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {notes.length}/500 characters
                </p>
              </div>
            </div>
          </div>

          {/* Master Budget File & User Report */}
          <div className="space-y-6">
            {/* Master Budget File */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Master Budget File</h2>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="font-medium">
                      {budgetData.masterBudgetFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Uploaded by {budgetData.masterBudgetFile.uploadedBy} on{" "}
                      {budgetData.masterBudgetFile.uploadedOn}
                    </p>
                  </div>
                </div>
                <button className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* User Budget Report Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">
                Upload Budget Report
              </h2>

              {!uploadedFile ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">
                    Upload PDF, Excel, or Image
                  </p>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.xlsx,.xls,.jpg,.jpeg,.png"
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Choose File
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-xs text-gray-500">
                        Uploaded by {uploadedFile.uploadedBy} on{" "}
                        {uploadedFile.uploadedOn}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Report Button */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <button
            onClick={handleSubmitReport}
            className="w-full md:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            <Save className="w-5 h-5" />
            <span>Submit Report</span>
          </button>
        </div>

        {/* Budget Breakdown Table */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Budget Breakdown</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Task/Item
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">
                    Expected Cost
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">
                    Actual Cost
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">
                    Variance
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Invoice
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {breakdownData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium">{item.task}</td>
                    <td className="py-3 px-4 text-right">
                      {formatCurrency(item.expectedCost)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {formatCurrency(item.actualCost)}
                    </td>
                    <td
                      className={`py-3 px-4 text-right font-medium ${
                        item.variance > 0
                          ? "text-red-600"
                          : item.variance < 0
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {item.variance > 0 ? "+" : ""}
                      {formatCurrency(item.variance)}
                      {item.variance !== 0 && (
                        <span className="ml-1">
                          {item.variance > 0 ? "↑" : "↓"}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.hasInvoice && (
                        <button className="text-blue-600 hover:text-blue-800">
                          📎
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cost Trend Graph */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Cost Trend Analysis</span>
          </h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Line
                  type="monotone"
                  dataKey="expected"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Expected Cost"
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#EF4444"
                  strokeWidth={2}
                  name="Actual Cost"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Comments Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Comments & Communication</span>
            </h2>

            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{comment.user}</span>
                    <span className="text-xs text-gray-500">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{comment.text}</p>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">
                  No comments yet
                </p>
              )}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addComment}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Post
              </button>
            </div>
          </div>

          {/* Audit Trail */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Audit Trail</h2>

            <div className="space-y-3">
              {auditLog.map((log, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex-shrink-0 mt-1">
                    {log.type === "update" && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                    {log.type === "upload" && (
                      <Upload className="w-4 h-4 text-blue-600" />
                    )}
                    {log.type === "note" && (
                      <FileText className="w-4 h-4 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{log.action}</p>
                    <p className="text-xs text-gray-500">
                      by {log.user} ({log.date})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Permissions Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-blue-900">
              Current User Permissions
            </h3>
          </div>
          <p className="text-sm text-blue-800">
            As a <strong>Site Supervisor</strong>, you can view and edit costs,
            upload files, add notes, and submit reports for this budget segment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetFileManager;
