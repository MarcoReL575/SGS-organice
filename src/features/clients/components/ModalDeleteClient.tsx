import ModalGlobal from '@/src/shared/components/modal/ModalGlobal';
import { Button } from '@/src/shared/components/ui/button';
import { useModalStore } from '@/src/shared/store/useModalStore'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

export default function ModalDeleteClient() {

    const { isOpen, setClose} = useModalStore();

    const handleDeleteClient = ()=> {
        console.log('eliminando cliente')
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