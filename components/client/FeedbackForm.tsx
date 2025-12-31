"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function FeedbackForm({ projectId }: { projectId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function submitFeedback(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = e.currentTarget as any;

    const satisfactionRating = Number(form.satisfaction.value);
    const communicationRating = Number(form.communication.value);
    const comment = form.comments.value.trim();
    const flagIssue = form.flagIssue.checked;

    // ✅ Validation
    if (!satisfactionRating || satisfactionRating < 1 || satisfactionRating > 5) {
      setError("Please select satisfaction level (1–5)");
      return;
    }

    if (!communicationRating || communicationRating < 1 || communicationRating > 5) {
      setError("Please select communication level (1–5)");
      return;
    }

    if (flagIssue && !comment) {
      setError("Comments are required when flagging an issue");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId,
        satisfactionRating,   // ✅ MATCH BACKEND
        communicationRating,  // ✅ MATCH BACKEND
        comment,              // ✅ MATCH BACKEND
        flagIssue,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Failed to submit feedback");
      return;
    }

    setSuccess("✅ Feedback submitted successfully");
    form.reset();
  }

  return (
    <form
      onSubmit={submitFeedback}
      className="bg-white rounded-2xl shadow-lg p-6 space-y-5"
    >
      <p className="text-xs text-gray-400 text-center">
        Please confirm the project before submitting feedback
      </p>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded text-sm">
          {success}
        </div>
      )}

      {/* Satisfaction */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Satisfaction (1–5)
        </label>
        <select
          name="satisfaction"
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select rating</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Communication */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Communication (1–5)
        </label>
        <select
          name="communication"
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select rating</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Comments */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Comments
        </label>
        <textarea
          name="comments"
          rows={3}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Write your feedback here..."
        />
      </div>

      {/* Flag Issue */}
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="flagIssue" />
        Flag this as an issue
      </label>

      {/* Submit */}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Submitting..." : "Submit Feedback"}
      </Button>
    </form>
  );
}
