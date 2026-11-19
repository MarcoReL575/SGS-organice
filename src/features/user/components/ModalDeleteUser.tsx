'use client'

import { Button } from '@/src/shared/components/ui/button';
import { useModalStore } from '@/src/shared/store/useModalStore'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { IconX } from '@tabler/icons-react';

export default function ModalDeleteUser() {
    const { isOpen, setClose } = useModalStore();

    const handleDeleteUser = ()=> {
        console.log('eliminando usuario')
    }

  return (
    <>
      <Dialog open={isOpen} onClose={()=> setClose()} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel className="max-w-lg space-y-4 border bg-white px-12 pt-4 pb-12 rounded-lg">
           <div className='flex items-center justify-end'>
                <Button className='bg-red-500 hover:bg-red-400 transition-all duration-300 text-white font-bold' onClick={()=> setClose()}>
                    <IconX />
                </Button>
           </div>
            <DialogTitle className="font-bold">¿Deseas elminar al usuario?</DialogTitle>
            <Description>Toma en cuenta que esta acción no se puede revertir</Description>
            <p>¿Seguro que quieres continuar y eliminar al usuario?</p>
            <div className="flex gap-4">
                <Button 
                    onClick={()=> setClose()} 
                    className={'bg-black text-white hover:bg-black/70 duration-300 transition-all'}
                >
                    Cancelar
                </Button>
                <Button 
                    className='bg-red-600 hover:bg-red-400 text-white font-semibold duration-300 transition-all'
                    onClick={handleDeleteUser}
                >
                    Si, eliminar
                </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}