import { getAuthUser } from "@/lib/getAuthUser";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import Feedback from "@/models/Feedback";
import ClientNavbar from "@/components/client/ClientNavbar";
import ClientProjectList from "@/components/client/ClientProjectList";

export default async function ClientDashboard() {
  const user = await getAuthUser();
  await connectDB();

  const projects = await Project.find({ clientId: user.userId }).lean();

  const feedbacks = await Feedback.find({ clientId: user.userId })  
    .sort({ createdAt: -1 })
    .lean();

  return (
    <>
      <ClientNavbar />
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">My Projects</h2>

        <ClientProjectList
          projects={projects}
          feedbacks={feedbacks}
        />
      </main>
    </>
  );
}
