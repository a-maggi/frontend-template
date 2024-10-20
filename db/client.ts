import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    // uncomment to enable debug mode
    // log: [
    //   {
    //     emit: "event",
    //     level: "query"
    //   }
    // ]
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// prisma.$on('query', (e) => {
//   console.log(e.params);
// });

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
