import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaShareAlt,
  FaFileAlt,
} from "react-icons/fa";

const contactsData = [
  {
    id: 1,
    name: "John Doe",
    company: "ABC Construction",
    category: "Contractor",
    role: "Civil Engineer",
    phone: "+91 9876543210",
    email: "john.doe@abc.com",
    location: "Bengaluru, KA",
    assignedTask: "Foundation work",
    contactPerson: "John Doe",
    availability: "9 AM - 6 PM",
    contractDoc: "/docs/john_doe_contract.pdf",
    workStatus: "Active",
    notes: "Experienced in large-scale projects",
  },
  // Add more contacts as needed
];

const ContactsSection = () => {
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [filteredStatus, setFilteredStatus] = useState("All");

  const handleCategoryChange = (event) =>
    setFilteredCategory(event.target.value);
  const handleStatusChange = (event) => setFilteredStatus(event.target.value);

  const filteredContacts = contactsData.filter((contact) => {
    return (
      (filteredCategory === "All" || contact.category === filteredCategory) &&
      (filteredStatus === "All" || contact.workStatus === filteredStatus)
    );
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Contacts Section
      </h2>
      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <select
            value={filteredCategory}
            onChange={handleCategoryChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="All">All Categories</option>
            <option value="Contractor">Contractor</option>
            <option value="Vendor">Vendor</option>
            <option value="Supplier">Supplier</option>
            <option value="Consultant">Consultant</option>
            <option value="Team Member">Team Member</option>
          </select>
          <select
            value={filteredStatus}
            onChange={handleStatusChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Search by name"
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="space-y-4">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {contact.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {contact.role} at {contact.company}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  contact.workStatus === "Active"
                    ? "bg-green-100 text-green-800"
                    : contact.workStatus === "Completed"
                    ? "bg-blue-100 text-blue-800"
                    : contact.workStatus === "On Hold"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {contact.workStatus}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-sm text-gray-800">{contact.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-sm text-gray-800">{contact.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="text-sm text-gray-800">{contact.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Assigned Task</p>
                <p className="text-sm text-gray-800">{contact.assignedTask}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <a
                href={`tel:${contact.phone}`}
                className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
              >
                <FaPhoneAlt />
                <span>Call</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
              >
                <FaEnvelope />
                <span>Email</span>
              </a>
              <a
                href={`https://wa.me/${contact.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 flex items-center space-x-1"
              >
                <FaWhatsapp />
                <span>WhatsApp</span>
              </a>
              <a
                href={contact.contractDoc}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800 flex items-center space-x-1"
              >
                <FaFileAlt />
                <span>Contract</span>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 flex items-center space-x-1"
              >
                <FaShareAlt />
                <span>Share</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsSection;
