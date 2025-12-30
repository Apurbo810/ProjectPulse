"use client";

import { useEffect, useState } from "react";

type Risk = {
  _id: string;
  title: string;
  severity: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Resolved";
};

const severityStyles = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
};

const statusStyles = {
  Open: "bg-red-100 text-red-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Resolved: "bg-green-100 text-green-700",
};

export default function AdminRisksPage() {
  const [risks, setRisks] = useState<Risk[]>([]);

  useEffect(() => {
    fetch("/api/risks")
      .then((res) => res.json())
      .then(setRisks);
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="rounded-xl bg-white shadow-sm">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Project Risks
          </h2>
          <p className="text-sm text-gray-500">
            Track and manage project risks
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 text-left font-medium">
                  Title
                </th>
                <th className="px-6 py-4 text-center font-medium">
                  Severity
                </th>
                <th className="px-6 py-4 text-center font-medium">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {risks.map((r) => (
                <tr
                  key={r._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {r.title}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${severityStyles[r.severity]}`}
                    >
                      {r.severity}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[r.status]}`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty state */}
          {risks.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No risks found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
