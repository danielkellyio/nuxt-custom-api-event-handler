import { z } from "zod";

export default defineApiEventHandler({
  validation: z.object({
    // 👇 coerce the number to a number
    id: z.coerce.number(),
  }),
  handler: async (event, { id }) => {
    return {
      id,
      dataType: typeof id,
    };
  },
});
