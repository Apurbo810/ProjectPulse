import CheckinForm from "@/components/employee/CheckinForm";

export default function WeeklyCheckinPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">
        Weekly Check-In
      </h1>

      <p className="text-gray-600 text-sm">
        Submit your weekly progress update for assigned projects.
      </p>

      <CheckinForm />
    </div>
  );
}
