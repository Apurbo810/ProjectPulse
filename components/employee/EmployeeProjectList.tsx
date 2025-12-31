"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Project = {
  _id: string;
  name: string;
  status: string;
  healthScore: number;
};

export default function EmployeeProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.projects ?? [];
        setProjects(list);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-10">
        Loading your projects…
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="rounded-2xl bg-white/70 backdrop-blur p-8 shadow-md text-center text-gray-500">
        You are not assigned to any projects yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {projects.map((project) => {
        const safeScore = Math.min(
          100,
          Math.max(0, project.healthScore ?? 0)
        );

        const healthColor =
          safeScore >= 80
            ? "bg-green-500"
            : safeScore >= 60
            ? "bg-yellow-400"
            : "bg-red-500";

        return (
          <div
            key={project._id}
            className="group relative rounded-2xl border border-gray-200 bg-white/80 backdrop-blur shadow-sm p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {project.name}
                </h3>

                <span
                  className={`inline-block mt-1 rounded-full px-3 py-1 text-xs font-medium ${
                    project.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : project.status === "On Hold"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <Link
                href={`/dashboard/employee/checkin?projectId=${project._id}`}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
              >
                Check-In
              </Link>
            </div>

            {/* Health Section */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-500">
                  Project Health
                </span>
                <span
                  className={`font-medium ${
                    safeScore >= 80
                      ? "text-green-600"
                      : safeScore >= 60
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {safeScore}%
                </span>
              </div>

              <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-full ${healthColor} transition-all`}
                  style={{ width: `${safeScore}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
