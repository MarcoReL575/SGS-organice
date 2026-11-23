import { DropdownMenuButton } from "@/src/shared/components/DropdownMenuButton";
import { useModalStore } from "@/src/shared/store/useModalStore";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export interface IDataInfo {
    clientId: string;
    clientName: string;
}
interface Props {
    linkToEdit: string;
    dataInfo: IDataInfo
}

export default function ButtonOptionsClients({ linkToEdit, dataInfo }: Props) {

    const { setOpen} = useModalStore();
    const handleOpenModalDeleteClient = async()=> {
        setOpen('modalDeleteClient', dataInfo);
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
                    onCLick: handleOpenModalDeleteClient,
                    variant: 'destructive' 
                }
            ]}
        />
  )
}
