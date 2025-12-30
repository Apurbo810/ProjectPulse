"use client";

import HealthBadge from "./HealthBadge";

type Project = {
  _id: string;
  name: string;
  clientId?: { name: string };
  healthScore: number;
  status?: string;
};

export default function ProjectTable({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="w-full text-sm">
        {/* Table Head */}
        <thead className="bg-gray-50 text-gray-600">
            <tr className="border-b">
              <th className="px-6 py-4 text-left font-medium">Project</th>
              <th className="px-6 py-4 text-left font-medium">Client</th>
              <th className="px-6 py-4 text-left font-medium">Health</th>
              <th className="px-6 py-4 text-right font-medium">Score</th>
            </tr>
          </thead>

        {/* Table Body */}
        <tbody className="divide-y">
          {projects.map((p) => {
            const status =
              p.healthScore < 60
                ? "Critical"
                : p.healthScore < 80
                ? "At Risk"
                : "On Track";

            return (
              <tr
                key={p._id}
                className="transition hover:bg-gray-50"
              >
                {/* Project */}
                <td className="px-6 py-4 font-medium text-gray-900">
                  {p.name}
                </td>

                {/* Client */}
                <td className="px-6 py-4 text-gray-600">
                  {p.clientId?.name ?? "—"}
                </td>

                {/* Health */}
                <td className="px-6 py-4">
                  <HealthBadge status={status} />
                </td>

                {/* Score + progress */}
                <td className="px-6 py-4 text-right">
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-medium text-gray-900">
                      {p.healthScore}%
                    </span>

                    <div className="h-1.5 w-24 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          status === "On Track"
                            ? "bg-green-500"
                            : status === "At Risk"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${p.healthScore}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Empty state */}
      {projects.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No projects found
        </div>
      )}
    </div>
  );
}
