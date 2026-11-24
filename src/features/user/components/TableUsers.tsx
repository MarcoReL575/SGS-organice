'use client'

import { UserSelect } from '@/src/features/auth/types/types';
import { TableComponent } from '@/src/shared/components/table/TableComponent';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/shared/components/ui/card';
import { useTable, tableFeatures, rowPaginationFeature, createPaginatedRowModel, createColumnHelper, columnFilteringFeature, globalFilteringFeature, createFilteredRowModel } from '@tanstack/react-table';
import ButtonResendInvitation from './ButtonResendInvitation';
import { IconCheck } from '@tabler/icons-react';
import { ButtonOptionsUser } from './ButtonOptionsUser';
import { clsx } from 'cn';
import ButtonRecoverUser from './ButtonRecoverUser';
import SearchFilter from '@/src/shared/components/filters/SearchFilter';
import { TablePagination } from '@/src/shared/components/table/TablePagination';

interface Props {
    data: UserSelect[];
}

const columnHelper = createColumnHelper<UserSelect>();

const columns = [
    columnHelper.accessor('name', {
        header: 'Nombre',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('email', {
        id: 'email',
        header: () => <span>Correo</span>,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('role', {
        header: 'Role Usuario',
        cell: (info) => {
            const role = info.getValue();
            return (
                <div
                    className={clsx( 'capitalize font-semibold flex items-center justify-center rounded-lg py-0.5 text-white',
                        role === 'admin' && 'bg-blue-400 ',
                        role === 'supervisor' && 'bg-orange-400',
                        role === 'ingeniero' && 'bg-gray-400',
                    )}
                >
                    {role}
                </div>
            )
        },
    }),
    columnHelper.accessor('emailVerified', {
        header: 'Verificado',
        cell: (info) => {
            const verificado = info.getValue();
            const email = info.row.original.email;
            return (
                <div className='w-44'>
                    {verificado 
                        ? <span className='flex items-center justify-center gap-x-2 p-1 rounded-lg bg-green-400 text-white'> <IconCheck /> Verificado</span>
                        : <ButtonResendInvitation email={email} /> 
                    }
                </div>
            );
        },
    }),
    columnHelper.accessor('id', {
        header: 'Más Opciones',
        cell: (info) => {
            const userId = info.getValue();
            const userIsActive = info.row.original.isActive;
            const email = info.row.original.email;
            return (
                <div className='flex items-center justify-center'>
                    {userIsActive 
                        ?   <ButtonOptionsUser 
                                userId={userId} 
                                linkToEdit={`/dashboard/usuarios/editarUsuario?usuario=${userId}`} 
                            />
                        :   <ButtonRecoverUser email={email} userId={userId} />
                    }
                </div>
            )
        }
    }),

];

const features = tableFeatures({
    rowPaginationFeature,
    columnFilteringFeature,
    globalFilteringFeature,
    paginatedRowModel: createPaginatedRowModel(),
    filteredRowModel: createFilteredRowModel(),
});

export default function UsersTable({ data }: Props) {
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
                <CardTitle>Lista de usuarios registrados en SGS-Organice</CardTitle>
                <CardDescription>Da seguimiento a todos los usuarios que han sido dados de alta.</CardDescription>
                <CardAction>
                    <SearchFilter 
                        placeholder='Buscar usuario...'
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
                            row.original.isActive
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
    );
}