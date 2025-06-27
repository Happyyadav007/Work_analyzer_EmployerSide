import React, { useState } from "react";
import { FaFilePdf, FaImage, FaFileAlt, FaEye } from "react-icons/fa";
import { MdDelete, MdDownload, MdHistory } from "react-icons/md";

const ROLE_PERMISSIONS = {
  siteEngineer: { upload: true, view: true, delete: false },
  projectManager: { upload: true, view: true, delete: true },
  procurement: { upload: true, view: true, delete: false },
  admin: { upload: true, view: true, delete: true },
  client: { upload: false, view: true, delete: false },
};

const sampleFiles = [
  {
    id: 1,
    name: "GroundFloor_Plan_Rev3.pdf",
    type: "pdf",
    category: "2D Drawings",
    milestone: "Phase 1",
    description: "Latest updated layout",
    tags: ["floorplan", "rev3", "ground floor"],
    uploader: "Alice (Designer)",
    uploadDate: "2025-06-01T09:15:00Z",
    url: "/docs/GroundFloor_Plan_Rev3.pdf",
    versions: [
      {
        version: 1,
        date: "2025-05-20",
        uploader: "Alice",
        url: "/docs/GroundFloor_Plan_Rev1.pdf",
      },
      {
        version: 2,
        date: "2025-05-25",
        uploader: "Bob",
        url: "/docs/GroundFloor_Plan_Rev2.pdf",
      },
      {
        version: 3,
        date: "2025-06-01",
        uploader: "Alice",
        url: "/docs/GroundFloor_Plan_Rev3.pdf",
      },
    ],
    clientAccess: true,
  },
  {
    id: 2,
    name: "Kitchen_Render_3D.png",
    type: "image",
    category: "3D Models / Renders",
    milestone: "Design Approval",
    description: "3D view of kitchen concept",
    tags: ["kitchen", "3D", "render"],
    uploader: "Tom (Visualizer)",
    uploadDate: "2025-06-04T13:50:00Z",
    url: "/docs/Kitchen_Render_3D.png",
    versions: [
      {
        version: 1,
        date: "2025-06-04",
        uploader: "Tom",
        url: "/docs/Kitchen_Render_3D.png",
      },
    ],
    clientAccess: true,
  },
  {
    id: 3,
    name: "Contractor_Work_Agreement.pdf",
    type: "pdf",
    category: "Contracts",
    milestone: "Phase 1",
    description: "Signed contractor agreement",
    tags: ["contract", "civil"],
    uploader: "Project Manager",
    uploadDate: "2025-05-15T10:00:00Z",
    url: "/docs/Contractor_Work_Agreement.pdf",
    versions: [
      {
        version: 1,
        date: "2025-05-15",
        uploader: "Project Manager",
        url: "/docs/Contractor_Work_Agreement.pdf",
      },
    ],
    clientAccess: false,
  },
  {
    id: 4,
    name: "Invoice_May2025.pdf",
    type: "pdf",
    category: "Invoices",
    milestone: "Procurement",
    description: "Final vendor invoice for May",
    tags: ["invoice", "vendor", "payment"],
    uploader: "Procurement Team",
    uploadDate: "2025-06-02T11:00:00Z",
    url: "/docs/Invoice_May2025.pdf",
    versions: [
      {
        version: 1,
        date: "2025-06-02",
        uploader: "Procurement Team",
        url: "/docs/Invoice_May2025.pdf",
      },
    ],
    clientAccess: false,
  },
  {
    id: 5,
    name: "Material_Specs_Lighting.pdf",
    type: "pdf",
    category: "Material Specs",
    milestone: "Phase 2",
    description: "Lighting brand specs",
    tags: ["lighting", "brand", "spec"],
    uploader: "Lighting Consultant",
    uploadDate: "2025-06-06T09:45:00Z",
    url: "/docs/Material_Specs_Lighting.pdf",
    versions: [
      {
        version: 1,
        date: "2025-06-06",
        uploader: "Lighting Consultant",
        url: "/docs/Material_Specs_Lighting.pdf",
      },
    ],
    clientAccess: true,
  },
  {
    id: 6,
    name: "Client_Meeting_Notes.docx",
    type: "doc",
    category: "Project Notes",
    milestone: "Weekly Review",
    description: "Summary of client feedback on June 5",
    tags: ["client", "feedback", "notes"],
    uploader: "Site Engineer",
    uploadDate: "2025-06-05T14:30:00Z",
    url: "/docs/Client_Meeting_Notes.docx",
    versions: [
      {
        version: 1,
        date: "2025-06-05",
        uploader: "Site Engineer",
        url: "/docs/Client_Meeting_Notes.docx",
      },
    ],
    clientAccess: false,
  },
];

