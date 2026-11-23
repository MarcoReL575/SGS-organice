import { requireAuth } from "@/src/lib/session";
import { ClientInsert } from "../types/clientsTypes"
import { clientRepository, IClientRepository } from "./clientRepository"

class ClientService {
    constructor(
        private clientRepository: IClientRepository
    ) {}

    async existsClient(clientName: string) {
        try {
            const isExists = await this.clientRepository.selectClient(clientName);
            if(!isExists?.name) return { success: false, message: '' }

            return { success: true, message: 'El cliente con ese nombre ya existe' } 
        } catch (error) {
            return { success: true, message: 'Error en obtener al cliente' }
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
        if(user.role !== 'admin') return { success: false, message: 'El usuario no cuenta con los permisos necesarios', clients: [] }

        const clientsList = await this.clientRepository.selectAllClients();
        return { success: true, message: '', clients: clientsList }
    }

}

export const clientService = new ClientService(clientRepository)