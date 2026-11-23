'use client'

import ModalDeleteClient from '@/src/features/clients/components/ModalDeleteClient';
import ModalDeleteUser from '@/src/features/user/components/ModalDeleteUser'
import { useModalStore } from '../../store/useModalStore';

const modalObject: any = {
    modalDeleteUser: ModalDeleteUser,
    modalDeleteClient: ModalDeleteClient,
};

export default function ModalRender() {
    const { type, isOpen } = useModalStore();
    if (!isOpen || !type) return null;

    const ModalToRender = modalObject[type];

    return <ModalToRender />;
}