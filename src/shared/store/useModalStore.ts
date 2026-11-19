import { create } from 'zustand'

export type ModalType = 'modalDeleteUser' | null

interface ModalStore {
    type: ModalType;
    isOpen: boolean;
    setOpen: (type: ModalType) => void;
    setClose: () => void
}

export const useModalStore = create<ModalStore>()((set) => ({
    type: null,
    isOpen: false,
    setOpen: (type )=> set({ isOpen: true, type }),
    setClose: ()=> set({ isOpen: false }) 
}))