export default function FilesDocsSection({ role = "projectManager" }) {
  const [files, setFiles] = useState(sampleFiles);
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);

  const can = ROLE_PERMISSIONS[role] || {};

  const FileIcon = ({ type }) => {
    switch (type) {
      case "pdf":
        return <FaFilePdf className="text-red-500 text-xl" />;
      case "image":
        return <FaImage className="text-blue-500 text-xl" />;
      default:
        return <FaFileAlt className="text-gray-500 text-xl" />;
    }
  };

  const openView = (file) => {
    setSelectedFile(file);
    setViewModal(true);
  };

  const openHistory = (file) => {
    setSelectedFile(file);
    setHistoryModal(true);
  };

  const handleDelete = (id) => {
    if (!can.delete) return alert("No permission to delete");
    if (window.confirm("Are you sure you want to delete this file?")) {
      setFiles((prev) => prev.filter((f) => f.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📁 Notes & Files Section</h2>

      <div className="space-y-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-white shadow border p-4 rounded flex justify-between"
          >
            <div className="flex gap-4">
              <FileIcon type={file.type} />
              <div>
                <h3 className="font-semibold text-lg">{file.name}</h3>
                <p className="text-sm text-gray-600">
                  {file.category} • Uploaded by {file.uploader} on{" "}
                  {new Date(file.uploadDate).toLocaleDateString()}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {file.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 text-xs px-2 py-0.5 rounded-full text-gray-700"
                    >
                      #{tag}
                    </span>
                  ))}
                  {file.milestone && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                      {file.milestone}
                    </span>
                  )}
                  {file.clientAccess && (
                    <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full">
                      Client Access
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 items-start text-lg">
              <button onClick={() => openView(file)} title="View">
                <FaEye className="text-blue-600 hover:text-blue-800" />
              </button>
              <a href={file.url} download title="Download">
                <MdDownload className="text-green-600 hover:text-green-800" />
              </a>
              <button onClick={() => openHistory(file)} title="Version History">
                <MdHistory className="text-gray-600 hover:text-gray-800" />
              </button>
              {can.delete && (
                <button onClick={() => handleDelete(file.id)} title="Delete">
                  <MdDelete className="text-red-600 hover:text-red-800" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      {viewModal && selectedFile && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-3xl w-full relative">
            <button
              onClick={() => setViewModal(false)}
              className="absolute top-2 right-3"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-3">{selectedFile.name}</h2>
            {selectedFile.type === "image" ? (
              <img
                src={selectedFile.url}
                alt={selectedFile.name}
                className="max-w-full"
              />
            ) : selectedFile.type === "pdf" ? (
              <embed
                src={selectedFile.url}
                type="application/pdf"
                width="100%"
                height="500px"
                className="border"
              />
            ) : (
              <p>Preview not available for this file type.</p>
            )}
          </div>
        </div>
      )}

      {/* History Modal */}
      {historyModal && selectedFile && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-xl w-full relative">
            <button
              onClick={() => setHistoryModal(false)}
              className="absolute top-2 right-3"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-3">Version History</h2>
            <ul className="space-y-3">
              {selectedFile.versions.map((ver, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="text-sm">
                      <strong>Version {ver.version}</strong> by {ver.uploader}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(ver.date).toLocaleString()}
                    </p>
                  </div>
                  <a
                    href={ver.url}
                    download
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Download
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
