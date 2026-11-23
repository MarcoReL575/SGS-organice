import { Button } from '@/src/shared/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut } from '@/src/shared/components/ui/dropdown-menu'
import { IconDotsVertical, IconUserUp } from '@tabler/icons-react'
import { recoverUserAction } from '../actions/recoverUserAction'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { DropdownMenuButton } from '@/src/shared/components/DropdownMenuButton';

interface Props {
    userId: string;
    email: string;
}

export default function ButtonRecoverUser({ email, userId }: Props) {

    const router = useRouter();

    const handleRecoverUser = async()=> {
        const { success, message } = await recoverUserAction(userId, email);

        if(!success) {
            toast.error(message)
        }

        if(success) {
            toast.success(message);
            router.refresh();
        }
    }

    const options = [
        {
            label: 'Recuperar Usuario',
            icon: <IconUserUp />,
            onCLick: handleRecoverUser,
        }
    ]

  return (
    <DropdownMenuButton
        options={options}
    />
  )
}