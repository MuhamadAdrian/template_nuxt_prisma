import prisma from "@/lib/prisma";
import { verifyAuth } from "~/server/utils/auth";
import { definePaginationResponseHandler } from "~/server/utils/paginationHandler";

export default definePaginationResponseHandler(async (event) => {
  await verifyAuth(event);
  const { page, pageSize } = event.context.pagination;
  const search = event.context.search;

  // Calculate offset for pagination
  const skip = (page - 1) * pageSize;

  // Apply search filter and pagination
  const [students, total] = await prisma.$transaction([
    prisma.student.findMany({
      where: {
        OR: [
          { name: { contains: search } }, // Case-insensitive by default search by name
        ],
      },
      skip,
      take: pageSize,
    }),

    prisma.student.count({
      where: {
        OR: [{ name: { contains: search } }],
      },
    }),
  ]);

  // Attach the total count for the wrapper
  event.context.total = total;
  return students;
});
