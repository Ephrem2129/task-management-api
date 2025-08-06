import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema } from "../../../../lib/validation";

export async function POST(req) {
  const body = await req.json();

  const parse = loginSchema.safeParse(body);
  if (!parse.success)
    return Response.json({ error: "Invalid input" }, { status: 400 });

  const { email, password } = parse.data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return Response.json({ token });
}
