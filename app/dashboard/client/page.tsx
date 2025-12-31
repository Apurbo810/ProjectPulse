import { getAuthUser } from "@/lib/getAuthUser";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import Feedback from "@/models/Feedback";
import ClientProjectList from "@/components/client/ClientProjectList";

export default async function ClientDashboard() {
  const user = await getAuthUser();
  await connectDB();

  const projects = await Project.find({
    clientId: user.userId,
  }).lean();

  const feedbacks = await Feedback.find({
    clientId: user.userId,
  })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="rounded-2xl bg-white/80 backdrop-blur border border-gray-200 shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          My Projects
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          View project status and submit feedback
        </p>
      </div>

      {/* Project List */}
      <ClientProjectList
        projects={projects}
        feedbacks={feedbacks}
      />
    </div>
  );
}
