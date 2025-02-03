import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface DataTableSkeletonProps {
  columnCount?: number;
  rowCount?: number;
  searchableColumnCount?: number;
  filterableColumnCount?: number;
  showViewOptions?: boolean;
}

export function DataTableSkeleton({
  columnCount = 5,
  rowCount = 10,
  searchableColumnCount = 1,
  filterableColumnCount = 1,
  showViewOptions = false
}: DataTableSkeletonProps) {
  return (
    <div className='flex flex-1 flex-col space-y-3 overflow-auto'>
      {/* Toolbar Skeleton */}
      {searchableColumnCount > 0 || filterableColumnCount > 0 ? (
        <div className='flex w-full items-center justify-between space-x-2 p-1'>
          <div className='flex flex-1 items-center space-x-2'>
            {Array.from({ length: searchableColumnCount }).map((_, i) => (
              <Skeleton key={i} className='h-10 w-[200px] lg:w-[250px]' />
            ))}
            {Array.from({ length: filterableColumnCount }).map((_, i) => (
              <Skeleton key={i} className='h-10 w-[100px] border-dashed' />
            ))}
          </div>
          {showViewOptions && <Skeleton className='h-7 w-[80px] hidden lg:flex' />}
        </div>
      ) : null}

      {/* Table Skeleton */}
      <div className='relative flex flex-1 rounded-md border'>
        <div className='absolute inset-0 flex'>
          <ScrollArea className='flex flex-1'>
            <Table>
              {/* Table Header Skeleton */}
              <TableHeader>
                <TableRow className='hover:bg-transparent'>
                  {Array.from({ length: columnCount }).map((_, i) => (
                    <TableHead key={i}>
                      <Skeleton className='h-8 w-full' />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              
              {/* Table Body Skeleton */}
              <TableBody>
                {Array.from({ length: rowCount }).map((_, i) => (
                  <TableRow key={i} className='hover:bg-transparent'>
                    {Array.from({ length: columnCount }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className='h-8 w-full' />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className='flex w-full flex-col items-center justify-between gap-4 px-2 py-1 sm:flex-row sm:gap-8'>
        <div className='flex-1'>
          <Skeleton className='h-8 w-40' />
        </div>
        <div className='flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
          {/* Rows per page selector */}
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-8 w-24' />
            <Skeleton className='h-8 w-[70px]' />
          </div>
          {/* Pagination text */}
          <div className='hidden w-[100px] items-center justify-center text-sm font-medium md:flex'>
            <Skeleton className='h-8 w-20' />
          </div>
          {/* Pagination controls */}
          <div className='hidden items-center space-x-2 md:flex'>
            <Skeleton className='hidden size-8 lg:block' />
            <Skeleton className='size-8' />
            <Skeleton className='size-8' />
            <Skeleton className='hidden size-8 lg:block' />
          </div>
        </div>
      </div>
    </div>
  );
}
