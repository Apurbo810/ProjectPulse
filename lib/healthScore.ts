import Project from "@/models/Project";
import Checkin from "@/models/Checkin";
import Feedback from "@/models/Feedback";
import Risk from "@/models/Risk";

export async function calculateProjectHealth(projectId: string) {
  // Get project
  const project = await Project.findById(projectId);
  if (!project) return;

  // Recent data (last 14 days)
  const since = new Date();
  since.setDate(since.getDate() - 14);

  const checkins = await Checkin.find({
    projectId,
    createdAt: { $gte: since },
  });

  const feedbacks = await Feedback.find({
    projectId,
    createdAt: { $gte: since },
  });

  const risks = await Risk.find({
    projectId,
    status: "Open",
  });

  // A) Client Satisfaction (0–30)
  let clientScore = 15;
  if (feedbacks.length) {
    const avg =
      feedbacks.reduce(
        (sum, f) => sum + f.satisfactionRating + f.communicationRating,
        0
      ) /
      (feedbacks.length * 2);
    clientScore = (avg / 5) * 30;
  }

  // B) Employee Confidence (0–30)
  let employeeScore = 15;
  if (checkins.length) {
    const avg =
      checkins.reduce((sum, c) => sum + c.confidenceLevel, 0) /
      checkins.length;
    employeeScore = (avg / 5) * 30;
  }

  // C) Timeline Progress (0–25)
  let timelineScore = 25;
  if (project.startDate && project.endDate && checkins.length) {
    const total =
      new Date(project.endDate).getTime() -
      new Date(project.startDate).getTime();
    const elapsed = Date.now() - new Date(project.startDate).getTime();
    const expected = Math.min((elapsed / total) * 100, 100);

    const actual =
      checkins.reduce((sum, c) => sum + c.completionPercent, 0) /
      checkins.length;

    if (actual < expected) {
      timelineScore = Math.max(0, 25 - (expected - actual));
    }
  }

  // D) Issues & Risks (−15)
  let penalty = 0;

  if (feedbacks.some((f) => f.flagIssue)) {
    penalty += 10;
  }

  const highRisks = risks.filter((r) => r.severity === "High").length;
  penalty += Math.min(highRisks * 5, 15);

  // Final score
  let healthScore =
    clientScore + employeeScore + timelineScore - penalty;

  healthScore = Math.max(0, Math.min(100, Math.round(healthScore)));

  let status: "On Track" | "At Risk" | "Critical" = "On Track";
  if (healthScore < 60) status = "Critical";
  else if (healthScore < 80) status = "At Risk";

  await Project.findByIdAndUpdate(projectId, {
    healthScore,
    status,
  });
}



