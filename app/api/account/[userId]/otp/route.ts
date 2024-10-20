import { authOptions } from "lib/authOptions";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import Redis from "lib/redis";
import { sendOtpCodeEmail } from "lib/emails/send-otp-code";

const prisma = new PrismaClient();

export async function GET(_request: NextRequest, { params }: { params: { userId: string } }) {
  const userId = params.userId;

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

  // Generate a six digit number
  const otp = Math.floor(100000 + Math.random() * 900000);
  // Store the OTP in the database redis with an expiration time of 1 hour
  await Redis.setex(`otp-${userId}`, 60 * 60, otp);

  // Send the OTP to the user's email
  await sendOtpCodeEmail(otp, user.email!!);

  return Response.json({ message: "OTP code sent to your email" });
}

export async function POST(request: NextRequest, { params }: { params: { userId: string } }) {
  const userId = params.userId;
  const { otp } = await request.json();

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

  const storedOtp = await Redis.get(`otp-${userId}`);

  if (otp != storedOtp) {
    return Response.json({ message: "Invalid OTP" }, { status: 400 });
  }

  // Delete the OTP from the database
  await Redis.del(`otp-${userId}`);

  // Update the user's email as verified
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      emailVerified: new Date()
    }
  });

  cookies().set("welcome.validation", "true");

  return Response.json({ message: "OTP validated successfully" });
}
