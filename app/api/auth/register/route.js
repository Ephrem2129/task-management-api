// import { prisma } from "../../../../lib/prisma";
// import bcrypt from "bcrypt";

// export async function POST(req) {
//   const { email, password } = await req.json();

//   const existing = await prisma.user.findUnique({ where: { email } });
//   if (existing)
//     return Response.json({ error: "Email exists" }, { status: 400 });

//   const hashed = await bcrypt.hash(password, 10);
//   const user = await prisma.user.create({ data: { email, password: hashed } });

//   return Response.json({ message: "User registered" });
// }

import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcrypt";
import { registerSchema } from "../../../../lib/validation";

export async function POST(req) {
  const body = await req.json();

  const parse = registerSchema.safeParse(body);
  if (!parse.success)
    return Response.json({ error: "Invalid input" }, { status: 400 });

  const { email, password } = parse.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing)
    return Response.json({ error: "Email exists" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { email, password: hashed } });

  return Response.json({ message: "User registered" });
}
