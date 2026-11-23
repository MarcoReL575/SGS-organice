'use client'

import { TableComponent } from '@/src/shared/components/table/TableComponent'
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '@/src/shared/components/ui/card'
import { createColumnHelper, createPaginatedRowModel, tableFeatures, useTable, rowPaginationFeature } from '@tanstack/react-table';
import { ClientSelect } from '../types/clientsTypes';
import { clsx } from 'cn';
import { DropdownMenuButton } from '@/src/shared/components/DropdownMenuButton';
import { IconEdit } from '@tabler/icons-react';
import ButtonOptionsClients from './ButtonOptionsClients';

interface Props {
    data: ClientSelect[];
}

const columnHelper = createColumnHelper<ClientSelect>();

export default function TableClients({ data }: Props) {

    const features = tableFeatures({
        rowPaginationFeature,
        paginatedRowModel: createPaginatedRowModel(),
    });

    const columns = [
        columnHelper.accessor('name', {
            header: 'Nombre Cliente',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('contactName', {
            header: () => <span>Nombre Contacto</span>,
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('email', {
            header: () => <span>Correo de Contacto</span>,
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('phone', {
            header: () => <span>Teléfono de contacto</span>,
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('id', {
            header: () => <span>opciones</span>,
            cell: (info) => {
                const clientId = info.row.original.id
                const linToEdit = info.row.original.email;
                return (
                    <ButtonOptionsClients  
                        clientId={clientId}
                        linkToEdit={`/dashboard/clientes/editarCliente?=${clientId}`}
                    />
                )
            }
        }),
    ];

    const table = useTable({
        features,
        columns,
        data,
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tabla De Clientes actuales de SGS-Organice</CardTitle>
                <CardDescription>Da seguimiento a todos los clientes a los que les ofreces algún tipo de servicio</CardDescription>
                <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
               <TableComponent
                    table={table}
                    columnsLength={columns.length}
                    noResultsMessage="No se encontraron usuarios registrados."
                    getRowClassName={(row) =>
                        clsx(
                            row.original.status
                                ? 'transition-opacity'
                                : 'opacity-30 transition-opacity'
                        )
                    }
                />
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}
