import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  return verifyToken(token);
}
