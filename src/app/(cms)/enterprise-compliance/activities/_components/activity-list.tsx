'use client';

import { fakeActivityApi } from '@/mocks';
import { DataTable } from '@/components/ui/table/data-table';
import { TestActivity } from '@/schemas';
import { useState, useEffect, useCallback, useTransition } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef, SortingState, ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { TestActivityListToolbar } from './activity-list-toolbar';
import { format } from 'date-fns';
import { ActivityListRowAction } from './activity-list-row-action';
import { cn } from '@/lib/utils';

export default function TestActivityList() {
  const [activities, setActivities] = useState<TestActivity[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isPending, startTransition] = useTransition();

  // Columns for the table
  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <div className='flex flex-row items-center gap-1'>
          <div className='h-4 w-4'></div>
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
            onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
            aria-label='Select all'
            className='translate-y-[2px]'
          />
          <div className='h-1 w-1'></div>
        </div>
      ),
      cell: ({ row }) => (
        <div className='group flex flex-row items-center gap-1'>
          <ActivityListRowAction data={row.original as TestActivity} />
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
    {
      accessorKey: 'activityName',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Activity Name' />,
      cell: ({ row }) => <div>{row.getValue('activityName')}</div>,
      enableSorting: true,
      enableHiding: false
    },
    {
      accessorKey: 'activityType',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Activity Type' />,
      cell: ({ row }) => <div>{row.getValue('activityType')}</div>,
      enableSorting: true,
      enableHiding: false
    },
    {
      accessorKey: 'lineOfBusiness',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Line of Business' />,
      cell: ({ row }) => <div>{row.getValue('lineOfBusiness')}</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'businessGroup',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Business Group' />,
      cell: ({ row }) => <div>{row.getValue('businessGroup')}</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'businessOwner',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Business Owner' />,
      cell: ({ row }) => <div>{row.getValue('businessOwner')}</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'regulationCitation',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Regulation Citation' />,
      cell: ({ row }) => <div>{row.getValue('regulationCitation')}</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'regulationSection',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Regulation Section' />,
      cell: ({ row }) => <div>{row.getValue('regulationSection')}</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        const getStatusStyles = (status: string) => {
          switch (status) {
            case 'Planned':
              return 'bg-slate-100 text-slate-700 ring-slate-600/20';
            case 'In Progress':
              return 'bg-blue-100 text-blue-700 ring-blue-600/20';
            case 'Passed':
              return 'bg-green-100 text-green-700 ring-green-600/20';
            case 'Passed with Exceptions':
              return 'bg-yellow-100 text-yellow-700 ring-yellow-600/20';
            case 'Blocked':
              return 'bg-red-100 text-red-700 ring-red-600/20';
            case 'Overdue':
              return 'bg-orange-100 text-orange-700 ring-orange-600/20';
            case 'Skipped':
              return 'bg-gray-100 text-gray-700 ring-gray-600/20';
            default:
              return 'bg-slate-100 text-slate-700 ring-slate-600/20';
          }
        };

        return (
          <span
            className={cn(
              'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
              getStatusStyles(status)
            )}
          >
            {status}
          </span>
        );
      },
      enableSorting: true,
      enableHiding: false
    },
    {
      accessorKey: 'executionType',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Auto/Manual' />,
      cell: ({ row }) => <div>{row.getValue('executionType')}</div>,
      enableSorting: false,
      enableHiding: false
    }
  ] as ColumnDef<Partial<TestActivity>>[];

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
        const data = await fakeActivityApi.getActivities({ sorting, columnFilters, pagination });
        setActivities(data.activities);
        setTotal(data.total);
      });
    },
    []
  );

  useEffect(() => {
    loadData({
      sorting: [],
      columnFilters: [],
      pagination: { pageSize: 10, pageIndex: 0 }
    });
  }, [loadData]);

  return (
    <DataTable
      columns={columns}
      data={activities}
      total={total}
      fetchFn={loadData}
      toolbar={(table) => <TestActivityListToolbar table={table} />}
      isLoading={isPending}
    />
  );
}
