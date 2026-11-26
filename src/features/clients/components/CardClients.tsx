import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import { ClientSelect } from "../types/clientsTypes";
import { IconEdit, IconMail, IconPhone, IconTrash, IconUser } from "@tabler/icons-react";
import { clsx } from "cn";
import Link from "next/link";
import { Button } from "@/src/shared/components/ui/button";
import { DropdownMenuButton } from "@/src/shared/components/DropdownMenuButton";

interface Props {
    client: ClientSelect;
}

export default function CardClients({ client }: Props) {

  return (
    <Card
        className={clsx(client.status !== 'active' && 'text-gray-400') }
    >
        <CardHeader >
            <CardTitle>{client.name}</CardTitle>
            <CardAction>
                <Button
                    disabled={client.status === 'inactive'}
                    variant={'outline'}
                    className='text-blue-600'
                >
                    <Link href={`/dashboard/clientes-sitios/${client.name}`}>
                        Ver sucursales
                    </Link>
                </Button>
            </CardAction>
        </CardHeader>
        <CardContent className=" space-y-2">
            <h3 className="text-xl font-semibold">Datos de Contacto:</h3>
            <div className="flex items-center justify-between">
                <p className="flex items-center gap-x-2"> <IconUser /> Nombre: </p>
                <span>{client.contactName}</span>
            </div>
            <div className="flex items-center justify-between">
                <p className="flex items-center gap-x-2"> <IconMail /> Correo:</p>
                <span>{client.email}</span>
            </div>
            <div className="flex items-center justify-between">
                <p className="flex items-center gap-x-2"> <IconPhone /> Teléfono:</p>
                <span>+{client.phone}</span>
            </div>           
        </CardContent>
    </Card>
  )
}
