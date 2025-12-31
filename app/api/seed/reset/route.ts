export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Project from "@/models/Project";
import Feedback from "@/models/Feedback";
import Risk from "@/models/Risk";
import Checkin from "@/models/Checkin";
import { hashPassword } from "@/lib/auth";

/* =========================
   SHARED RESET LOGIC
========================= */
async function resetAndSeed() {
  await connectDB();

  // 🔥 FULL RESET
  await Promise.all([
    User.deleteMany({}),
    Project.deleteMany({}),
    Feedback.deleteMany({}),
    Risk.deleteMany({}),
    Checkin.deleteMany({}),
  ]);

  // 🌱 USERS
  const admin = await User.create({
    name: "Admin User",
    email: "admin@projectpulse.com",
    password: await hashPassword("admin123"),
    role: "admin",
  });

  const employees = await User.insertMany([
    {
      name: "Employee One",
      email: "employee1@projectpulse.com",
      password: await hashPassword("employee123"),
      role: "employee",
    },
    {
      name: "Employee Two",
      email: "employee2@projectpulse.com",
      password: await hashPassword("employee123"),
      role: "employee",
    },
    {
      name: "Employee Three",
      email: "employee3@projectpulse.com",
      password: await hashPassword("employee123"),
      role: "employee",
    },
    {
      name: "Employee Four",
      email: "employee4@projectpulse.com",
      password: await hashPassword("employee123"),
      role: "employee",
    },
  ]);

  const clients = await User.insertMany([
    {
      name: "Client One",
      email: "client1@projectpulse.com",
      password: await hashPassword("client123"),
      role: "client",
    },
    {
      name: "Client Two",
      email: "client2@projectpulse.com",
      password: await hashPassword("client123"),
      role: "client",
    },
    {
      name: "Client Three",
      email: "client3@projectpulse.com",
      password: await hashPassword("client123"),
      role: "client",
    },
  ]);

  const projects = await Project.insertMany([
    {
      name: "Website Revamp Project",
      description: "Corporate website redesign",
      clientId: clients[0]._id,
      employeeIds: [employees[0]._id, employees[1]._id],
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 86400000),
    },
    {
      name: "Ecommerce Platform",
      description: "New ecommerce platform",
      clientId: clients[1]._id,
      employeeIds: [employees[2]._id],
      startDate: new Date(),
      endDate: new Date(Date.now() + 45 * 86400000),
    },
    {
      name: "Mobile App Redesign",
      description: "Mobile UI overhaul",
      clientId: clients[2]._id,
      employeeIds: [employees[3]._id],
      startDate: new Date(),
      endDate: new Date(Date.now() + 60 * 86400000),
    },
  ]);

  return {
    message: "Database reset & reseeded successfully 🚀",
    credentials: {
      admin: { email: "admin@projectpulse.com", password: "admin123" },
      employee: { password: "employee123" },
      client: { password: "client123" },
    },
    projects,
  };
}

/* =========================
   GET → Browser friendly
========================= */
export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Reset disabled outside development" },
      { status: 403 }
    );
  }

  try {
    const result = await resetAndSeed();
    return NextResponse.json(result);
  } catch (error) {
    console.error("RESET GET ERROR:", error);
    return NextResponse.json(
      { error: "Reset failed" },
      { status: 500 }
    );
  }
}

/* =========================
   POST → Script / API
========================= */
export async function POST() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Reset disabled outside development" },
      { status: 403 }
    );
  }

  try {
    const result = await resetAndSeed();
    return NextResponse.json(result);
  } catch (error) {
    console.error("RESET POST ERROR:", error);
    return NextResponse.json(
      { error: "Reset failed" },
      { status: 500 }
    );
  }
}
