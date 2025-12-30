"use client";

import { useEffect, useState } from "react";

type Project = {
  _id: string;
  name: string;
};

export default function EmployeeRisksPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectId, setProjectId] = useState("");
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState("Medium");
  const [mitigation, setMitigation] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data =>
        setProjects(Array.isArray(data) ? data : [])
      );
  }, []);

  const submitRisk = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/risks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId,
        title,
        severity,
        mitigationPlan: mitigation,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Failed to report risk");
      return;
    }

    setMessage("⚠️ Risk reported successfully");
    setTitle("");
    setMitigation("");
    setProjectId("");
    setSeverity("Medium");
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">
        Report Project Risk
      </h1>

      {message && (
        <div className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded">
          {message}
        </div>
      )}

      <form onSubmit={submitRisk} className="card p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Project
          </label>
          <select
            required
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select project</option>
            {projects.map(p => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Risk Title
          </label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. API delay from third-party"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Severity
          </label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Mitigation Plan
          </label>
          <textarea
            value={mitigation}
            onChange={(e) => setMitigation(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="How will you reduce this risk?"
          />
        </div>

        <button className="btn-primary w-full">
          Submit Risk
        </button>
      </form>
    </div>
  );
}
