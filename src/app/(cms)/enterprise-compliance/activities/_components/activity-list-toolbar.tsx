'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DataTableFacetedFilter } from '@/components/ui/table/data-table-faceted-filter';
import { Cross2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Download, FileText, FileSpreadsheetIcon, FileJson } from 'lucide-react';
import { Table } from '@tanstack/react-table';
import {
  ACTIVITY_STATUS_OPTIONS,
  ACTIVITY_BUSINESS_GROUP_OPTIONS,
  ACTIVITY_TYPE_OPTIONS
} from '@/constants/filter-options';

interface ActivityListToolbar<TData> {
  table: Table<TData>;
}

export function TestActivityListToolbar<TData>({ table }: ActivityListToolbar<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isNewActivityDialogOpen, setIsNewActivityDialogOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({
    activityName: '',
    activityType: '',
    businessGroup: '',
    businessOwner: '',
    status: ''
  });

  const exportData = (format: 'csv' | 'tsv' | 'json' | 'excel') => {
    setIsExportDialogOpen(false);
  };

  const handleCreateNewActivity = () => {
    setIsNewActivityDialogOpen(false);
  };

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filter activities...'
          value={(table.getColumn('activityName')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('activityName')?.setFilterValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title='Status'
              options={ACTIVITY_STATUS_OPTIONS}
            />
          )}
          {table.getColumn('businessGroup') && (
            <DataTableFacetedFilter
              column={table.getColumn('businessGroup')}
              title='Business Group'
              options={ACTIVITY_BUSINESS_GROUP_OPTIONS}
            />
          )}
          {table.getColumn('activityType') && (
            <DataTableFacetedFilter
              column={table.getColumn('activityType')}
              title='Activity Type'
              options={ACTIVITY_TYPE_OPTIONS}
            />
          )}
        </div>
        {isFiltered && (
          <Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>

      <div className='flex space-x-3'>
        <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
          <DialogTrigger asChild>
            <Button size='sm'>
              <Download className='mr-2 h-4 w-4' /> Export
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[625px]'>
            <DialogHeader>
              <DialogTitle>Export Data</DialogTitle>
            </DialogHeader>
            <div className='flex justify-center gap-4 py-4'>
              <Button onClick={() => exportData('tsv')}>
                <FileText className='mr-2' /> TSV
              </Button>
              <Button onClick={() => exportData('json')}>
                <FileJson className='mr-2' /> JSON
              </Button>
              <Button onClick={() => exportData('excel')}>
                <FileSpreadsheetIcon className='mr-2' /> EXCEL
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isNewActivityDialogOpen} onOpenChange={setIsNewActivityDialogOpen}>
          <DialogTrigger asChild>
            <Button size='sm' className='h-8 lg:flex'>
              <PlusCircledIcon className='mr-2 h-4 w-4' />
              Activity Intake
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[720px]'>
            <DialogHeader>
              <DialogTitle>Create New Activity</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='activityName' className='text-right'>
                  Activity Name
                </Label>
                <Input
                  id='activityName'
                  value={newActivity.activityName}
                  onChange={(e) => setNewActivity({ ...newActivity, activityName: e.target.value })}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='activityType' className='text-right'>
                  Activity Type
                </Label>
                <Input
                  id='activityType'
                  value={newActivity.activityType}
                  onChange={(e) => setNewActivity({ ...newActivity, activityType: e.target.value })}
                  className='col-span-3'
                />
              </div>
            </div>
            <Button onClick={handleCreateNewActivity}>Create Activity</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
