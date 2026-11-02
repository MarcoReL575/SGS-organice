'use server'
import { LoginType } from "../types/types";
import { authService } from "../service/authService";

export async function LoginAction(data: LoginType) {
    return await authService.login(data); 
}