// types/auth.d.ts
import { auth } from "@/src/lib/auth";
import { Role } from "../lib/session";

declare module "better-auth" {
    interface User {
        role: Role;
        isActive: boolean;
    }

    interface Session {
        user: User;
    }
}