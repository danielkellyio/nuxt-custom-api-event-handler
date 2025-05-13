import { z } from "zod";
export default defineApiEventHandler({
  validation: baseListValidator.extend({
    // add any additional validation here
    latest: z.coerce.boolean().describe("get only the latest 5 posts"),
  }),
  handler: async (
    event,
    { page, limit, sort, order, search, filter, latest }
  ) => {
    // get the posts
    console.log(page, limit, sort, order, search, filter, latest);
    return [];
  },
});
