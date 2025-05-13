import { z } from "zod";

export const baseListValidator = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).optional().default("asc"),
  search: z.string().optional(),
  filter: z.record(z.unknown()).optional(),
});
