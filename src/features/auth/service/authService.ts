import { authRepository, IAuthRepository } from "./authRepository";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { LoginType, UserInsert, UserSelect } from "../types/types";
import { InvitationSelect } from "../../email/types/types";
import { authClient } from "@/src/lib/auth-client";
import { UserEditInsert } from "../../user/types/typeUser";

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

    async getUserById(userId: string) {
        try {
            const userExists = await this.authRepository.selectUserById(userId);
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
            console.error({error})
            return { success: false, message: 'El usuario no existe' }
        }
    }

    async logout() {
        await auth.api.signOut({
            headers: await headers()
        })
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

    async getInvitationByToken(token: string) {
        try {
            const invitation = await this.authRepository.selectInvitationByToken(token);
            return { success: true, message: '', invitation }
        } catch (error) {
            return { success: false, message: 'El correo no cuenta con una invitación', invitation: {} as InvitationSelect }
        }
    }

    async insertInvitationPasswordUser(email: string, password: string ) {
        try {
            // Verificamos que el usuario ya haya sido dado de alta en la base de datos por un admin
            const { success, user, message } = await this.userExists(email);
            if(!success) {
                return { success, message }
            }

            // Insertamos el password del usuario 
            await this.authRepository.registerPasswordInvitationUser(email, password, user.id);
            
            // Actualizamos el estado del usuario (marcamos el email como verificado)
            await this.authRepository.setStatuVerifiedEmail(user.id);
            
            // Invalidamos el token para que la invitación sea de un solo uso
            await this.authRepository.setToInvitationUsed(user.id);
            
            return { success: true, message: 'La password ha sido creada' }
        } catch (error) {
            console.error({error})
            return { success: false, message: 'Hubo un error al crear tu password' }
        }
    }

    async getInvitationsByUser(email: string) {
        try {
            const { success, user, message } = await this.userExists(email);
            if(!success) {
                return { success, message }
            }
            const invitation = await this.authRepository.selectInvitationsUser(email)
            if(!invitation.id) return { success: false, message: 'No se puede reenviar invitación al usuario', invitation: {} as InvitationSelect }

            return { success: true, message: '', invitation }
        } catch (error) {
            return { success: false, message: 'No se puede reenviar invitación al usuario', invitation: {} as InvitationSelect }
        }
    }

    async updateInfoUser(currentEmail: string, userInfo: UserEditInsert, userId: string) {
        try {
            const { user, success, message } = await this.userExists(currentEmail);
            if(!user.id || !success) return { success: false, message: 'No se encontro al usuario' }

            await this.authRepository.setUser(userInfo, userId);
            return { success: true, message: 'El usuario fue actualizado' }
        } catch (error) {
            return { success: false, message: 'Error al actualizar el usuario' }
        }
    }

    async deleteUser(userId: string) {
        try {
            const { user } = await this.getUserById(userId);
            if(!user.id) {
                return { success: false, message: 'No se pudo encontrar al usuario' }
            }

            await this.authRepository.setDeleteUser(userId);
            return { success: true, message: 'El usuario fue eliminado' }
        } catch (error) {
            return { success: false, message: 'Hubo un error al eliminar al usaurio' }
        }
    }

    async recoverUser(userId: string, email: string) {
        try {
            const { user, success, message } = await this.userExists(email);
            if(!user.id) return { success, message }

            await this.authRepository.recoverUser(userId);
            return { success: true, message: 'Usuario recuperado' }
        } catch (error) {
            return { success: false, message: 'Hubo un error al recuperar al usaurio' }
        }
    }
} 

export const authService = new AuthService(authRepository);