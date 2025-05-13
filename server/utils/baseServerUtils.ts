import type { EventHandler, EventHandlerRequest, H3Event } from "h3";
import type { z } from "zod";
import { ZodError } from "zod";

type Guard<T> = ReturnType<typeof defineGuard<T>>;

type ApiEventHandler<T extends EventHandlerRequest, D, S extends z.ZodType> = {
  validation: S;
  guards?: Guard<z.infer<S>>[];
  handler: (event: H3Event<T>, payload: z.infer<S>) => Promise<D> | D;
};

export function defineApiEventHandler<
  T extends EventHandlerRequest = EventHandlerRequest,
  D = unknown,
  S extends z.ZodType = z.ZodType
>(
  handlerOrConfig: ApiEventHandler<T, D, S> | EventHandler<T, D>
): EventHandler<T, D> {
  if (typeof handlerOrConfig === "function") {
    return defineEventHandler(handlerOrConfig);
  }

  const { validation, handler, guards } = handlerOrConfig;

  return defineEventHandler<T>(async (event) => {
    try {
      // get the rawData
      const rawData = await getPayload(event);

      // validate the rawData and transform it to the payload
      const payload = await runValidation<S>(rawData, validation);

      // run guards
      await runGuards<S>(event, payload, guards);

      // run the handler
      return handler(event, payload);
    } catch (err) {
      if (err instanceof ZodError) {
        throw createError({
          statusCode: 422,
          statusMessage: `Invalid request payload`,
          data: err,
        });
      }
      throw err;
    }
  });
}

// Local function to get the payload from the event
// should NOT be exported
async function getPayload(event: H3Event) {
  const method = event.method;

  let payload: Record<string, unknown> = getQuery(event) || {};

  if (["PUT", "POST"].includes(method)) {
    const body = await readBody(event);
    payload = {
      ...payload,
      ...body,
    };
  }

  return {
    ...payload,
    ...event.context.params,
  };
}

// local function to run guards
async function runGuards<T>(event: H3Event, payload: T, guards?: Guard<T>[]) {
  if (!guards) return;
  if (!Array.isArray(guards)) {
    throw createError({
      statusCode: 500,
      statusMessage: `Guards must be an array`,
    });
  }
  await Promise.all(guards.map((guard) => guard(event, payload)));
}

// local function to run validation
async function runValidation<T>(data: unknown, validation: z.ZodType<T>) {
  return await validation.parseAsync(data);
}

export const defineGuard = <T>(
  callback: (event: H3Event, payload: T) => Promise<void>
) => {
  return callback;
};
