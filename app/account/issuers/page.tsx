import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "lib/authOptions";
import { revalidatePath } from "next/cache";
import UserIssuerManagement from "components/user-issuer-management";
import { prisma } from "db/client";

export default async function AccountIssuers() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id
    },
    include: {
      UserIssuerCustomergroup: true
    }
  });
  if (!user) return null;
  const issuers = await prisma.issuer.findMany({
    include: {
      customergroups: true
    }
  });
  const handleDataRevalidation = async () => {
    "use server";
    revalidatePath(`/account/issuers`);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Gestionar Tarjetas</h3>
        <p className="text-sm text-muted-foreground">Agrega o elimina las tarjetas asociadas en tu cuenta.</p>
      </div>

      {/* <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <IoIosSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          name="q"
          className="block w-full rounded-lg border border-input bg-input-background p-2.5 px-10 text-sm placeholder-gray-400 focus:border-primary-main focus:outline-none"
          placeholder="Buscar por nombre"
          required
        />
      </div> */}
      <UserIssuerManagement user={user} issuers={issuers} onUpdated={handleDataRevalidation} />
    </div>
  );
}
