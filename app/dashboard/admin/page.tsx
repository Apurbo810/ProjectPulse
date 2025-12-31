"use client";

import { useEffect, useState } from "react";
import AdminStats from "@/components/admin/AdminStats";
import ProjectTable from "@/components/admin/ProjectTable";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : data.projects ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stats = {
    total: projects.length,
    onTrack: projects.filter((p) => Number(p.healthScore) >= 80).length,
    atRisk: projects.filter(
      (p) => Number(p.healthScore) >= 60 && Number(p.healthScore) < 80
    ).length,
    critical: projects.filter((p) => Number(p.healthScore) < 60).length,
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Admin Dashboard
        </h1>
      </div>

      {/* Stats Section */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-sky-50 border border-indigo-100 p-4 shadow-sm">
        <AdminStats {...stats} />
      </div>

      {/* Projects Section */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">
            Project Overview
          </h2>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-sm text-gray-500">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-sm text-gray-500">
              No projects found.
            </div>
          ) : (
            <ProjectTable projects={projects} />
          )}
        </div>
      </div>
    </div>
  );
}
