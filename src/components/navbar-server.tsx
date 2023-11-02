import NavbarClient from "@/components/navbar-client";

export default function NavbarServer() {
  const session = {
    user: {
      id: "123244534",
      name: "Camilo Millan",
      avatar: "",
    },
  };

  return <NavbarClient session={session} />;
}
