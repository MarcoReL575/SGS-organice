'use client'

import ModalGlobal from '@/src/shared/components/modal/ModalGlobal';
import { useModalStore } from '@/src/shared/store/useModalStore'
import { deleteClientAction } from '../actions/deleteClientAction';
import { IDataInfo } from './ButtonOptionsClients';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ModalDeleteClient() {

    const { setClose, data } = useModalStore();
    const dataInfo: IDataInfo = data;
    const router = useRouter();

    const handleDeleteClient = async()=> {

        const { success, message } = await deleteClientAction(dataInfo.clientId, dataInfo.clientName);
        if(!success) {
            toast.error(message);
        }

        if(success) {
            router.refresh();
            toast.success(message);
            setClose();
        }

    }
    
    return (
        <>
            <ModalGlobal 
                title='¿Deseas elminar al cliente?'
                description='Toma en cuenta que esta acción no se puede revertir y los datos perdidos no se podrán recuperar'
                content='¿Seguro que deseas continuar y eliminar al cliente?'
                handleFunction={handleDeleteClient}
            />
        </>
    )
}