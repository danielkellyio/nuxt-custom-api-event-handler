# An opinionated defineApiEventHandler function for Nuxt

```ts
// server/api/posts/index.get.ts
import { z } from "zod";

export default defineApiEventHandler({
  //All validation done here EVERY TIME
  validation: z.object({
    query: z.string().optional(),

    // query string variable coerced to number
    take: z.coerce.number().optional(),
  }),

  // ALL route specific middleware defined in ONE place EVERY TIME
  guards: [userIsLoggedInGuard, userIsAdminGuard],

  // Handler with payload values already guaranteed valid
  handler: async (event, { query, take }) => {
    // data paginated by take and query
    return [];
  },
});
```

[Vist the Vue School Blog to get a full tutorial on how to use this function.](https://vueschool.io/articles/vuejs-tutorials/a-custom-opinionated-event-handler-for-nuxt-api-endpoints-with-guards-and-validation-support)

## Setup

```bash
# npm
npm install
npm run dev
```
