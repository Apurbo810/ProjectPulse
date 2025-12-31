"use client";

import { useEffect, useState } from "react";

type Risk = {
  _id: string;
  title: string;
  severity: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Resolved";
};

const severityStyles = {
  Low: "bg-green-100 text-green-700 border border-green-200",
  Medium: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  High: "bg-red-100 text-red-700 border border-red-200",
};

const statusStyles = {
  Open: "bg-red-100 text-red-700 border border-red-200",
  "In Progress": "bg-blue-100 text-blue-700 border border-blue-200",
  Resolved: "bg-green-100 text-green-700 border border-green-200",
};

export default function AdminRisksPage() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/risks")
      .then((res) => res.json())
      .then((data) => {
        setRisks(Array.isArray(data) ? data : data.risks ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Project Risks
        </h1>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden">
        {/* Card Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">
            Risk List
          </h2>
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

            <tbody className="divide-y divide-gray-100">
              {risks.map((r) => (
                <tr
                  key={r._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {r.title}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${severityStyles[r.severity]}`}
                    >
                      {r.severity}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusStyles[r.status]}`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Loading State */}
          {loading && (
            <div className="p-8 text-center text-sm text-gray-500">
              Loading risks...
            </div>
          )}

          {/* Empty State */}
          {!loading && risks.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No risks found 🚀
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
