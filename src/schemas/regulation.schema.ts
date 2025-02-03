import { z } from 'zod';

export const complianceRegulationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  publisher: z.string(),
  url: z.string(),
  status: z.string(),
  type: z.string(),
  totalItems: z.number(),
  effectiveDate: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type ComplianceRegulation = z.infer<typeof complianceRegulationSchema>;
