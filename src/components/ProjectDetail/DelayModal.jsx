import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { format } from "date-fns";

export default function DelayModal({ task, onClose, onSubmit }) {
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [transferredTo, setTransferredTo] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  const predefinedReasons = [
    "Labor unavailable",
    "Material not delivered",
    "Drawing not approved",
    "Client decision pending",
    "Other",
  ];

  const handleSubmit = () => {
    if (!reason) return alert("Please select a reason");
    const delayData = {
      reason,
      otherReason: reason === "Other" ? otherReason : null,
      transferredTo,
    };
    onSubmit(delayData);
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed z-50 inset-0">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded-lg p-6 z-50 w-full max-w-md shadow-xl relative">
          <Dialog.Title className="text-lg font-bold mb-4">
            ⚠️ Delay Task: {task.name}
          </Dialog.Title>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Reason for Delay
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border rounded px-2 py-1"
              >
                <option value="">Select reason</option>
                {predefinedReasons.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {reason === "Other" && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Other Reason
                </label>
                <input
                  type="text"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">
                Reschedule Task To:
              </label>
              <input
                type="date"
                value={transferredTo}
                onChange={(e) => setTransferredTo(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              Submit Delay
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
