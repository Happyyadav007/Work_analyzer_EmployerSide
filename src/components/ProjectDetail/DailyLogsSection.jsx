import React, { useEffect, useState } from "react";

// 🔧 Simple date formatting utilities
const formatDate = (date) => date.toISOString().split("T")[0];
const formatDisplayDate = (date) =>
  date.toLocaleDateString("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
const addDays = (date, days) => new Date(date.getTime() + days * 86400000);
const subDays = (date, days) => new Date(date.getTime() - days * 86400000);
const isToday = (date) => formatDate(date) === formatDate(new Date());
const isPastDue = (date) => new Date(date) < new Date().setHours(0, 0, 0, 0);

// 🧪 DEMO DATA with priorities and due dates
const demoTasks = [
  {
    id: 1,
    name: "Install Ceiling Lights",
    contractor: "Ramesh Electricals",
    contact: "9876543210",
    type: "standard",
    priority: "high",
    dueDate: "2025-06-07",
    estimatedHours: 4,
  },
  {
    id: 2,
    name: "Upload Approved Plumbing Layout",
    contractor: "PlumbLine Inc.",
    contact: "9876543211",
    type: "upload",
    priority: "medium",
    dueDate: formatDate(new Date()),
    estimatedHours: 1,
  },
  {
    id: 3,
    name: "Fix Gypsum Partitions",
    contractor: "BuildStruct Ltd.",
    contact: "9876543212",
    type: "standard",
    priority: "low",
    dueDate: formatDate(addDays(new Date(), 1)),
    estimatedHours: 6,
  },
  {
    id: 4,
    name: "Paint Interior Walls",
    contractor: "ColorCraft Painters",
    contact: "9876543213",
    type: "standard",
    priority: "medium",
    dueDate: formatDate(subDays(new Date(), 1)),
    estimatedHours: 8,
  },
];

export default function DailyLogsSection() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [delayedTasks, setDelayedTasks] = useState([]);
  const [openModalTask, setOpenModalTask] = useState(null);
  const [delayForm, setDelayForm] = useState({});
  const [filter, setFilter] = useState("all"); // all, pending, completed, overdue
  const [sortBy, setSortBy] = useState("priority"); // priority, dueDate, name

  useEffect(() => {
    // 💥 Always use fresh demoTasks on each load (dev-only)
    localStorage.setItem("demoDailyLogTasks", JSON.stringify(demoTasks));
    setTasks(demoTasks);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("demoDailyLogTasks", JSON.stringify(tasks));
      setDelayedTasks(tasks.filter((task) => task.status === "delayed"));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  }, [tasks]);

  // Filter and sort tasks
  const getFilteredTasks = () => {
    const selectedDateStr = formatDate(selectedDate);
    let filteredTasks = tasks.filter((task) => {
      // Show tasks due on selected date
      if (task.dueDate === selectedDateStr) return true;
      // Show delayed tasks transferred to selected date
      if (task.status === "delayed" && task.transferredTo === selectedDateStr)
        return true;
      // Show completed tasks that were completed on selected date
      if (task.completedDate === selectedDateStr) return true;
      // If selected date is today, show all pending tasks regardless of due date
      if (isToday(selectedDate) && !["done", "uploaded"].includes(task.status))
        return true;
      return false;
    });

    // Apply additional filters
    switch (filter) {
      case "pending":
        filteredTasks = filteredTasks.filter(
          (task) => !["done", "uploaded"].includes(task.status)
        );
        break;
      case "completed":
        filteredTasks = filteredTasks.filter((task) =>
          ["done", "uploaded"].includes(task.status)
        );
        break;
      case "overdue":
        filteredTasks = filteredTasks.filter(
          (task) =>
            isPastDue(task.dueDate) &&
            !["done", "uploaded"].includes(task.status)
        );
        break;
    }

    // Sort tasks
    return filteredTasks.sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "dueDate":
          return new Date(a.dueDate) - new Date(b.dueDate);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  };

  const filteredTasks = getFilteredTasks();
  const incompleteTasks = filteredTasks.filter(
    (task) => !["done", "uploaded"].includes(task.status)
  );
  const completedTasks = filteredTasks.filter((task) =>
    ["done", "uploaded"].includes(task.status)
  );
  const overdueTasks = tasks.filter(
    (task) =>
      isPastDue(task.dueDate) && !["done", "uploaded"].includes(task.status)
  );

  const handleMarkDone = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: "done",
              completedAt: new Date().toISOString(),
              completedDate: formatDate(new Date()),
            }
          : task
      )
    );
  };

  const handleUpload = (id) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.jpg,.png,.doc,.docx";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status: "uploaded",
                  uploadedFile: file.name,
                  completedAt: new Date().toISOString(),
                  completedDate: formatDate(new Date()),
                }
              : task
          )
        );
      }
    };
    input.click();
  };

  const handleDelaySubmit = () => {
    const { reason, otherReason, transferDate } = delayForm;
    if (!reason || !transferDate)
      return alert("Please fill all required fields.");

    setTasks((prev) =>
      prev.map((task) =>
        task.id === openModalTask.id
          ? {
              ...task,
              status: "delayed",
              delayReason: reason,
              otherReason,
              transferredTo: transferDate,
              delayedAt: new Date().toISOString(),
              originalDueDate: task.dueDate,
              dueDate: transferDate,
            }
          : task
      )
    );
    setOpenModalTask(null);
    setDelayForm({});
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 border-red-300 text-red-800";
      case "medium":
        return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "low":
        return "bg-green-100 border-green-300 text-green-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  const getTaskStatusColor = (task) => {
    if (task.status === "done" || task.status === "uploaded") {
      return "bg-green-50 border-green-200";
    }
    if (task.status === "delayed") {
      return "bg-orange-50 border-orange-200";
    }
    if (isPastDue(task.dueDate)) {
      return "bg-red-50 border-red-200";
    }
    return "bg-white border-gray-200";
  };

  const totalEstimatedHours = incompleteTasks.reduce(
    (sum, task) => sum + (task.estimatedHours || 0),
    0
  );
  const completionRate =
    filteredTasks.length > 0
      ? Math.round((completedTasks.length / filteredTasks.length) * 100)
      : 0;

  return (
    <section className="bg-white p-6 rounded-lg shadow-lg space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            🗓️ Daily Log — {formatDisplayDate(selectedDate)}
          </h2>
          {isToday(selectedDate) && (
            <p className="text-sm text-blue-600 font-medium">
              Today's Schedule
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedDate(new Date())}
            className={`px-3 py-1 rounded text-sm transition ${
              isToday(selectedDate)
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setSelectedDate(subDays(selectedDate, 1))}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm transition"
          >
            ← Previous
          </button>
          <button
            onClick={() => setSelectedDate(addDays(selectedDate, 1))}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm transition"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-800">Total Tasks</h3>
          <p className="text-2xl font-bold text-blue-900">
            {filteredTasks.length}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-sm font-medium text-green-800">Completed</h3>
          <p className="text-2xl font-bold text-green-900">
            {completedTasks.length}
          </p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <h3 className="text-sm font-medium text-orange-800">Pending</h3>
          <p className="text-2xl font-bold text-orange-900">
            {incompleteTasks.length}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h3 className="text-sm font-medium text-purple-800">Est. Hours</h3>
          <p className="text-2xl font-bold text-purple-900">
            {totalEstimatedHours}h
          </p>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-lg">
        <div className="flex gap-2">
          <label className="text-sm font-medium text-gray-700">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending Only</option>
            <option value="completed">Completed Only</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <div className="flex gap-2">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
            <option value="name">Name</option>
          </select>
        </div>

        {completionRate > 0 && (
          <div className="ml-auto">
            <span className="text-sm text-gray-600">Progress: </span>
            <span className="font-semibold text-blue-600">
              {completionRate}%
            </span>
          </div>
        )}
      </div>

      {/* Overdue Alert */}
      {overdueTasks.length > 0 && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <h3 className="text-red-800 font-semibold mb-2">
            ⚠️ {overdueTasks.length} Overdue Task
            {overdueTasks.length > 1 ? "s" : ""}
          </h3>
          <div className="text-sm text-red-700">
            {overdueTasks.map((task) => task.name).join(", ")}
          </div>
        </div>
      )}

      {/* Incomplete Tasks Section */}
      {incompleteTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            📋 Pending Tasks ({incompleteTasks.length})
          </h3>
          <div className="space-y-3">
            {incompleteTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onMarkDone={handleMarkDone}
                onUpload={handleUpload}
                onDelay={(task) => {
                  setOpenModalTask(task);
                  setDelayForm({
                    reason: "",
                    otherReason: "",
                    transferDate: formatDate(addDays(new Date(), 1)),
                  });
                }}
                getPriorityColor={getPriorityColor}
                getTaskStatusColor={getTaskStatusColor}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks Section */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            ✅ Completed Tasks ({completedTasks.length})
          </h3>
          <div className="space-y-3 opacity-75">
            {completedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onMarkDone={handleMarkDone}
                onUpload={handleUpload}
                onDelay={() => {}}
                getPriorityColor={getPriorityColor}
                getTaskStatusColor={getTaskStatusColor}
                isCompleted={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">📅</div>
          <p className="text-lg">
            No tasks scheduled for {formatDisplayDate(selectedDate)}
          </p>
          <p className="text-sm">
            Select a different date or add new tasks to get started.
          </p>
        </div>
      )}

      {/* Daily Summary */}
      {filteredTasks.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-semibold mb-2">📊 Daily Summary</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              ✅ Completed: {completedTasks.length}/{filteredTasks.length}
            </div>
            <div>⏱️ Est. Time Remaining: {totalEstimatedHours}h</div>
            <div>📈 Completion Rate: {completionRate}%</div>
          </div>

          {completedTasks.length === filteredTasks.length &&
            filteredTasks.length > 0 && (
              <button
                onClick={() => alert("Daily log submitted successfully! 🎉")}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
              >
                🎉 Submit Daily Log
              </button>
            )}
        </div>
      )}

      {/* Delayed Tasks History */}
      {delayedTasks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            📛 Delayed Tasks History ({delayedTasks.length})
          </h3>
          <div className="space-y-3">
            {delayedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-orange-50 p-4 rounded-lg border border-orange-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-orange-900">{task.name}</p>
                    <p className="text-sm text-orange-700">
                      Contractor: {task.contractor}
                    </p>
                    <p className="text-sm text-orange-700">
                      <strong>Reason:</strong> {task.delayReason}
                    </p>
                    {task.otherReason && (
                      <p className="text-sm text-orange-700">
                        <strong>Details:</strong> {task.otherReason}
                      </p>
                    )}
                  </div>
                  <div className="text-right text-sm text-orange-600">
                    <p>Original: {task.originalDueDate}</p>
                    <p>Moved to: {task.transferredTo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delay Modal */}
      {openModalTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              ⚠️ Delay Task: {openModalTask.name}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Reason for Delay
                </label>
                <select
                  value={delayForm.reason}
                  onChange={(e) =>
                    setDelayForm((f) => ({ ...f, reason: e.target.value }))
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select reason</option>
                  <option value="Labor unavailable">Labor unavailable</option>
                  <option value="Material not delivered">
                    Material not delivered
                  </option>
                  <option value="Drawing not approved">
                    Drawing not approved
                  </option>
                  <option value="Client decision pending">
                    Client decision pending
                  </option>
                  <option value="Weather conditions">Weather conditions</option>
                  <option value="Equipment malfunction">
                    Equipment malfunction
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {delayForm.reason === "Other" && (
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Specify Reason
                  </label>
                  <textarea
                    value={delayForm.otherReason}
                    onChange={(e) =>
                      setDelayForm((f) => ({
                        ...f,
                        otherReason: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Please specify the reason for delay..."
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Reschedule to Date
                </label>
                <input
                  type="date"
                  value={delayForm.transferDate}
                  onChange={(e) =>
                    setDelayForm((f) => ({
                      ...f,
                      transferDate: e.target.value,
                    }))
                  }
                  min={formatDate(new Date())}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setOpenModalTask(null);
                  setDelayForm({});
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelaySubmit}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
              >
                Submit Delay
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Task Card Component
function TaskCard({
  task,
  onMarkDone,
  onUpload,
  onDelay,
  getPriorityColor,
  getTaskStatusColor,
  isCompleted = false,
}) {
  return (
    <div
      className={`p-4 border rounded-lg shadow-sm transition-all hover:shadow-md ${getTaskStatusColor(
        task
      )}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4
              className={`font-semibold ${
                isCompleted ? "line-through text-gray-600" : "text-gray-800"
              }`}
            >
              {task.name}
            </h4>
            <span
              className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority?.toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            👷 {task.contractor} • ⏱️ {task.estimatedHours}h
          </p>
          {task.status === "delayed" && task.originalDueDate && (
            <p className="text-xs text-orange-600 mt-1">
              Moved from {task.originalDueDate}
            </p>
          )}
          {task.completedAt && (
            <p className="text-xs text-green-600 mt-1">
              Completed: {new Date(task.completedAt).toLocaleString("en-IN")}
            </p>
          )}
        </div>

        <a
          href={`tel:${task.contact}`}
          className="text-blue-600 hover:text-blue-800 transition text-sm"
        >
          📞 Call
        </a>
      </div>

      {!isCompleted && (
        <div className="flex gap-2 flex-wrap">
          {task.type === "upload" ? (
            <button
              onClick={() => onUpload(task.id)}
              disabled={task.status === "uploaded"}
              className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📎 Upload File
            </button>
          ) : (
            <button
              onClick={() => onMarkDone(task.id)}
              disabled={task.status === "done"}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✓ Mark Done
            </button>
          )}

          <button
            onClick={() => onDelay(task)}
            className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition text-sm"
          >
            ⚠️ Delay
          </button>
        </div>
      )}

      {task.uploadedFile && (
        <p className="text-xs text-green-600 mt-2">
          📎 Uploaded: {task.uploadedFile}
        </p>
      )}
    </div>
  );
}
