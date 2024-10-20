"use server";
import { prisma } from "./client";

export const getUsers = async () => {
  return await prisma.user.findMany();
};
