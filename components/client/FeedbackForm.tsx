"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function FeedbackForm({ projectId }: { projectId: string }) {
  const [loading, setLoading] = useState(false);

  async function submitFeedback(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      projectId,
      satisfaction: Number((form as any).satisfaction.value),
      communication: Number((form as any).communication.value),
      comments: (form as any).comments.value,
      flagIssue: (form as any).flagIssue.checked,
    };

    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);
    alert("Feedback submitted");
  }

  return (
    <form onSubmit={submitFeedback} className="space-y-4 max-w-md">
      <select name="satisfaction" required className="w-full border p-2">
        <option value="">Satisfaction (1–5)</option>
        {[1,2,3,4,5].map(n => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>

      <select name="communication" required className="w-full border p-2">
        <option value="">Communication (1–5)</option>
        {[1,2,3,4,5].map(n => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>

      <textarea
        name="comments"
        placeholder="Comments (optional)"
        className="w-full border p-2"
      />

      <label className="flex items-center gap-2">
        <input type="checkbox" name="flagIssue" />
        Flag an issue
      </label>

      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Feedback"}
      </Button>
    </form>
  );
}
