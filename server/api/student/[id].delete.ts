import prisma from "~/lib/prisma";
import { verifyAuth } from "~/server/utils/auth";
import { defineResponseHandler } from "~/server/utils/handler";

export default defineResponseHandler(async (event) => {
  await verifyAuth(event);

  const id = event.context.params?.id;

  const deleteStudent = await prisma.student.delete({
    where: {
      id: parseInt(id!, 10),
    },
  });

  event.context.message = "Delete successful";

  return deleteStudent;
});
