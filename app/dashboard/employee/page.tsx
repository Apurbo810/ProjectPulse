import EmployeeNavbar from "@/components/employee/EmployeeNavbar";
import EmployeeProjectList from "@/components/employee/EmployeeProjectList";

export default function EmployeeDashboard() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl font-semibold">Employee Dashboard</h1>
          <EmployeeProjectList />
        </div>
      </div>
    </>
  );
}
