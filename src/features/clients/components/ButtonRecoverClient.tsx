import { DropdownMenuButton } from '@/src/shared/components/DropdownMenuButton'
import { IconUserUp } from '@tabler/icons-react'
import { recoverClientAction } from '../actions/recoverClientAction'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface Props {
    clientId: string, 
    clientName: string
}

export default function ButtonRecoverClient({ clientId, clientName }: Props) {
    const router = useRouter();
    const handleRecoverClient = async()=> {
        const { success, message } = await recoverClientAction(clientId, clientName);
        if(!success) {
            toast.error(message);
        }

        if(success) {
            router.refresh();
            toast.success(message);
        }
    }

    const options = [
        {
            label: 'Recuperar cliente',
            icon:  <IconUserUp />,
            onCLick: handleRecoverClient,
        }
    ]

  return (
    <>
        <DropdownMenuButton 
            options={options}
        />
    </>
  )
}
