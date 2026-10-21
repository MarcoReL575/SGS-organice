'use server'

import { auth } from "@/src/lib/auth";
import { LoginType } from "../../types/types";
import { headers } from "next/headers";
import { authService } from "../service/authService";

export async function LoginAction(data: LoginType) {
    return await authService.login(data); 
}