// import { prisma } from "../../../../lib/prisma";

// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// export async function POST(req) {
//   const { email, password } = await req.json();
//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return Response.json({ error: "Invalid credentials" }, { status: 401 });
//   }

//   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
//   return Response.json({ token });
// }
// This code handles user login by verifying credentials and returning a JWT token.
// It uses bcrypt for password hashing and jwt for token generation. The token is valid for 7 days.
// Ensure to set the JWT_SECRET environment variable for signing the token.
// This code handles user registration by checking for existing users, hashing the password, and creating a new user in the database.
// It uses bcrypt for password hashing and Prisma for database interactions. The hashed password is stored securely in the database.
// Ensure to set up the Prisma client and database connection properly before using this code.
// This code handles user login by verifying credentials and returning a JWT token.

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
