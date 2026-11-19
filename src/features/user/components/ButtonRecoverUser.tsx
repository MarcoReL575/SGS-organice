import { Button } from '@/src/shared/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut } from '@/src/shared/components/ui/dropdown-menu'
import { IconDotsVertical, IconUserUp } from '@tabler/icons-react'
import { recoverUserAction } from '../actions/recoverUserAction'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

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

  return (
    <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline"><IconDotsVertical /></Button>} />
        <DropdownMenuContent className="w-40 bg-white" align="start">
            <DropdownMenuGroup>
                <DropdownMenuItem
                    className='hover:text-red-500 duration-300 transition-all cursor-pointer'
                    onClick={handleRecoverUser}
                >
                    Recuperar Usuario 
                    <DropdownMenuShortcut><IconUserUp /></DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}