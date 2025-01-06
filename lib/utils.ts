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

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? (accurateSizes[i] ?? "Bytest") : (sizes[i] ?? "Bytes")
  }`;
}
