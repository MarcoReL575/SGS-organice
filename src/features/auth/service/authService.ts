import { authRepository, IAuthRepository } from "./authRepository";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { LoginType, UserInsert, UserSelect } from "../types/types";

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

    async userExists(email: string) {
        try {
            const userExists = await this.authRepository.selectUser(email);
            if(userExists) {
                return { success: true, message: '', user: userExists }
            }
            return { success: false, message: 'El usuario no existe', user: {} as UserSelect }
        } catch (error) {
            return { success: false, message: 'El usuario no existe', user: {} as UserSelect }
        }
    }

    async login(data: LoginType) {
        const { email, password } = data;
        try {
            const userExists = await this.userExists(email);
            if(userExists?.user.id) {
                await auth.api.signInEmail({
                    body: {
                        email,
                        password
                    },
                    headers: await headers()
                });
                return { success: true, message: `Binvenido de nuevo, ${userExists.user.name}` };
            }
            return { success: false, message: 'Credenciales inválidas' }
        } catch (error) {
            return { success: false, message: 'El usuario no existe' }
        }
    }

    async createUser(userInfo: UserInsert) {
        try {
            const user = await this.authRepository.createUser(userInfo);
            return { success: true, message: 'El usuario fue creado correctamente', user }
        } catch (error) {
            return { success: false, message: 'Error al crear el usuario', user: {} as UserSelect }
        }
    }

    async selectAllUsers(email: string) {
        try {
            const userHasAdmin = await this.userExists(email);
            if(userHasAdmin.user.role !== 'admin') {
                return { success: false, message: 'El usuario no tiene los permisos necesarios', users: {} as UserSelect[] }
            }
            const usersList = await this.authRepository.selectAllUsers();
            return { success: true, message: '', users: usersList }
        } catch (error) {
            return { success: false, message: 'El usuario no tiene los permisos necesarios', users: {} as UserSelect[] }
        }
    }
} 

export const authService = new AuthService(authRepository);