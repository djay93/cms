'use client';

import { fakeRegulations } from '@/mocks';
import { DataTable } from '@/components/ui/table/data-table';
import { ComplianceRegulation } from '@/schemas';
import { useState, useEffect, useCallback, useTransition } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef, SortingState, ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { RegulationListToolbar } from './regulation-list-toolbar';
import { format } from 'date-fns';
import { RegulationListRowAction } from './regulation-list-row-action';

export default function RegulationList() {
  const [regulations, setRegulations] = useState<ComplianceRegulation[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isPending, startTransition] = useTransition(); 

  // Columns for the table
  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <div className="flex flex-row items-center gap-1">
          <div className="w-4 h-4"></div>
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
            onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
            aria-label='Select all'
            className='translate-y-[2px]'
          />
          <div className="w-1 h-1"></div>
        </div>
      ),
      cell: ({ row }) => (
        <div className="group flex flex-row items-center gap-1">
          <RegulationListRowAction data={row.original as ComplianceRegulation} />
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label='Select row'
            className='translate-y-[2px]'
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false
    },
    // {
    //   id: 'actions',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title='Actions' />,
    //   cell: ({ row }) => <RegulationListRowAction data={row.original as ComplianceRegulation} />
    // },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Regulatory Citation' />,
      cell: ({ row }) => <div>{row.getValue('name')}</div>,
      filterFn: (row, id, filterValue: string) => {
        const value = row.getValue(id) as string;
        return value.toLowerCase().includes(filterValue.toLowerCase());
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'publisher',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Regulatory Agency' />,
      cell: ({ row }) => <div>{row.getValue('publisher')}</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'totalItems',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Total Subsections' />,
      cell: ({ row }) => <div>{row.getValue('totalItems')}</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
      cell: ({ row }) => <div>{row.getValue('status')}</div>,
      enableSorting: true,
      enableHiding: false
    },
    {
      accessorKey: 'updatedAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Last Updated Date' />,
      cell: ({ row }) => <div>{format(row.getValue('updatedAt'), 'MM/dd/yyyy')}</div>,
      enableSorting: false,
      enableHiding: false
    }
  ] as ColumnDef<Partial<ComplianceRegulation>>[];

  const loadData = useCallback(
    async ({
      sorting,
      columnFilters,
      pagination
    }: {
      sorting: SortingState;
      columnFilters: ColumnFiltersState;
      pagination: PaginationState;
    }) => {
      startTransition(async () => {
        const data = await fakeRegulations.getRegulations({
          sorting,
          columnFilters,
          pagination
        });
        setRegulations(data.regulations);
        setTotal(data.total);
      });
    },
    []
  );

  useEffect(() => {
    loadData({
      sorting: [],
      columnFilters: [],
      pagination: {
        pageSize: 10,
        pageIndex: 0
      }
    });
  }, [loadData]);

  return (
    <DataTable
      columns={columns}
      data={regulations}
      total={total}
      fetchFn={loadData}
      toolbar={(table) => <RegulationListToolbar table={table} />}
      isLoading={isPending}
    />
  );
}
