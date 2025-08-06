import { prisma } from "../../../lib/prisma";
import { verifyToken } from "../../../middlewares/auth";
import { taskSchema } from "../../../lib/validation";
export async function GET(req) {
  const userId = verifyToken(req);
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const status = searchParams.get("status");

  const where = { userId };

  if (category) {
    where.category = {
      name: {
        equals: category,
        mode: "insensitive", // This makes the comparison case-insensitive
      },
    };
  }

  //   if (status) where.status = status;
  if (status) {
    where.status = {
      equals: status,
      mode: "insensitive",
    };
  }
  const tasks = await prisma.task.findMany({
    where,
    include: {
      category: true, // Include category details in the response if needed
    },
  });

  return Response.json(tasks);
}
export async function POST(req) {
  const userId = verifyToken(req);
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const parse = taskSchema.safeParse(body);
  if (!parse.success)
    return Response.json({ error: "Invalid input" }, { status: 400 });

  const { title, description, status, categoryId } = parse.data;

  const task = await prisma.task.create({
    data: { title, description, status, categoryId, userId },
  });

  return Response.json(task);
}

// import { prisma } from "../../../lib/prisma";
// import { verifyToken } from "../../../middlewares/auth";

// export async function GET(req) {
//   const userId = verifyToken(req);
//   if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

//   const { searchParams } = new URL(req.url);
//   const category = searchParams.get("category");
//   const status = searchParams.get("status");

//   const where = { userId };
//   if (category) where.category = { name: category };
//   if (status) where.status = status;

//   const tasks = await prisma.task.findMany({ where });
//   return Response.json(tasks);
// }

// export async function GET(req) {
//   const userId = verifyToken(req);
//   if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

//   const { searchParams } = new URL(req.url);
//   const category = searchParams.get("category");
//   const status = searchParams.get("status");

//   const where = { userId };

//   if (category) {
//     where.category = {
//       name: {
//         equals: category,
//         mode: "insensitive", // This makes the comparison case-insensitive
//       },
//     };
//   }

//   //   if (status) where.status = status;
//   if (status) {
//     where.status = {
//       equals: status,
//       mode: "insensitive",
//     };
//   }
//   const tasks = await prisma.task.findMany({
//     where,
//     include: {
//       category: true, // Include category details in the response if needed
//     },
//   });

//   return Response.json(tasks);
// }

// export async function POST(req) {
//   const userId = verifyToken(req);
//   if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

//   const { title, description, status, categoryId } = await req.json();
//   const task = await prisma.task.create({
//     data: { title, description, status, userId, categoryId },
//   });

//   return Response.json(task);
// }
