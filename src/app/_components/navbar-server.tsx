/* Auth imports */
import { getServerAuthSession } from "~/server/auth";

/* Components imports */
import NavbarClient from "~/app/_components/navbar-client";

export default async function NavbarServer() {
  const session = await getServerAuthSession();

  return <NavbarClient session={session} />;
}
