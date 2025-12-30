"use client";

import { useEffect, useState } from "react";

type Project = {
  _id: string;
  name: string;
};

export default function CheckinForm() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectId, setProjectId] = useState("");
  const [progressSummary, setProgressSummary] = useState("");
  const [blockers, setBlockers] = useState("");
  const [confidenceLevel, setConfidenceLevel] = useState(3);
  const [completionPercent, setCompletionPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load assigned projects
  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data =>
        setProjects(Array.isArray(data) ? data : [])
      );
  }, []);

  const submitCheckin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const res = await fetch("/api/checkins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId,
        progressSummary,
        blockers,
        confidenceLevel,
        completionPercent,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMessage(data.error || "Submission failed");
      return;
    }

    setMessage("✅ Weekly check-in submitted successfully");
    setProgressSummary("");
    setBlockers("");
    setConfidenceLevel(3);
    setCompletionPercent(0);
  };

  return (
    <form onSubmit={submitCheckin} className="space-y-4 card p-6">
      {message && (
        <div className="text-sm bg-blue-50 text-blue-700 px-3 py-2 rounded">
          {message}
        </div>
      )}

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
          Progress Summary
        </label>
        <textarea
          required
          value={progressSummary}
          onChange={(e) => setProgressSummary(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Confidence Level (1–5)
          </label>
          <input
            type="number"
            min={1}
            max={5}
            value={confidenceLevel}
            onChange={(e) => setConfidenceLevel(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
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
            onChange={(e) => setCompletionPercent(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <button
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? "Submitting..." : "Submit Weekly Check-In"}
      </button>
    </form>
  );
}
