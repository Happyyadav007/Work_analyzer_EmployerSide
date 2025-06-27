import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  FileText,
  Upload,
  Users,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const BudgetTrackerSection = () => {
  const [viewMode, setViewMode] = useState("weekwise");
  const [selectedSegment, setSelectedSegment] = useState(null);

  const handleNavigateToInvoices = () => {
    // Navigate to main invoice page - replace with your routing logic
    // For React Router: navigate('/invoices')
    // For Next.js: router.push('/invoices')
    console.log("Navigate to main invoice page");
  };

  const handleViewInvoiceDetails = (invoiceId) => {
    // Navigate to specific invoice detail page
    // For React Router: navigate(`/invoices/${invoiceId}`)
    // For Next.js: router.push(`/invoices/${invoiceId}`)
    console.log("Navigate to invoice details for:", invoiceId);
  };

  // Sample invoice data - replace with actual data from your backend
  const recentInvoices = [
    {
      id: "INV-2024-001",
      vendor: "ABC Construction Materials",
      contact: "materials@abc.com",
      category: "Materials",
      amount: 125000,
      date: "2024-06-05",
      status: "Approved",
    },
    {
      id: "INV-2024-002",
      vendor: "Premium Furniture Co.",
      contact: "+91 98765-43210",
      category: "Furniture",
      amount: 85000,
      date: "2024-06-04",
      status: "Pending",
    },
    {
      id: "INV-2024-003",
      vendor: "Elite Labor Services",
      contact: "contact@elitelabor.com",
      category: "Labor",
      amount: 45000,
      date: "2024-06-03",
      status: "Approved",
    },
    {
      id: "INV-2024-004",
      vendor: "Metro Electrical Works",
      contact: "+91 87654-32109",
      category: "Electrical",
      amount: 32000,
      date: "2024-06-02",
      status: "Under Review",
    },
    {
      id: "INV-2024-005",
      vendor: "Quality Plumbing Solutions",
      contact: "info@qualityplumbing.com",
      category: "Plumbing",
      amount: 28000,
      date: "2024-06-01",
      status: "Rejected",
    },
    {
      id: "INV-2024-006",
      vendor: "Paint & Coating Specialists",
      contact: "+91 76543-21098",
      category: "Materials",
      amount: 18000,
      date: "2024-05-31",
      status: "Approved",
    },
  ];

  // Sample data - replace with actual data from your backend
  const budgetData = {
    weekwise: [
      {
        label: "Week 1",
        expected: 80000,
        actual: 90000,
        completion: 100,
        items: [
          {
            name: "Foundation Work",
            expected: 50000,
            actual: 55000,
            invoice: "foundation_invoice.pdf",
            notes: "Extra concrete needed",
          },
          {
            name: "Plumbing Setup",
            expected: 30000,
            actual: 35000,
            invoice: "plumbing_invoice.pdf",
            notes: "Additional pipes required",
          },
        ],
      },
      {
        label: "Week 2",
        expected: 70000,
        actual: 65000,
        completion: 95,
        items: [
          {
            name: "Electrical Work",
            expected: 40000,
            actual: 38000,
            invoice: "electrical_invoice.pdf",
            notes: "Efficient work completion",
          },
          {
            name: "Wall Construction",
            expected: 30000,
            actual: 27000,
            invoice: "wall_invoice.pdf",
            notes: "Material cost savings",
          },
        ],
      },
      {
        label: "Week 3",
        expected: 75000,
        actual: 82000,
        completion: 60,
        items: [
          {
            name: "Ceiling Work",
            expected: 20000,
            actual: 22000,
            invoice: "ceiling_invoice.pdf",
            notes: "Labor overtime due to scope change",
          },
          {
            name: "Paint + Primer",
            expected: 15000,
            actual: 14000,
            invoice: "paint_invoice.pdf",
            notes: "Bulk discount received",
          },
          {
            name: "Furniture Delivery",
            expected: 40000,
            actual: 46000,
            invoice: "furniture_invoice.pdf",
            notes: "Delay surcharge applied",
          },
        ],
      },
      {
        label: "Week 4",
        expected: 85000,
        actual: 78000,
        completion: 40,
        items: [
          {
            name: "Flooring",
            expected: 60000,
            actual: 55000,
            invoice: "flooring_invoice.pdf",
            notes: "Better rate negotiated",
          },
          {
            name: "Door Installation",
            expected: 25000,
            actual: 23000,
            invoice: "door_invoice.pdf",
            notes: "Standard installation",
          },
        ],
      },
    ],
    levelwise: [
      {
        label: "Ground Floor",
        expected: 300000,
        actual: 350000,
        completion: 80,
        items: [
          {
            name: "Foundation",
            expected: 150000,
            actual: 170000,
            invoice: "ground_foundation.pdf",
            notes: "Soil conditions required extra work",
          },
          {
            name: "Ground Utilities",
            expected: 150000,
            actual: 180000,
            invoice: "ground_utilities.pdf",
            notes: "Additional electrical points",
          },
        ],
      },
      {
        label: "1st Floor",
        expected: 200000,
        actual: 180000,
        completion: 60,
        items: [
          {
            name: "Structure Work",
            expected: 120000,
            actual: 110000,
            invoice: "first_structure.pdf",
            notes: "Efficient material usage",
          },
          {
            name: "Interior Work",
            expected: 80000,
            actual: 70000,
            invoice: "first_interior.pdf",
            notes: "Early completion bonus",
          },
        ],
      },
      {
        label: "2nd Floor",
        expected: 180000,
        actual: 190000,
        completion: 30,
        items: [
          {
            name: "Roofing",
            expected: 100000,
            actual: 110000,
            invoice: "roofing_invoice.pdf",
            notes: "Weather protection upgrades",
          },
          {
            name: "Terrace Work",
            expected: 80000,
            actual: 80000,
            invoice: "terrace_invoice.pdf",
            notes: "As per estimate",
          },
        ],
      },
    ],
    categorywise: [
      {
        label: "Materials",
        expected: 500000,
        actual: 460000,
        completion: 70,
        items: [
          {
            name: "Cement & Steel",
            expected: 300000,
            actual: 280000,
            invoice: "cement_steel.pdf",
            notes: "Bulk purchase discount",
          },
          {
            name: "Finishing Materials",
            expected: 200000,
            actual: 180000,
            invoice: "finishing_materials.pdf",
            notes: "Alternative materials used",
          },
        ],
      },
      {
        label: "Labor",
        expected: 300000,
        actual: 320000,
        completion: 65,
        items: [
          {
            name: "Skilled Labor",
            expected: 200000,
            actual: 220000,
            invoice: "skilled_labor.pdf",
            notes: "Overtime charges",
          },
          {
            name: "Helper Labor",
            expected: 100000,
            actual: 100000,
            invoice: "helper_labor.pdf",
            notes: "As planned",
          },
        ],
      },
      {
        label: "Furniture",
        expected: 400000,
        actual: 450000,
        completion: 50,
        items: [
          {
            name: "Custom Furniture",
            expected: 250000,
            actual: 280000,
            invoice: "custom_furniture.pdf",
            notes: "Design modifications",
          },
          {
            name: "Standard Furniture",
            expected: 150000,
            actual: 170000,
            invoice: "standard_furniture.pdf",
            notes: "Quality upgrade",
          },
        ],
      },
    ],
  };

  const currentData = budgetData[viewMode];
  const navigate = useNavigate();
  const getStatusInfo = (expected, actual) => {
    const percentage = (actual / expected) * 100;
    if (percentage <= 90)
      return {
        status: "Under Budget",
        color: "text-green-600 bg-green-100",
        icon: CheckCircle,
      };
    if (percentage <= 100)
      return {
        status: "On Track",
        color: "text-yellow-600 bg-yellow-100",
        icon: AlertTriangle,
      };
    return {
      status: "Over Budget",
      color: "text-red-600 bg-red-100",
      icon: AlertCircle,
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-blue-600">
            Expected: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-orange-600">
            Actual: {formatCurrency(payload[1].value)}
          </p>
          <p className="text-gray-600">
            Variance: {formatCurrency(payload[1].value - payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Budget Tracker
        </h1>
        <p className="text-gray-600">
          Monitor and compare expected vs actual project budgets
        </p>
      </div>

      {/* View Mode Toggle */}
      <div className="mb-6">
        <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
          {["weekwise", "levelwise", "categorywise"].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                viewMode === mode
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              {mode === "weekwise"
                ? "Week-wise"
                : mode === "levelwise"
                ? "Level-wise"
                : "Category-wise"}
            </button>
          ))}
        </div>
      </div>

      {/* Comparative Bar Graph */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Expected vs Actual Budget Comparison
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={currentData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="label" stroke="#666" fontSize={12} />
              <YAxis
                stroke="#666"
                fontSize={12}
                tickFormatter={(value) => `₹${value / 1000}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="expected"
                fill="#3B82F6"
                name="Expected Budget"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="actual"
                fill="#F97316"
                name="Actual Budget"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentData.map((segment, index) => {
          const statusInfo = getStatusInfo(segment.expected, segment.actual);
          const StatusIcon = statusInfo.icon;
          const variance = segment.actual - segment.expected;

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {segment.label}
                </h3>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full ${statusInfo.color}`}
                >
                  <StatusIcon className="w-3 h-3" />
                  <span className="text-xs font-medium">
                    {statusInfo.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Expected:</span>
                  <span className="font-semibold text-blue-600">
                    {formatCurrency(segment.expected)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Actual:</span>
                  <span className="font-semibold text-orange-600">
                    {formatCurrency(segment.actual)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Completion:</span>
                  <span className="font-semibold text-gray-800">
                    {segment.completion}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${segment.completion}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-sm text-gray-600">Deviation:</span>
                  <div
                    className={`flex items-center gap-1 font-semibold ${
                      variance > 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {variance > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>
                      {variance > 0 ? "+" : ""}
                      {formatCurrency(variance)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate(`/budgettracker/${segment.id}`)}
                className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                View Details →
              </button>
            </div>
          );
        })}
      </div>

      {/* Invoice Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Invoices
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Latest invoice submissions and approvals
            </p>
          </div>
          <button
            onClick={() => handleNavigateToInvoices()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            View All Invoices
          </button>
        </div>

        {/* Invoice Table/Grid */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-700 text-sm">
                  Invoice #
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700 text-sm">
                  Vendor
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700 text-sm">
                  Category
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700 text-sm">
                  Amount
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700 text-sm">
                  Date
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700 text-sm">
                  Status
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700 text-sm">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {recentInvoices.map((invoice, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-2">
                    <span className="font-medium text-blue-600">
                      #{invoice.id}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <div>
                      <p className="font-medium text-gray-800">
                        {invoice.vendor}
                      </p>
                      <p className="text-xs text-gray-500">{invoice.contact}</p>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {invoice.category}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="font-semibold text-gray-800">
                      {formatCurrency(invoice.amount)}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-gray-600 text-sm">
                      {invoice.date}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        invoice.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : invoice.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : invoice.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <button
                      onClick={() => handleViewInvoiceDetails(invoice.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">24</p>
            <p className="text-sm text-gray-600">Total Invoices</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">18</p>
            <p className="text-sm text-gray-600">Approved</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">4</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">2</p>
            <p className="text-sm text-gray-600">Rejected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTrackerSection;
