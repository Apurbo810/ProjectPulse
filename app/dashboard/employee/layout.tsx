import EmployeeNavbar from "@/components/employee/EmployeeNavbar";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EmployeeNavbar />
      <main className="p-6">{children}</main>
    </>
  );
}
