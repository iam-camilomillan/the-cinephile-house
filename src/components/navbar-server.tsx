import NavbarClient from "@/components/navbar-client";

export default function NavbarServer() {
  const session = null;

  return <NavbarClient session={session} />;
}
