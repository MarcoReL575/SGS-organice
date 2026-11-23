'use client'

import { Button } from '@/src/shared/components/ui/button';
import { useModalStore } from '@/src/shared/store/useModalStore'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { IconX } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Props {
    title: string;
    description: string; 
    content: string;
    handleFunction: ()=> void; 
}

export default function ModalGlobal({ title, description, content, handleFunction }: Props) {
    const router = useRouter();
    const { isOpen, setClose } = useModalStore();

  return (
    <>
      <Dialog open={isOpen} onClose={()=> setClose()} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex w-screen justify-center items-center">
          <DialogPanel className="max-w-lg space-y-4 border bg-white px-12 pt-4 pb-6 flex flex-col rounded-lg justify-between">
            <div className='flex items-center justify-end'>
                <Button className='bg-red-500 hover:bg-red-400 transition-all duration-300 text-white font-bold' onClick={()=> setClose()}>
                    <IconX />
                </Button>
            </div>
                <DialogTitle className="font-bold text-center text-xl">{title}</DialogTitle>
                <Description className='text-gray-600 font-semibold'>{description}</Description>
                <p className='text-gray-500 text-sm text-center'>{content}</p>
                <div className="flex justify-end w-full gap-x-4  ">
                    <Button 
                        onClick={()=> setClose()} 
                        className={'bg-black text-white hover:bg-black/70 duration-300 transition-all'}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        className='bg-red-600 hover:bg-red-400 text-white font-semibold duration-300 transition-all'
                        onClick={handleFunction}
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