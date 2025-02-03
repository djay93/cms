import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import ActivityStatusReports from './_components/activity-status-reports';

export const metadata = {
  title: 'Compliance Regulations'
};

export default function ReportsPage() {
  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col space-y-3'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Compliance Activity Status Report'
            description=''
          />
        </div>
        <ActivityStatusReports />
      </div>
    </PageContainer>
  );
}
