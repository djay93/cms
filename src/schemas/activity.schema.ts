import { z } from 'zod';

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
