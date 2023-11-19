/* NextUI imports */
import {
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

/* Components imports */
import SearchBarClient from "~/app/_components/search-bar-client";

/* Icons imports */
import { IconMovie } from "@tabler/icons-react";

export default function NavbarMobileClient({
  isMenuOpen,
  existSession,
}: {
  isMenuOpen: boolean;
  existSession: boolean;
}) {
  return (
    <>
      {/* Menu toggler and brand */}
      <NavbarContent justify="start" className="sm:hidden">
        {/* Menu toggler */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />

        {/* Navbar brand */}
        <NavbarBrand>
          <Link href="/" color="foreground" className="hover:opacity-100">
            <IconMovie className="-rotate-45 text-primary" />
            <span className="font-bold">TheCinephileHouse</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Menu */}
      <NavbarMenu>
        {/* Home link */}
        <NavbarMenuItem>
          <Link href="/" color="foreground" size="lg" className="w-full">
            Home
          </Link>
        </NavbarMenuItem>

        {/* Movies link */}
        <NavbarMenuItem>
          <Link href="/movies" color="foreground" size="lg" className="w-full">
            Movies
          </Link>
        </NavbarMenuItem>

        {/* TV Shows link */}
        <NavbarMenuItem>
          <Link
            href="/tv-shows"
            color="foreground"
            size="lg"
            className="w-full"
          >
            TV Shows
          </Link>
        </NavbarMenuItem>

        {/* Login link */}
        {existSession ? null : (
          <NavbarMenuItem className="mt-4">
            <Link
              href="/login"
              color="foreground"
              size="lg"
              className="w-full font-bold xs:hidden"
            >
              Login
            </Link>
          </NavbarMenuItem>
        )}

        {/* Search bar */}
        <NavbarMenuItem className="mt-4 ">
          <SearchBarClient />
        </NavbarMenuItem>
      </NavbarMenu>
    </>
  );
}
