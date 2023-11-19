/* NextUI imports */
import {
  Button,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { IconMovie } from "@tabler/icons-react";

/* Components imports */
import SearchBarClient from "~/app/_components/search-bar-client";
import NavbarUserDropdownClient from "~/app/_components/navbar-user-dropdown-client";

/* Types imports */
import { type Session } from "next-auth";

export default function NavbarDesktopClient({
  session,
}: {
  session: Session | null;
}) {
  return (
    <>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {/* Navbar brand */}
        <NavbarBrand>
          <Link href="/" className="hover:opacity-100" color="foreground">
            <IconMovie className="-rotate-45 text-primary" />
            <span className="font-bold">TheCinephileHouse</span>
          </Link>
        </NavbarBrand>

        {/* Home link */}
        <NavbarItem>
          <Link href="/" color="foreground">
            Home
          </Link>
        </NavbarItem>

        {/* Movies link */}
        <NavbarItem>
          <Link href="/movies" color="foreground">
            Movies
          </Link>
        </NavbarItem>

        {/* TV Shows link */}
        <NavbarItem>
          <Link href="/tv-shows" color="foreground">
            TV Shows
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <div className="hidden h-full flex-grow md:flex">
          <SearchBarClient />
        </div>

        {session ? (
          <NavbarUserDropdownClient user={session.user} />
        ) : (
          <>
            {/* Login link */}
            <NavbarItem className="hidden xs:flex">
              <Link href="/login" color="foreground">
                Login
              </Link>
            </NavbarItem>

            {/* Sign up button link */}
            <Button
              as={Link}
              href="/signup"
              color="primary"
              className="font-bold"
            >
              Sign up
            </Button>
          </>
        )}
      </NavbarContent>
    </>
  );
}
