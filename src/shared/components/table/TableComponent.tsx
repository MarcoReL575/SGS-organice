'use client'

import { Table as TanstackTable, flexRender } from '@tanstack/react-table';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableFooter  } from '../ui/table';

interface DataTableProps<TData> {
    table: TanstackTable<TData>;
    columnsLength: number;
    noResultsMessage?: string;
    getRowClassName?: (row: Row<TData>) => string;
}

export function TableComponent<TData>({ table, columnsLength, noResultsMessage = "No hay resultados.", getRowClassName}: DataTableProps<TData>) {
    return (
        <Table className=''>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext()
                                      )}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} className={getRowClassName?.(row)}>
                            {row.getAllCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={columnsLength}
                            className="h-24 text-center"
                        >
                            {noResultsMessage}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            <TableFooter>
                {table.getFooterGroups().map((footerGroup) => (
                    <TableRow key={footerGroup.id}>
                        {footerGroup.headers.map((header) => (
                            <TableCell key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.footer,
                                          header.getContext()
                                      )}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableFooter>
        </Table>
    );
}