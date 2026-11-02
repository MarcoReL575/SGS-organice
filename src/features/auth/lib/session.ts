
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type Role = "admin" | "supervisor" | "ingeniero";

export async function getSession() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return session;
}

export async function requireAuth() {
    const session = await  auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/auth/login");
    }

    return session;
}

export async function requireRole(allowedRoles: Role[]) {
    const session = await requireAuth();

    if (!allowedRoles.includes(session.user.role as Role)) {
        redirect("/dashboard/home");
    }

    return session;
}

export async function requireAdmin() {
  return requireRole(["admin"]);
}

export async function requireSupervisorOrAdmin() {
  return requireRole(["admin", "supervisor"]);
}