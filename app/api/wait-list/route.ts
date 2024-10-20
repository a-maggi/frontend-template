import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return Response.json({ message: "Missing Fields" }, { status: 400 });
  }

  const exist = await prisma.waitingList.findUnique({
    where: {
      email
    }
  });

  if (exist) {
    return Response.json({ message: "Added to the wait list" });
  }

  await prisma.waitingList.create({
    data: {
      email
    }
  });

  return Response.json({ message: "Added to the wait list" });
}
