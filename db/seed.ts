import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  // insert initial data
  // await prisma.issuer.upsert({
  //   where: { name: "Personal Pay" },
  //   update: {},
  //   create: {
  //     name: "Personal Pay",
  //     slug: "personal-pay",
  //     customergroups: {
  //       create: [
  //         { name: "Nivel 1", slug: "nivel-1" },
  //         { name: "Nivel 2", slug: "nivel-2" },
  //         { name: "Nivel 3", slug: "nivel-3" }
  //       ]
  //     }
  //   }
  // });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
