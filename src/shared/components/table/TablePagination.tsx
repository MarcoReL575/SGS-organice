'use client'

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { Table as TanstackTable } from '@tanstack/react-table'

interface Props<TData> {
    table: TanstackTable<TData>;
    pageSizeOptions?: number[];
}

export function TablePagination<TData>({ table, pageSizeOptions = [5, 10, 15, 20, 30, 50]}: Props<TData>) {
    const { pageIndex, pageSize } = table.state.pagination;

    return (
        <div className='flex items-center justify-between w-full gap-4 py-4 flex-wrap'>
            <div className='flex items-center gap-2 text-sm'>
                <span>Filas por página</span>
                <select
                    value={pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                    className='border rounded-md p-1 focus:outline-none'
                >
                    {pageSizeOptions.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex items-center gap-2'>
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className='p-1 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted'
                    aria-label='Página anterior'
                >
                    <IconChevronLeft size={18} />
                </button>

                <span className='text-sm px-2'>
                    Página {pageIndex + 1} de {table.getPageCount()}
                </span>

                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className='p-1 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted'
                    aria-label='Página siguiente'
                >
                    <IconChevronRight size={18} />
                </button>
            </div>
        </div>
    )
}