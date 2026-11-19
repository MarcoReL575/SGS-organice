import { create } from 'zustand'

export type ModalType = 'modalDeleteUser' | null

interface ModalStore {
    type: ModalType;
    data: any
    isOpen: boolean;
    setOpen: (type: ModalType, data?: any) => void;
    setClose: () => void
}

export const useModalStore = create<ModalStore>()((set) => ({
    type: null,
    data: {},
    isOpen: false,
    setOpen: (type, data={} )=> set({ isOpen: true, type, data }),
    setClose: ()=> set({ isOpen: false }) 
}))