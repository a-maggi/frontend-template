import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export async function fetcher(args: RequestInfo) {
  const res = await fetch(args);
  return res.json();
}

export function slugify(str = ""): string {
  return str
    .toLowerCase()
    .trim()
    .normalize("NFD") // separate accent from letter
    .replace(/[\u0300-\u036f]/g, "") // remove all separated accents
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/&/g, "-and-") // replace & with 'and'
    .replace(/[^\w\-]+/g, "") // remove all non-word chars
    .replace(/\-\-+/g, "-"); // replace multiple '-' with single '-'
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function compareArrays(arr1: unknown[], arr2: unknown[]) {
  return arr1.filter((element) => arr2.includes(element));
}
