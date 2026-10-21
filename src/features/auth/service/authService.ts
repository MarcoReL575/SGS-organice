import { authRepository, IAuthRepository } from "./authRepository";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { LoginType } from "../../types/types";

class AuthService {
    constructor (
        private authRepository: IAuthRepository
    ) {}

    async existAdmin() { 
        try {
            const admin = await this.authRepository.selectAdmin();
            if(admin[0].id) {
                return { success: true, message: 'El admin ya existe' }  
            }
            return { success: false, message: '' } 
        } catch (error) {
            return { success: false, message: '' }  
        }
    }

    async login(data: LoginType) {
        const { email, password } = data;
        try {
            const userExists = await this.authRepository.selectUser(email);
            if(userExists) {
                await auth.api.signInEmail({
                    body: {
                        email,
                        password
                    },
                    headers: await headers()
                });
                return { success: true, message: `Binvenido de nuevo, ${userExists.name}` };
            }
            return { success: false, message: 'Credenciales inválidas' }
        } catch (error) {
            return { success: false, message: 'El usuario no existe' }
        }
    }
} 

export const authService = new AuthService(authRepository);