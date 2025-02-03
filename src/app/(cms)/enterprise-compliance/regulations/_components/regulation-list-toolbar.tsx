import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DataTableFacetedFilter } from '@/components/ui/table/data-table-faceted-filter';
import { Cross2Icon } from '@radix-ui/react-icons';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Download } from 'lucide-react';
import { FileText, FileSpreadsheetIcon } from 'lucide-react';
import { FileJson } from 'lucide-react';
import { Table } from '@tanstack/react-table';
import { REGULATION_STATUS_OPTIONS, REGULATION_AGENCY_OPTIONS } from '@/constants/filter-options';

interface RegulationListToolbar<TData> {
  table: Table<TData>;
}

export function RegulationListToolbar<TData>({ table }: RegulationListToolbar<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    publisher: '',
    subSection: '',
    description: '',
    status: ''
  });

  const exportData = (format: 'csv' | 'tsv' | 'json' | 'excel') => {
    // Implement export logic here
    setIsExportDialogOpen(false);
  };

  const handleCreateNewTask = () => {
    // Implement create task logic here
    setIsNewTaskDialogOpen(false);
  };

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filter regulations...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('status') && (
            <DataTableFacetedFilter column={table.getColumn('status')} title='Status' options={REGULATION_STATUS_OPTIONS} />
          )}
          {/* {table.getColumn('citations') && (
            <DataTableFacetedFilter
              column={table.getColumn('citations')}
              title='Citations'
              options={citations}
            />
          )} */}
        </div>
        {isFiltered && (
          <Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>


      <div className='flex space-x-3'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' size='sm' className='h-8 lg:flex'>
              Import
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Import Regulations</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
          <DialogTrigger asChild>
            <Button size='sm'>
              <Download className='mr-2 h-4 w-4' /> Export
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[625px]'>
            <DialogHeader>
              <DialogTitle>Export Data</DialogTitle>
              <DialogDescription>Choose the format to export your vulnerability data.</DialogDescription>
            </DialogHeader>
            <div className='flex justify-center gap-4 py-4'>
              {/* <Button onClick={() => exportData('csv')}>
                <IconFileTypeCsv className="mr-2" /> CSV
              </Button> */}
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
      
        <Dialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen}>
          <DialogTrigger asChild>
            <Button size='sm' className='h-8 lg:flex'>
              <PlusCircledIcon className='mr-2 h-4 w-4' />
              New Regulation
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[720px]'>
            <DialogHeader>
              <DialogTitle>Create New Regulation</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='title' className='text-right'>
                  Regulation Citation
                </Label>
                <Input
                  id='name'
                  value={newTask.name}
                  onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='publisher' className='text-right'>
                  Regulation Agency
                </Label>
                <Input
                  id='publisher'
                  value={newTask.publisher}
                  onChange={(e) => setNewTask({ ...newTask, publisher: e.target.value })}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='status' className='text-right'>
                  Status
                </Label>
                <Select value={newTask.status} onValueChange={(value) => setNewTask({ ...newTask, status: value })}>
                  <SelectTrigger className='col-span-3'>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    {REGULATION_STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='label' className='text-right'>
                  Label
                </Label>
                <Select value={newTask.label} onValueChange={(value) => setNewTask({ ...newTask, label: value })}>
                  <SelectTrigger className='col-span-3'>
                    <SelectValue placeholder='Select label' />
                  </SelectTrigger>
                  <SelectContent>
                    {labels.map((label) => (
                      <SelectItem key={label.value} value={label.value}>
                        {label.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='priority' className='text-right'>
                  Priority
                </Label>
                <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                  <SelectTrigger className='col-span-3'>
                    <SelectValue placeholder='Select priority' />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}
            </div>
            <Button onClick={handleCreateNewTask}>Create Regulation</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
