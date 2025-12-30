"use client";

import { useEffect, useState } from "react";

export default function AdminProjectsPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [employeeIds, setEmployeeIds] = useState<string[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const clients = users.filter((u) => u.role === "client");
  const employees = users.filter((u) => u.role === "employee");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        clientId,
        employeeIds,
        startDate,
        endDate,
      }),
    });

    alert("Project created successfully");
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
  <div className="w-full max-w-2xl">
    <div className="max-w-2xl center">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white p-8 shadow-sm space-y-6"
      >
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Create Project
          </h2>
          <p className="text-sm text-gray-500">
            Add a new project and assign clients and employees
          </p>
        </div>

        {/* Project name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Name
          </label>
          <input
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Website Revamp Project"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="w-full rounded-md border px-3 py-2 min-h-90px focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Short project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Client */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client
          </label>
          <select
            className="w-full rounded-md border px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
          >
            <option value="">Select a client</option>
            {clients.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Employees */}
        <div>
          <p className="block text-sm font-medium text-gray-700 mb-2">
            Assign Employees
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {employees.map((e) => (
              <label
                key={e._id}
                className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={employeeIds.includes(e._id)}
                  onChange={(ev) =>
                    setEmployeeIds((prev) =>
                      ev.target.checked
                        ? [...prev, e._id]
                        : prev.filter((id) => id !== e._id)
                    )
                  }
                />
                {e.name}
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}