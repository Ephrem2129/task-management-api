import jwt from "jsonwebtoken";

export function verifyToken(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (e) {
    return null;
  }
}
// This middleware verifies the JWT token from the request headers.
// It extracts the token from the Authorization header, verifies it using the JWT_SECRET,
// and returns the user ID if valid. If the token is invalid or not present, it returns null.
// Ensure to set the JWT_SECRET environment variable for token verification.
// This middleware is useful for protecting routes that require authentication by checking the validity of the token.
// It can be used in API routes to ensure that only authenticated users can access certain resources.
// Example usage:
// import { verifyToken } from "@/middlewares/auth";
// export async function handler(req) {
//   const userId = verifyToken(req);
//   if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });
//   // Proceed with the request handling for authenticated users
//   return Response.json({ message: "Success" });
// }
