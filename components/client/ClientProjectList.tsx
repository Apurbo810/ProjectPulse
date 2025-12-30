import HealthBadge from "@/components/admin/HealthBadge";
import Link from "next/link";

interface Props {
  projects: any[];
  feedbacks: any[];
}

function getStatus(score: number): "On Track" | "At Risk" | "Critical" {
  if (score >= 80) return "On Track";
  if (score >= 60) return "At Risk";
  return "Critical";
}

export default function ClientProjectList({ projects, feedbacks }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {projects.map((project) => {
        const lastFeedback = feedbacks.find(
          (f) => f.projectId.toString() === project._id.toString()
        );

        const status = getStatus(project.healthScore);

        return (
          <div key={project._id} className="border rounded-lg p-4 space-y-2">
            <h3 className="text-lg font-semibold">{project.name}</h3>

            {/* ✅ PERFECT MATCH */}
            <HealthBadge status={status} />

            <p className="text-sm text-gray-500">
              Last feedback:{" "}
              {lastFeedback
                ? new Date(lastFeedback.createdAt).toLocaleDateString()
                : "No feedback yet"}
            </p>

            <Link
              href={`/dashboard/client/feedback?projectId=${project._id}`}
              className="inline-block mt-2 text-blue-600 font-medium"
            >
              Submit Feedback →
            </Link>
          </div>
        );
      })}
    </div>
  );
}
