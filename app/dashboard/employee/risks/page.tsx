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
  const [confidence, setConfidence] = useState("3");
  const [completion, setCompletion] = useState("");
  const [mitigation, setMitigation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) =>
        setProjects(Array.isArray(data) ? data : data.projects ?? [])
      );
  }, []);

  const validateForm = () => {
    if (!projectId) return "Please select a project";
    if (!title.trim()) return "Risk title is required";
    if (!mitigation.trim()) return "Mitigation plan is required";

    const completionNum = Number(completion);
    if (completion === "")
      return "Completion percentage is required";
    if (completionNum < 0 || completionNum > 100)
      return "Completion must be between 0 and 100";

    return "";
  };

  const submitRisk = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const res = await fetch("/api/risks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId,
        title,
        severity,
        confidenceLevel: Number(confidence),
        completionPercentage: Number(completion),
        mitigationPlan: mitigation,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to report risk");
      return;
    }

    setMessage("⚠️ Risk reported successfully");

    // Reset form
    setProjectId("");
    setTitle("");
    setSeverity("Medium");
    setConfidence("3");
    setCompletion("");
    setMitigation("");
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">
        Report Project Risk
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}

      {message && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded">
          {message}
        </div>
      )}

      <form
        onSubmit={submitRisk}
        className="bg-white rounded-xl shadow-md p-6 space-y-4"
      >
        {/* Project */}
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
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Risk Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. API delay from third-party"
          />
        </div>

        {/* Severity */}
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

        {/* Confidence Level */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Confidence Level (1–5)
          </label>
          <select
            value={confidence}
            onChange={(e) => setConfidence(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="1">1 - Very Low</option>
            <option value="2">2 - Low</option>
            <option value="3">3 - Medium</option>
            <option value="4">4 - High</option>
            <option value="5">5 - Very High</option>
          </select>
        </div>

        {/* Completion % */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Completion %
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={completion}
            onChange={(e) => setCompletion(e.target.value)}
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
            className="w-full border rounded px-3 py-2 appearance-none"
            placeholder="0 – 100"
          />
        </div>

        {/* Mitigation */}
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

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded transition"
        >
          Submit Risk
        </button>
      </form>
    </div>
  );
}
