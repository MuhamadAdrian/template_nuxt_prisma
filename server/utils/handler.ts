import type { EventHandler, EventHandlerRequest } from "h3";

/**
 * Wraps an EventHandler to add pre- and post-processing logic, as well as error handling.
 *
 * @template T - Type of the EventHandlerRequest
 * @template D - Type of the EventHandler response data
 * @param handler - The route handler to wrap
 * @returns A new EventHandler with additional logic
 */
export const defineResponseHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    try {
      const query = getQuery(event);

      // Extract search parameters
      const search = ((query.search as string) || "").trim();

      event.context.search = search;

      // Call the original handler
      const response = await handler(event);

      // Post-processing logic (e.g., adding metadata to response)
      return {
        success: true,
        message: event.context.message || "Request successful",
        data: response,
      };
    } catch (err) {
      // Centralized error handling
      console.error("Error occurred:", err);

      return {
        success: false,
        message:
          err instanceof Error ? err.message : "An unexpected error occurred",
        error: process.env.NODE_ENV === "development" ? err : undefined, // Show error details in development
      };
    }
  });
