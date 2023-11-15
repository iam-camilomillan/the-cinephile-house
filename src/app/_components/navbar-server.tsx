/* Components imports */
import NavbarClient from "~/app/_components/navbar-client";

/* Auth imports */
import { getServerAuthSession } from "~/server/auth";

export default async function NavbarServer() {
  const session = await getServerAuthSession();

  return <NavbarClient session={session} />;
}
