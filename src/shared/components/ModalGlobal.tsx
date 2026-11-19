'use client'

import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { useModalStore } from '../store/useModalStore'
import { Button } from './ui/button'
import ModalDeleteUser from '@/src/features/user/components/ModalDeleteUser'

const modalObject: any = {
    modalDeleteUser: ModalDeleteUser,
};

export default function ModalGlobal() {
    const { type, isOpen } = useModalStore();
    if (!isOpen || !type) return null;

    const ModalToRender = modalObject[type];

    return <ModalToRender />;
}