////////////////////////////////////////////////////////////////////////////////
// 🛑 Mock Regulations API for testing and development
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter';
import type { ComplianceRegulation } from '@/schemas';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock regulations data store
export const fakeRegulations = {
  records: [] as ComplianceRegulation[],

  // Initialize with sample data
  initialize() {
    const sampleRegulations: ComplianceRegulation[] = [];

    function generateRandomRegulation(id: number): ComplianceRegulation {
      const publishers = [
        'Consumer Financial Protection Bureau (CFPB)',
        'Federal Reserve Board (FRB)',
        'Commodity Futures Trading Commission (CFTC)',
        'Securities and Exchange Commission (SEC)'
      ];

      const types = ['Security', 'Privacy', 'Compliance', 'Risk Management', 'Data Protection'];

      const statuses = ['Active', 'Draft', 'Inactive', 'Under Review'];

      return {
        id: `REG-${id.toString().padStart(4, '0')}`,
        name: faker.company.catchPhrase(),
        description: faker.lorem.paragraph(),
        publisher: faker.helpers.arrayElement(publishers),
        url: faker.internet.url(),
        status: faker.helpers.arrayElement(statuses),
        type: faker.helpers.arrayElement(types),
        totalItems: faker.number.int({ min: 10, max: 100 }),
        effectiveDate: faker.date.future().toISOString(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString()
      };
    }

    // Generate sample regulations
    for (let i = 1; i <= 50; i++) {
      sampleRegulations.push(generateRandomRegulation(i));
    }

    this.records = sampleRegulations;
  },

  // Get all regulations with optional filtering
  async getAll({
    publishers = [],
    statuses = [],
    search,
    sorting = []
  }: {
    publishers?: string[];
    statuses?: string[];
    search?: string;
    sorting?: { id: string; desc: boolean }[];
  }) {
    let regulations = [...this.records];

    // Filter by publishers
    if (publishers.length > 0) {
      regulations = regulations.filter((reg) => publishers.some((publisher) => reg.publisher === publisher));
    }

    // Filter by statuses - match if regulation has at least one of the selected statuses
    if (statuses.length > 0) {
      regulations = regulations.filter((reg) => statuses.some((status) => reg.status === status));
    }

    // Search functionality across multiple fields
    if (search) {
      regulations = matchSorter(regulations, search, {
        keys: ['name', 'description']
      });
    }

    // Apply sorting
    if (sorting.length > 0) {
      const { id, desc } = sorting[0];
      regulations.sort((a: Record<string, any>, b: Record<string, any>) => {
        return desc ? String(b[id]).localeCompare(String(a[id])) : String(a[id]).localeCompare(String(b[id]));
      });
    }

    return regulations;
  },

  // Get paginated regulations
  async getRegulations({
    sorting = [],
    columnFilters = [],
    pagination = { pageSize: 10, pageIndex: 0 }
  }: {
    sorting: { id: string; desc: boolean }[];
    columnFilters: { id: string; value: any }[];
    pagination: { pageSize: number; pageIndex: number };
  }) {
    await delay(1000);

    const allRegulations = await this.getAll({
      publishers: columnFilters.find((f) => f.id === 'publisher')?.value,
      statuses: columnFilters.find((f) => f.id === 'status')?.value,
      search: columnFilters.find((f) => f.id === 'search')?.value,
      sorting: sorting
    });

    const totalRegulations = allRegulations.length;
    const offset = pagination.pageIndex * pagination.pageSize;
    const paginatedRegulations = allRegulations.slice(offset, offset + pagination.pageSize);

    return {
      success: true,
      time: new Date().toISOString(),
      message: 'Sample regulations data for testing',
      total: totalRegulations,
      regulations: paginatedRegulations
    };
  },

  // Get a specific regulation by ID
  async getRegulationById(id: string) {
    await delay(1000);

    const regulation = this.records.find((reg) => reg.id === id);

    if (!regulation) {
      return {
        success: false,
        message: `Regulation with ID ${id} not found`
      };
    }

    return {
      success: true,
      time: new Date().toISOString(),
      message: `Regulation with ID ${id} found`,
      regulation
    };
  }
};

// Initialize sample regulations
fakeRegulations.initialize();
