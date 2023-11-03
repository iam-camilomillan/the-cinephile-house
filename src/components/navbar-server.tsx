import NavbarClient from "@/components/navbar-client";

export default function NavbarServer() {
  /* const session = {
    user: {
      id: "123244534",
      name: "Camilo Millan",
      avatar: "",
    },
  }; */
  const session = null;

  return <NavbarClient session={session} />;
}
