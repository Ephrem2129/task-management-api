import { prisma } from "../../../../lib/prisma";
import { verifyToken } from "../../../../middlewares/auth";
import { taskUpdateSchema } from "../../../../lib/validation";

export async function PUT(req, { params }) {
  const userId = verifyToken(req);
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const parse = taskUpdateSchema.safeParse(body);
  if (!parse.success)
    return Response.json({ error: "Invalid input" }, { status: 400 });

  const task = await prisma.task.update({
    where: { id: params.id, userId },
    data: parse.data,
  });

  return Response.json(task);
}

export async function DELETE(req, { params }) {
  const userId = verifyToken(req);
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.task.delete({ where: { id: params.id, userId } });
  return Response.json({ message: "Deleted" });
}
