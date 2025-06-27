import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import {
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ArchiveBoxIcon,
  DocumentDuplicateIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

// Section Components
import OverviewSection from "../components/ProjectDetail/OverviewSection";
import DailyLogsSection from "../components/ProjectDetail/DailyLogsSection";
import BudgetTrackerSection from "../components/ProjectDetail/BudgetTrackerSection";
import TimelineSection from "../components/ProjectDetail/TimelineSection";
import MaterialsSection from "../components/ProjectDetail/MaterialsSection";
import ContactsSection from "../components/ProjectDetail/ContactsSection";
import FilesDocsSection from "../components/ProjectDetail/FilesDocsSection";
import InternalNotesSection from "../components/ProjectDetail/InternalNotesSection";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MyProjectDetail() {
  const { projectId } = useParams();
  const [tabs] = useState([
    { name: "Overview", icon: ClipboardDocumentCheckIcon },
    { name: "Daily Logs", icon: CalendarIcon },
    { name: "Budget Tracker", icon: CurrencyDollarIcon },
    { name: "Timeline", icon: ChartBarIcon },
    { name: "Materials", icon: ArchiveBoxIcon },
    { name: "Contacts", icon: UserGroupIcon },
    { name: "Files & Docs", icon: DocumentDuplicateIcon },
    { name: "Internal Notes", icon: ChatBubbleOvalLeftEllipsisIcon },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Project Detail: #{projectId}</h1>

      <Tab.Group>
        <Tab.List className="flex space-x-2 overflow-x-auto border-b pb-2 mb-4">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                classNames(
                  "flex items-center gap-2 px-4 py-2 text-sm rounded-md whitespace-nowrap",
                  selected
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                )
              }
            >
              <tab.icon className="h-5 w-5" />
              {tab.name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-4">
          <Tab.Panel>
            <OverviewSection />
          </Tab.Panel>
          <Tab.Panel>
            <DailyLogsSection />
          </Tab.Panel>
          <Tab.Panel>
            <BudgetTrackerSection />
          </Tab.Panel>
          <Tab.Panel>
            <TimelineSection />
          </Tab.Panel>
          <Tab.Panel>
            <MaterialsSection />
          </Tab.Panel>
          <Tab.Panel>
            <ContactsSection />
          </Tab.Panel>
          <Tab.Panel>
            <FilesDocsSection />
          </Tab.Panel>
          <Tab.Panel>
            <InternalNotesSection />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
