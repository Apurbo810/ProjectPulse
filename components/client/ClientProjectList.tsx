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
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((project) => {
        const lastFeedback = feedbacks.find(
          (f) => f.projectId.toString() === project._id.toString()
        );

        const status = getStatus(project.healthScore);

        return (
          <div
            key={project._id}
            className="group relative rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {project.name}
              </h3>

              <HealthBadge status={status} />
            </div>

            {/* Meta */}
            <p className="mt-3 text-sm text-gray-500">
              Last feedback:{" "}
              <span className="font-medium text-gray-700">
                {lastFeedback
                  ? new Date(
                      lastFeedback.createdAt
                    ).toLocaleDateString()
                  : "No feedback yet"}
              </span>
            </p>

            {/* Action */}
            <Link
              href={`/dashboard/client/feedback?projectId=${project._id}`}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Submit Feedback
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
