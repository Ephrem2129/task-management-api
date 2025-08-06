// import { prisma } from "../../../../lib/prisma";
// import { verifyToken } from "../../../../middlewares/auth";

// export async function PUT(req, { params }) {
//   const userId = verifyToken(req);
//   if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

//   const data = await req.json();
//   const task = await prisma.task.update({
//     where: { id: params.id, userId },
//     data,
//   });

//   return Response.json(task);
// }
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
// This code handles updating and deleting tasks by verifying the user's token.
// It uses the verifyToken middleware to ensure the user is authenticated.
// The PUT method updates a task with the provided data, while the DELETE method removes a task.
// Both methods check if the user is authorized by verifying the token and ensuring the task belongs to the user.
// If the user is not authorized, it returns a 401 Unauthorized response.
// The PUT method returns the updated task, and the DELETE method returns a success message upon deletion.
// Ensure to set the JWT_SECRET environment variable for token verification.
// This code handles updating and deleting tasks by verifying the user's token.
// It uses the verifyToken middleware to ensure the user is authenticated.
// The PUT method updates a task with the provided data, while the DELETE method removes a task.
// Both methods check if the user is authorized by verifying the token and ensuring the task belongs to the user.
// If the user is not authorized, it returns a 401 Unauthorized response.
// The PUT method returns the updated task, and the DELETE method returns a success message upon deletion.
// Ensure to set the JWT_SECRET environment variable for token verification.
// This code handles updating and deleting tasks by verifying the user's token.
// It uses the verifyToken middleware to ensure the user is authenticated.
