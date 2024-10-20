import { prisma } from "./client";
import { PrismaPromise } from "@prisma/client";
//import fs from "fs";

export type BulkUpdateEntry = {
  [key: string]: number | string | boolean | Date | undefined | null;
};
export type BulkUpdateEntries = BulkUpdateEntry[];

export function bulkUpdate(
  tableName: string,
  entries: BulkUpdateEntries,
  where: string | undefined = "id"
): PrismaPromise<number> {
  if (entries.length === 0) return prisma.$executeRawUnsafe(`SELECT 1;`);

  const removeColumns = ["id", where];
  const fields = Object.keys(entries[0]!).filter((key) => !removeColumns.includes(key));
  const setSql = fields
    .map((field) => `"${field}" = data."${field}"${field === "refund_limit" ? "::integer" : ""}`)
    .join(", ");

  const valuesSql = entries
    .map((entry) => {
      const values = fields
        .map((field) => {
          const value = entry[field];
          if (field === "deleted_at" && value === null) {
            return "NULL::date";
          }
          if (typeof value === "string") {
            // Handle strings and escape single quotes
            return `'${value.replace(/'/g, "''")}'`;
          } else if (value instanceof Date) {
            return `'${value.toISOString()}'::date`;
          } else if (value === null || value === undefined) {
            // Convert null and undefined to SQL NULL
            return "NULL";
          }
          // Numbers and booleans are used as-is
          return value;
        })
        .filter((value) => value !== `'undefined'`);

      return `('${entry.id}', ${values.join(", ")})`;
    })
    .join(", ");

  const sql = `
    UPDATE "${tableName}"
    SET ${setSql}
    FROM (VALUES ${valuesSql}) AS data("${where}", ${fields.map((field) => `"${field}"`).join(", ")})
    WHERE "${tableName}".${where}::text = data.${where};
  `;

  // store in file for debugging the sql query
  // fs.writeFileSync("./bulkUpdate.txt", sql);

  return prisma.$executeRawUnsafe(sql);
}
