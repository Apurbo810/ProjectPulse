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
    return <p className="text-gray-500">Loading projects…</p>;
  }

  if (projects.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm text-center text-gray-500">
        You are not assigned to any projects yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => {
        const safeScore = Math.min(
          100,
          Math.max(0, project.healthScore ?? 0)
        );

        return (
          <div
            key={project._id}
            className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            {/* Info */}
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {project.name}
              </h3>

              <p className="text-sm text-gray-500">
                Status:{" "}
                <span className="font-medium text-gray-700">
                  {project.status}
                </span>
              </p>

              {/* Health % */}
              <p
                className={`text-sm font-medium ${
                  safeScore >= 80
                    ? "text-green-600"
                    : safeScore >= 60
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                Health: {safeScore}%
              </p>
            </div>

            {/* Action */}
            <Link
              href={`/dashboard/employee/checkin?projectId=${project._id}`}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              Weekly Check-In
            </Link>
          </div>
        );
      })}
    </div>
  );
}
