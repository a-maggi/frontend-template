import { authOptions } from "lib/authOptions";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function PUT(_request: NextRequest, props: { params: Promise<{ userId: string }> }) {
  const params = await props.params;
  const userId = params.userId;
  const { currentPassword, newPassword, confirmPassword } = await _request.json();

  if (!currentPassword || !newPassword || !confirmPassword) {
    return Response.json({ message: "All fields are required" }, { status: 400 });
  }

  if (newPassword !== confirmPassword) {
    return Response.json({ message: "The new password and the confirmation password do not match" }, { status: 400 });
  }

  if (newPassword.length < 8) {
    return Response.json({ message: "Password must be at least 8 characters long" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  const session = await getServerSession(authOptions);

  if (!session || user.email !== session.user.email) {
    return Response.json({ message: "You do not have permission to perform this action" }, { status: 403 });
  }

  if (!user.hashedPassword) {
    return Response.json(
      {
        message: "Your account was created using a third-party provider. You can't change your password."
      },
      { status: 400 }
    );
  }

  const passwordMatch = await bcrypt.compare(currentPassword, user.hashedPassword);

  if (!passwordMatch) {
    return Response.json({ message: "Passwords do not match" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      hashedPassword
    }
  });

  return Response.json({ message: "Password updated" });
}

export async function DELETE(_request: NextRequest, props: { params: Promise<{ userId: string }> }) {
  const params = await props.params;
  const { email } = await _request.json();
  const userId = params.userId;

  if (!email) {
    return Response.json({ message: "Email is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  if (email !== user.email) {
    return Response.json({ message: "Email does not match" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);

  if (!session || user.email !== session.user.email) {
    return Response.json({ message: "You do not have permission to perform this action" }, { status: 403 });
  }

  await prisma.user.delete({
    where: {
      id: userId
    }
  });

  return Response.json({ message: "User deleted" });
}
