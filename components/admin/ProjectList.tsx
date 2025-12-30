"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import HealthBadge from "@/components/admin/HealthBadge";

type Project = {
  _id: string;
  name: string;
  healthScore: number;
  status: "On Track" | "At Risk" | "Critical";
};

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading projects...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <Card
          key={project._id}
          className="transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-900">
                {project.name}
              </h2>

              <p className="text-sm text-gray-500">
                Health Score
              </p>
            </div>

            <HealthBadge status={project.status} />
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{project.healthScore}%</span>
            </div>

            <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  project.status === "On Track"
                    ? "bg-green-500"
                    : project.status === "At Risk"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${project.healthScore}%` }}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
