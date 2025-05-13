import { z } from "zod";
export default defineApiEventHandler({
  validation: z.preprocess(
    (data) => {
      // map id param to postId
      const obj = data as Record<string, unknown>;
      return { postId: obj.postId || obj.id };
    },
    z.object({
      postId: z.string(),
    })
  ),
  guards: [postBelongsToUserGuard],
  handler: async (event, { postId }) => {
    // update the post with id {postId}
  },
});
