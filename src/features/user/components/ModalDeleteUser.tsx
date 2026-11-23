'use client'

import { Button } from '@/src/shared/components/ui/button';
import { useModalStore } from '@/src/shared/store/useModalStore'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { IconX } from '@tabler/icons-react';
import { deleteUserAction } from '../actions/deleteUserAction';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ModalGlobal from '@/src/shared/components/modal/ModalGlobal';

export default function ModalDeleteUser() {
    const router = useRouter();
    const { setClose, data: userId } = useModalStore();

    const handleDeleteUser = async()=> {
        const { success, message } = await deleteUserAction(userId);
        
        if(!success) {
            setClose();
            toast.error(message);
        }

        if(success) {
            setClose();
            toast.success(message);
            router.refresh();
        }

    }

  return (
    <>
        <ModalGlobal 
            title='¿Deseas elminar al usuario?'
            description='Toma en cuenta que esta acción no se puede revertir y los datos perdidos no se podrán recuperar'
            content='¿Seguro que deseas continuar y eliminar al usuario?'
            handleFunction={handleDeleteUser}
        />
    </>
  )
}