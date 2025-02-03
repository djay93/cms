import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import ActivityList from './_components/activity-list';

export const metadata = {
  title: 'Tests & Activities'
};

export default function ActivityListPage() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-3'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Tests & Activities'
            description='Library of test activities that are relevant to the Business.'
          />
        </div>
        <Separator />
        <ActivityList />
      </div>
    </PageContainer>
  );
}
