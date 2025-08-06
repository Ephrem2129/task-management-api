// import { prisma } from "../../../lib/prisma";

// import { verifyToken } from "../../../middlewares/auth";

// export async function GET() {
//   const categories = await prisma.category.findMany();
//   return Response.json(categories);
// }

// export async function POST(req) {
//   const userId = verifyToken(req);
//   if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

//   const { name } = await req.json();
//   const category = await prisma.category.create({ data: { name } });

//   return Response.json(category);
// }

import { prisma } from "../../../lib/prisma";
import { verifyToken } from "../../../middlewares/auth";
import { categorySchema } from "../../../lib/validation";
export async function GET() {
  const categories = await prisma.category.findMany();
  return Response.json(categories);
}
export async function POST(req) {
  const userId = verifyToken(req);
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const parse = categorySchema.safeParse(body);
  if (!parse.success)
    return Response.json({ error: "Invalid input" }, { status: 400 });

  const category = await prisma.category.create({ data: parse.data });

  return Response.json(category);
}
