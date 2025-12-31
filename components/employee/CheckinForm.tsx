"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Project = {
  _id: string;
  name: string;
};

export default function CheckinForm() {
  const searchParams = useSearchParams();
  const projectFromUrl = searchParams.get("projectId");

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectId, setProjectId] = useState("");
  const [progressSummary, setProgressSummary] = useState("");
  const [blockers, setBlockers] = useState("");
  const [confidenceLevel, setConfidenceLevel] = useState("3");
  const [completionPercent, setCompletionPercent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Load projects
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : data.projects ?? [];
        setProjects(list);
      });
  }, []);

  // 🔥 IMPORTANT: auto-set project from URL
  useEffect(() => {
    if (projectFromUrl) {
      setProjectId(projectFromUrl);
    }
  }, [projectFromUrl]);

  const validateForm = () => {
    if (!projectId) return "Please select a project";
    if (!progressSummary.trim())
      return "Progress summary is required";

    if (completionPercent === "")
      return "Completion percentage is required";

    const completionNum = Number(completionPercent);
    if (completionNum < 0 || completionNum > 100)
      return "Completion must be between 0 and 100";

    return "";
  };

  const submitCheckin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    const res = await fetch("/api/checkins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId,
        progressSummary,
        blockers,
        confidenceLevel: Number(confidenceLevel),
        completionPercent: Number(completionPercent),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Submission failed");
      return;
    }

    setMessage("✅ Weekly check-in submitted successfully");

    // Reset
    setProgressSummary("");
    setBlockers("");
    setConfidenceLevel("3");
    setCompletionPercent("");
  };

  return (
    <form
      onSubmit={submitCheckin}
      className="space-y-5 bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto"
    >
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

      {/* Project */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Project
        </label>
        <select
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

        {projectFromUrl && (
          <p className="text-xs text-gray-500 mt-1">
            Project pre-selected from dashboard
          </p>
        )}
      </div>

      {/* Progress */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Progress Summary
        </label>
        <textarea
          value={progressSummary}
          onChange={(e) => setProgressSummary(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Blockers */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Blockers / Challenges
        </label>
        <textarea
          value={blockers}
          onChange={(e) => setBlockers(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Confidence + Completion */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Confidence Level (1–5)
          </label>
          <select
            value={confidenceLevel}
            onChange={(e) => setConfidenceLevel(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="1">1 - Very Low</option>
            <option value="2">2 - Low</option>
            <option value="3">3 - Medium</option>
            <option value="4">4 - High</option>
            <option value="5">5 - Very High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Completion %
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={completionPercent}
            onChange={(e) => setCompletionPercent(e.target.value)}
            onWheel={(e) =>
              (e.target as HTMLInputElement).blur()
            }
            className="w-full border rounded px-3 py-2 appearance-none"
          />
        </div>
      </div>

      <button
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit Weekly Check-In"}
      </button>
    </form>
  );
}
