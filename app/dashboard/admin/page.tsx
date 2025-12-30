"use client";

import { useEffect, useState } from "react";
import AdminStats from "@/components/admin/AdminStats";
import ProjectTable from "@/components/admin/ProjectTable";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) =>
        setProjects(Array.isArray(data) ? data : data.projects ?? [])
      );
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
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Overview of all projects and their current health
        </p>
      </div>

      {/* Stats */}
      <AdminStats {...stats} />

      {/* Projects */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Project Overview
          </h2>
        </div>
        <ProjectTable projects={projects} />
      </div>
    </div>
  );
}
