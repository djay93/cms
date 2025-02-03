'use client';
import { z } from 'zod';
import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter';

export const testActivitySchema = z.object({
  id: z.string(),
  activityName: z.string(),
  activityType: z.string(),
  lineOfBusiness: z.string(),
  businessGroup: z.string(),
  businessOwner: z.string(),
  regulationCitation: z.string(),
  regulationSection: z.string(),
  status: z.string(),
  executionType: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type TestActivity = z.infer<typeof testActivitySchema>;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fakeActivityApi = {
  records: [] as TestActivity[],

  initialize() {
    const sampleActivities: TestActivity[] = [];

    function generateRandomActivity(id: number): TestActivity {
      const activityTypes = ['Audit', 'Assessment', 'Testing', 'Validation'];
      const businessGroups = ['Finance', 'Compliance', 'Operations', 'IT'];
      const statuses = ['Passed', 'Passed with Exceptions', 'Planned', 'In Progress', 'Blocked', 'Overdue', 'Skipped'];
      const executionTypes = ['Auto', 'Manual'];

      return {
        id: `ACT-${id.toString().padStart(4, '0')}`,
        activityName: faker.company.catchPhrase(),
        activityType: faker.helpers.arrayElement(activityTypes),
        lineOfBusiness: faker.company.name(),
        businessGroup: faker.helpers.arrayElement(businessGroups),
        businessOwner: faker.name.fullName(),
        regulationCitation: faker.lorem.words(3),
        regulationSection: faker.lorem.words(2),
        status: faker.helpers.arrayElement(statuses),
        executionType: faker.helpers.arrayElement(executionTypes),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString()
      };
    }

    for (let i = 1; i <= 50; i++) {
      sampleActivities.push(generateRandomActivity(i));
    }

    this.records = sampleActivities;
  },

  async getAll({
    statuses = [],
    search,
    sorting = []
  }: {
    statuses?: string[];
    search?: string;
    sorting?: { id: string; desc: boolean }[];
  }) {
    let activities = [...this.records];

    if (statuses.length > 0) {
      activities = activities.filter((act) => statuses.includes(act.status));
    }

    if (search) {
      activities = matchSorter(activities, search, {
        keys: ['activityName', 'businessOwner']
      });
    }

    if (sorting.length > 0) {
      const { id, desc } = sorting[0];
      activities.sort((a: Record<string, any>, b: Record<string, any>) => {
        return desc ? String(b[id]).localeCompare(String(a[id])) : String(a[id]).localeCompare(String(b[id]));
      });
    }

    return activities;
  },

  async getActivities({
    sorting = [],
    columnFilters = [],
    pagination = { pageSize: 10, pageIndex: 0 }
  }: {
    sorting: { id: string; desc: boolean }[];
    columnFilters: { id: string; value: any }[];
    pagination: { pageSize: number; pageIndex: number };
  }) {
    await delay(1000);

    const allActivities = await this.getAll({
      statuses: columnFilters.find((f) => f.id === 'status')?.value,
      search: columnFilters.find((f) => f.id === 'search')?.value,
      sorting: sorting
    });

    const totalActivities = allActivities.length;
    const offset = pagination.pageIndex * pagination.pageSize;
    const paginatedActivities = allActivities.slice(offset, offset + pagination.pageSize);

    return {
      success: true,
      time: new Date().toISOString(),
      message: 'Sample activities data for testing',
      total: totalActivities,
      activities: paginatedActivities
    };
  },

  async getActivityById(id: string) {
    await delay(1000);

    const activity = this.records.find((act) => act.id === id);

    if (!activity) {
      return {
        success: false,
        message: `Activity with ID ${id} not found`
      };
    }

    return {
      success: true,
      time: new Date().toISOString(),
      message: `Activity with ID ${id} found`,
      activity
    };
  }
};

fakeActivityApi.initialize();
