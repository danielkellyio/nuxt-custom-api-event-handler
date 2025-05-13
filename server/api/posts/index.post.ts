// server/api/posts/index.post.ts
import { z } from "zod";

export default defineApiEventHandler({
  validation: z.object({
    slug: z.string().refine(
      async (slug) => {
        const taken = ["test", "test2"];
        // this can be any async operation
        // like checking if a slug is unique in a database
        const slugIsUnique = !taken.includes(slug);
        return slugIsUnique;
      },
      {
        message: "Slug must be unique",
      }
    ),
  }),
  handler: async (event, { slug }) => {
    // slug guaranteed unique here
    console.log(slug);
  },
});
