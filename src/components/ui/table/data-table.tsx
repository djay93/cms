'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
  ColumnFiltersState,
  SortingState
} from '@tanstack/react-table';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
//import { parseAsInteger, useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import { DataTableSkeleton } from './data-table-skeleton';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fetchFn: (options: {
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
    pagination: PaginationState;
  }) => Promise<void>;
  total: number;
  toolbar?: (table: any) => React.ReactNode;
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({ columns, data, fetchFn, total, toolbar, isLoading = false }: DataTableProps<TData, TValue>) {
  const pageSizeOptions = [10, 20, 30, 40, 50];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 10,
    pageIndex: 0
  });
  const [expanded, setExpanded] = useState({});
  const manualPagination = !!fetchFn;
  const pageCount = manualPagination ? Math.ceil(total / pagination.pageSize) : undefined;

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onExpandedChange: setExpanded,
    //getSubRows: row => row.ilceler,
    //getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination,
      expanded,
    },
    manualPagination: true,
    pageCount,
    manualExpanding: false
  });

  useEffect(() => {
    if (fetchFn) {
      fetchFn({
        sorting,
        columnFilters,
        pagination
      });
    }
  }, [sorting, columnFilters, pagination, fetchFn]);

  if (isLoading) {
    return <DataTableSkeleton columnCount={columns.length} rowCount={10} searchableColumnCount={1} filterableColumnCount={1} showViewOptions />;
  }

  return (
    <div className='flex flex-1 flex-col space-y-1'>
      {toolbar && toolbar(table)}
      <div className='relative flex flex-1'>
        <div className='absolute bottom-0 left-0 right-0 top-0 flex overflow-x-auto overflow-y-hidden rounded-md border'>
          <ScrollArea className="w-full">
            <Table className='whitespace-nowrap'>
              <TableHeader className={cn("sticky top-0 z-30 bg-secondary")}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header, idx) => (
                      <TableHead 
                      key={header.id} 
                      style={{ minWidth: "40px" }}
                      className={cn(
                        idx === 0 && "sticky left-0 bg-secondary z-20 border-r border-border ", // First column
                      )}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                        {row.getVisibleCells().map((cell, idx) => (
                          <TableCell 
                          key={cell.id} 
                          className={cn(
                            idx === 0 && "sticky left-0 bg-background z-20", // First column
                            "before:absolute before:left-0 before:top-0 before:w-1 before:h-full"
                          )}
                          style={{ 
                            minWidth: "40px"
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className='h-24 text-center'>
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
            </Table>
            <ScrollBar orientation='horizontal' />
            <ScrollBar orientation='vertical' />
          </ScrollArea>
        </div>
      </div>

      <div className='flex flex-col items-center justify-end gap-2 space-x-2 py-2 sm:flex-row'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex-1 text-sm text-muted-foreground'>
            {total > 0 ? (
              <>
                Total {total} records
              </>
            ) : (
              'No entries found'
            )}
          </div>
          <div className='flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
            <div className='flex items-center space-x-2'>
              <p className='whitespace-nowrap text-sm font-medium'>Rows per page</p>
              <Select
                value={`${pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className='h-8 w-[70px]'>
                  <SelectValue placeholder={pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side='top'>
                  {pageSizeOptions.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className='flex w-full items-center justify-between gap-2 sm:justify-end'>
          <div className='flex w-[150px] items-center justify-center text-sm font-medium'>
            {total > 0 ? (
              <>
                Page {pagination.pageIndex + 1} of {table.getPageCount()}
              </>
            ) : (
              'No pages'
            )}
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              aria-label='Go to first page'
              variant='outline'
              className='hidden h-8 w-8 p-0 lg:flex'
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <DoubleArrowLeftIcon className='h-4 w-4' aria-hidden='true' />
            </Button>
            <Button
              aria-label='Go to previous page'
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className='h-4 w-4' aria-hidden='true' />
            </Button>
            <Button
              aria-label='Go to next page'
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className='h-4 w-4' aria-hidden='true' />
            </Button>
            <Button
              aria-label='Go to last page'
              variant='outline'
              className='hidden h-8 w-8 p-0 lg:flex'
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <DoubleArrowRightIcon className='h-4 w-4' aria-hidden='true' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
