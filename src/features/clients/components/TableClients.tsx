'use client'

import { TableComponent } from '@/src/shared/components/table/TableComponent'
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '@/src/shared/components/ui/card'
import { createColumnHelper, createPaginatedRowModel, tableFeatures, useTable, rowPaginationFeature, 
    columnFilteringFeature, globalFilteringFeature, createFilteredRowModel, rowSortingFeature, createSortedRowModel } from '@tanstack/react-table';
import { ClientSelect } from '../types/clientsTypes';
import { clsx } from 'cn';
import ButtonOptionsClients from './ButtonOptionsClients';
import ButtonRecoverClient from './ButtonRecoverClient';
import { TablePagination } from '@/src/shared/components/table/TablePagination';
import SearchFilter from '@/src/shared/components/filters/SearchFilter';

interface Props {
    data: ClientSelect[];
}

const columnHelper = createColumnHelper<ClientSelect>();

export default function TableClients({ data }: Props) {

    const features = tableFeatures({
        rowPaginationFeature,
        columnFilteringFeature,
        globalFilteringFeature,
        rowSortingFeature,
        filteredRowModel: createFilteredRowModel(),
        sortedRowModel: createSortedRowModel(),
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
                const clientName = info.row.original.name;
                const clientIsActive = info.row.original.status;
                const dataInfo = {
                    clientId,
                    clientName
                }
                return (
                    <>
                        {clientIsActive === 'active'
                            ?   <ButtonOptionsClients  
                                    dataInfo={dataInfo}
                                    linkToEdit={`/dashboard/clientes/${clientId}/editar`}
                                />
                            :   <ButtonRecoverClient 
                                    clientId={clientId}
                                    clientName={clientName}
                                />
                        }
                    </>
                )
            }
        }),
    ];

    const table = useTable({
        features,
        columns,
        data,
        initialState: {
            globalFilter: ''
        }
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tabla De Clientes actuales de SGS-Organice</CardTitle>
                <CardDescription>Da seguimiento a todos los clientes a los que les ofreces algún tipo de servicio</CardDescription>
                <CardAction>
                    <SearchFilter 
                        placeholder='Buscar cliente...'
                        value={table.state.globalFilter ?? ''}
                        onChange={(value)=> table.setGlobalFilter(value)}
                    />
                </CardAction>
            </CardHeader>
            <CardContent>
               <TableComponent
                    table={table}
                    columnsLength={columns.length}
                    noResultsMessage="No se encontraron usuarios registrados."
                    getRowClassName={(row) =>
                        clsx(
                            row.original.status === 'active'
                                ? 'transition-opacity'
                                : 'opacity-30 transition-opacity'
                        )
                    }
                />
            </CardContent>
            <CardFooter>
                <TablePagination 
                    table={table}
                />
            </CardFooter>
        </Card>
    )
}
