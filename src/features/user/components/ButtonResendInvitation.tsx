'use client'

import { Button } from '@/src/shared/components/ui/button'
import { IconSend } from '@tabler/icons-react'
import React from 'react'
import { createInvitatioAction } from '../../email/actions/createInvitatioAction';
import { resendInvitationAction } from '../../email/actions/resendInvitationAction';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Props {
    email: string
}

export default function ButtonResendInvitation({ email }: Props) {
    const router = useRouter();

    const handleSendInvitation = async()=> {
        const { success, message } = await resendInvitationAction(email);
        if(!success) {
            toast.error(message);
        }
        if(success) {
            toast.success(message);
            router.refresh();
        }
    }

  return (
    <Button 
        className='w-full rounded-lg border' 
        variant='outline'
        onClick={handleSendInvitation}
    >
        <IconSend />
        Reenviar Invitación
    </Button>
  )
}