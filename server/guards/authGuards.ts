export const userIsLoggedInGuard = defineGuard(async (event, payload) => {
  // check if the user is logged int
  const userIsLoggedIn = false;
  if (!userIsLoggedIn) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
});
