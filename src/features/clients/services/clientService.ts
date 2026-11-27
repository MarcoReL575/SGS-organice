import { requireAuth } from "@/src/lib/session";
import { ClientInsert, ClientSelect, SiteInfo, SiteInsert, SiteSelect } from "../types/clientsTypes"
import { clientRepository, IClientRepository } from "./clientRepository"
import { Role } from "../../auth/lib/session";
import { safeParse, User } from "better-auth";
import { siteClientSchema } from "../schemas/clientSchemas";

class ClientService {
    constructor(
        private clientRepository: IClientRepository
    ) {}

    async existsClient(clientName: string) {
        try {
            const isExists = await this.clientRepository.selectClient(clientName);
            if(!isExists?.name) return { success: false, message: '', client: isExists }

            return { success: true, message: 'El cliente con ese nombre ya existe', client: isExists } 
        } catch (error) {
            return { success: false, message: 'Error en obtener al cliente', client: {} as ClientSelect }
        }
    }

    async addNewClient(infoClient: ClientInsert) {
        const { success, message } = await this.existsClient(infoClient.name);
        if(success) return { success, message }
        
        try {
            await this.clientRepository.insertNewClient(infoClient);
            return { success: true, message: 'El cliente fue creado' }
        } catch (error) {
            return { success: false, message: 'Hubo un error al crear el cliente' }
        }
    }

    async getAllClients() {
        const { user } = await requireAuth();
        if(user.role === 'admin' || user.role === 'supervisor') {
            const clientsList = await this.clientRepository.selectAllClients();
            return { success: true, message: '', clients: clientsList }
        }
        return { success: false, message: 'El usuario no cuenta con los permisos necesarios', clients: [] }
    }
    
    async getClient(clientId: string, userRole: Role) {
        if(userRole !== 'admin') return { success: false, message: 'El usuario no tiene los permisos necesarios', client: {} as ClientSelect }

        try {
            const client = await this.clientRepository.selectClientById(clientId);
            return { success: true, message: '', client }
        } catch (error) {
            return { success: false, message: 'Hubo un error al obtener al cliente', client: {} as ClientSelect }
        }
    }

    async deleteClient(clientId: string, clientName: string) {

        try {
            await this.clientRepository.setDeleteClient(clientId);
            return { success: true, message: 'El cliente fue eliminado' }
        } catch (error) {
            return { success: false, message: 'Error al eliminar el cliente' }
        }
    }

    async recoverClient(clientId: string, clientName: string) {
        try {
            const { success, message } = await this.existsClient(clientName);
            if(!success) return { success, message: 'El usuario no esta registrado' }

            await this.clientRepository.setRecoverClient(clientId); 
            return { success: true, message: 'El cliente fue recuperado' }
        } catch (error) {
             return { success: true, message: 'Hubo un error al recuperar al cliente' }
        }
    }

    async updateInfoClient(userRole: Role, clientInfo: ClientInsert, clientId: string) {
        if(userRole !== 'admin') return { success: false, message: 'El usuario no tiene los permisos necesarios' }

        try {
            await this.clientRepository.updateClient(clientInfo, clientId);
            return { success: true, message: 'El cliente fue actualizado' }
        } catch (error) {
            return { success: false, message: 'Hubo un eror al actualizar al cliente' }
        }
    }


    async addSite(siteInfo: SiteInsert, userRole: Role) {
        if(userRole !=='supervisor') return { success: false, message: 'El usuario no tiene los permisos necesarios' }
    
        try {
            const { data, success } = siteClientSchema.safeParse(siteInfo);
            if(!success) return { success: false, message: 'Error de validación' }

            await this.clientRepository.insertSite(data);
            return { success: true, message: 'El sitio o sucursal fue agregada' }
        } catch (error) {
            return { success: false, message: 'Hubo un error al agregar el sitio o sucursal' }
        }
    }

    async getSitesClient(clientSlug: string) {
        try {
            const { success, client } = await this.existsClient(clientSlug);
            if(!client?.id) return { success: false, message: 'El cliente no existe', sites: [] as SiteInfo[] };

            const sites = await this.clientRepository.selectClientSites(client.id);
            return { success: true, message:'', sites }
        } catch (error) {
            return { success: false, message: 'Error al obtener los sitios', sites: [] as SiteInfo[] }
        }
    }

    async getSite(siteId: string) {
        try {
            const site = await this.clientRepository.selectSiteById(siteId);
            return { success: true, message: '', site }
        } catch (error) {
            return { success: false, message: 'Hubo un error al traer la información', site: {} as SiteSelect }
        }
    }
}

export const clientService = new ClientService(clientRepository)