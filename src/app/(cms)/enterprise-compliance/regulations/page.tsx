import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import RegulationList from './_components/regulation-list';
//import RegulationsTableAction from '@/features/regulations/components/regulations-tables/regulations-table-action';

export const metadata = {
  title: 'Compliance Regulations'
};

export default function RegulationListPage() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-3'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Compliance Regulations'
            description='Library of compliance regulations that are relevant to the Business. They are updated here automatically from the GRC system.'
          />
          {/* <Link href='/dashboard/product/new' className={cn(buttonVariants(), 'text-xs md:text-sm')}>
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Link> */}
        </div>
        <Separator />
        {/* <ProductTableAction /> */}
        <RegulationList />
      </div>
    </PageContainer>
  );
}
