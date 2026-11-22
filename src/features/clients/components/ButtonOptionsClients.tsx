import { DropdownMenuButton } from "@/src/shared/components/DropdownMenuButton";
import { useModalStore } from "@/src/shared/store/useModalStore";
import { IconEdit, IconTrash } from "@tabler/icons-react";

interface Props {
    linkToEdit: string;
    clientId: string
}

export default function ButtonOptionsClients({ linkToEdit, clientId }: Props) {

    const { setOpen} = useModalStore();
    const handleDeleteClient = async()=> {
        setOpen('modalDeleteClient');
        console.log('ClienteEliminado');
    }

  return (
        <DropdownMenuButton
            options={[
                {
                    label: 'Editar',
                    icon: <IconEdit />,
                    href: linkToEdit
                },
                {
                    label: 'Eliminar',
                    icon: <IconTrash />,
                    onCLick: handleDeleteClient,
                    variant: 'destructive' 
                }
            ]}
        />
  )
}
