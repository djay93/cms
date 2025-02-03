import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

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
            description='Library of test activities that are relevant to the Business. They are updated here automatically from the system.'
          />
        </div>
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle>Create New Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='activityName'>Activity Name</Label>
                <Input id='activityName' type='text' className='w-full' />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='activityType'>Activity Type</Label>
                <Select>
                  <SelectTrigger id='activityType'>
                    <SelectValue placeholder='Select type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='audit'>Audit</SelectItem>
                    <SelectItem value='assessment'>Assessment</SelectItem>
                    <SelectItem value='testing'>Testing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='lineOfBusiness'>Line of Business</Label>
                <Input id='lineOfBusiness' type='text' className='w-full' />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='businessGroup'>Business Group</Label>
                <Input id='businessGroup' type='text' className='w-full' />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='businessOwner'>Business Owner</Label>
                <Input id='businessOwner' type='text' className='w-full' />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='regulationCitation'>Regulation Citation</Label>
                <Input id='regulationCitation' type='text' className='w-full' />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='regulationSection'>Regulation Section</Label>
                <Input id='regulationSection' type='text' className='w-full' />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='status'>Status</Label>
                <Select>
                  <SelectTrigger id='status'>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='active'>Active</SelectItem>
                    <SelectItem value='pending'>Pending</SelectItem>
                    <SelectItem value='completed'>Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='executionType'>Execution Type</Label>
                <Select>
                  <SelectTrigger id='executionType'>
                    <SelectValue placeholder='Select type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='auto'>Auto</SelectItem>
                    <SelectItem value='manual'>Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Create Activity</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
