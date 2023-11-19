"use client";

/* React imports */
import { useState } from "react";

/* NextUI imports */
import { Navbar } from "@nextui-org/react";

/* Components imports */
import NavbarMobileClient from "~/app/_components/navbar-mobile-client";
import NavbarDesktopClient from "~/app/_components/navbar-desktop-client";

/* Types imports */
import type { Session } from "next-auth";

export default function NavbarClient({ session }: { session: Session | null }) {
  /* Mobile menu state */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      isBordered
      maxWidth="xl"
    >
      {/* Mobile */}
      <NavbarMobileClient isMenuOpen existSession={session ? true : false} />

      {/* Desktop */}
      <NavbarDesktopClient session={session} />
    </Navbar>
  );
}
