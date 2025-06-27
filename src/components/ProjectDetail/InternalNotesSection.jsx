import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

const InternalNotesSection = () => {
  // Dummy data
  const [alerts] = useState([
    {
      id: 1,
      message: "Critical deadline for Milestone 2 is in 3 days.",
    },
  ]);

  const [notifications] = useState([
    {
      id: 1,
      title: "Payment Reminder",
      message: "Final invoice due by next week.",
      viewed: true,
    },
    {
      id: 2,
      title: "Inspection Notice",
      message: "Inspection scheduled for Friday.",
      viewed: false,
    },
  ]);

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Flooring Layout Issue",
      description: "Tiles were not aligned properly in the entrance area.",
      tag: "Design",
      reminderDate: "2025-06-12",
    },
  ]);

  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    tag: "",
    reminderDate: "",
  });

  const handleAddNote = (e) => {
    e.preventDefault();
    const note = {
      ...newNote,
      id: Date.now(),
    };
    setNotes((prev) => [note, ...prev]);
    setNewNote({ title: "", description: "", tag: "", reminderDate: "" });
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 text-gray-800">
      {/* 🔔 Alert Section */}
      <section className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded shadow-sm flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-yellow-800">
            ⚠️ Project Alert
          </h3>
          {alerts.map((alert) => (
            <p key={alert.id} className="text-sm text-yellow-700">
              {alert.message}
            </p>
          ))}
        </div>
        <button className="text-yellow-700 hover:text-yellow-900 flex items-center space-x-1">
          <BsThreeDots className="text-xl" />
          <span className="text-sm">View More</span>
        </button>
      </section>

      {/* 📢 Notifications */}
      <section>
        <h2 className="text-xl font-semibold mb-3">📢 Notifications</h2>
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="bg-white border p-4 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{n.title}</h3>
                <p className="text-sm text-gray-600">{n.message}</p>
              </div>
              <div>
                <FaCheck
                  className={`text-xl ${
                    n.viewed ? "text-blue-500" : "text-gray-400"
                  }`}
                  title={n.viewed ? "Viewed" : "Sent"}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📝 Add Note Form */}
      <section className="bg-white p-4 border rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">➕ Add New Note</h2>
        <form onSubmit={handleAddNote} className="space-y-4">
          <input
            type="text"
            placeholder="Note Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            required
            className="w-full border rounded px-3 py-2"
          />

          <textarea
            placeholder="Description"
            value={newNote.description}
            onChange={(e) =>
              setNewNote({ ...newNote, description: e.target.value })
            }
            required
            className="w-full border rounded px-3 py-2 resize-y"
            rows={3}
          />

          <input
            type="text"
            placeholder="Tag (e.g. Delay, Design, Budget)"
            value={newNote.tag}
            onChange={(e) => setNewNote({ ...newNote, tag: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />

          <label className="block">
            Set Reminder:
            <input
              type="date"
              value={newNote.reminderDate}
              onChange={(e) =>
                setNewNote({ ...newNote, reminderDate: e.target.value })
              }
              className="border rounded px-3 py-1 mt-1"
            />
          </label>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Add Note
          </button>
        </form>
      </section>

      {/* 🗒️ Internal Notes View */}
      <section>
        <h2 className="text-xl font-semibold mb-3">📝 Internal Notes</h2>
        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white border p-4 rounded shadow-sm"
            >
              <h3 className="font-semibold">{note.title}</h3>
              <p className="text-sm text-gray-600">{note.description}</p>
              <div className="text-xs text-gray-500 mt-2">
                {note.tag && <span className="mr-4">🏷️ Tag: {note.tag}</span>}
                {note.reminderDate && (
                  <span>⏰ Reminder: {note.reminderDate}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default InternalNotesSection;
