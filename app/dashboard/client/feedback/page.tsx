"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FeedbackForm from "@/components/client/FeedbackForm";

type Project = {
  _id: string;
  name: string;
};

export default function ClientFeedbackPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!projectId) {
      setError("Project not selected");
      setLoading(false);
      return;
    }

    fetch(`/api/projects/${projectId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load project");
        return res.json();
      })
      .then((data) => {
        setProject(data.project ?? data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load project details");
        setLoading(false);
      });
  }, [projectId]);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-10">
        Loading project…
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-red-100 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* ✅ PROJECT CONTEXT CARD */}
      <div className="rounded-2xl bg-white/80 backdrop-blur border border-gray-200 shadow-sm p-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Feedback for{" "}
          <span className="text-blue-600">
            {project?.name}
          </span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          You are submitting feedback for this project
        </p>
      </div>

      {/* Feedback Form */}
      <FeedbackForm projectId={projectId!} />
    </div>
  );
}
