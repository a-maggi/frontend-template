import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return Response.json({ message: "All fields are required" }, { status: 400 });
  }

  const exist = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (exist && exist.hashedPassword) {
    return Response.json({ message: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: {
      email
    },
    update: {
      name,
      hashedPassword
    },
    create: {
      name,
      email,
      hashedPassword
    }
  });

  return Response.json({ message: "User created", user });
}
