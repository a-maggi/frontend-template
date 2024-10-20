"use server";
import { revalidatePath } from "next/cache";

export const handlePageRevalidation = async () => {
  revalidatePath(`/`);
};
