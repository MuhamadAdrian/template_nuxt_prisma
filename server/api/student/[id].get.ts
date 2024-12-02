import prisma from "@/lib/prisma";
import { defineResponseHandler } from "@/server/utils/handler";
import { verifyAuth } from "~/server/utils/auth";

export default defineResponseHandler(async (event) => {
  await verifyAuth(event);
  const id = event.context.params?.id;
  // const user = event.context.user; // Set by `auth` middleware
  const student = await prisma.student.findUnique({
    where: { id: parseInt(id!, 10) },
  });

  if (!student) {
    throw createError({
      statusCode: 404,
      statusMessage: "Student not found",
    });
  }

  return student;
});
