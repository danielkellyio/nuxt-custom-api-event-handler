import { z } from "zod";
export default defineApiEventHandler({
  validation: z.object({}),
  guards: [userIsLoggedInGuard],
  handler: async (event, payload) => {
    return "Hello, world!";
  },
});
