import ClientNavbar from "@/components/client/ClientNavbar";
import FeedbackForm from "@/components/client/FeedbackForm";

interface Props {
  searchParams: Promise<{
    projectId?: string;
  }>;
}

export default async function ClientFeedbackPage({ searchParams }: Props) {
  const { projectId } = await searchParams;

  if (!projectId) {
    return (
      <>
        <ClientNavbar />
        <div className="p-6">
          <p className="text-red-600">Project ID is missing.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <ClientNavbar />
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">Submit Weekly Feedback</h2>
        <FeedbackForm projectId={projectId} />
      </main>
    </>
  );
}
