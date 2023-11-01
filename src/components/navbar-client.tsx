"use client";

/* React imports */
import { useState } from "react";

/* NextUI imports */
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

/* Icons imports */
import { IconMovie } from "@tabler/icons-react";

/* Temporary Session type */
type Session = {
  user: {
    id: string;
    name: string;
    avatar: string;
  };
};

export default function NavbarClient({ session }: { session: Session | null }) {
  /* Mobile menu state */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* Handle log out  */
  const handleLogOut = () => {
    console.log("Logged out");
  };

  return (
    <Navbar
      isBordered
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
    >
      <NavbarContent className="sm:hidden" justify="start">
        {/* Mobile menu toggler */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />

        {/* Navbar brand */}
        <NavbarBrand>
          <Link href="/" className="hover:opacity-100" color="foreground">
            <IconMovie className="-rotate-45 text-red-600" />
            <span className="font-bold">TheCinephileHouse</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop */}
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {/* Navbar brand */}
        <NavbarBrand>
          <Link href="/" className="hover:opacity-100" color="foreground">
            <IconMovie className="-rotate-45 text-red-600" />
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

        {/* Top Rated link */}
        <NavbarItem>
          <Link href="/top-rated" color="foreground">
            Top Rated
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Navigation authorization links */}
      {session ? (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="danger"
                size="sm"
                src={session.user.avatar}
              />
            </DropdownTrigger>

            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="settings">
                <Link
                  href="/profile"
                  className="h-full w-full"
                  color="foreground"
                >
                  Profile
                </Link>
              </DropdownItem>

              <DropdownItem key="team_settings">
                <Link
                  href="/profile/lists"
                  className="h-full w-full"
                  color="foreground"
                >
                  Lists
                </Link>
              </DropdownItem>

              {/* Log out button */}
              <DropdownItem key="logout" color="danger">
                <button
                  type="button"
                  onClick={handleLogOut}
                  className="h-full w-full text-start"
                >
                  <span>Log Out</span>
                </button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          {/* Login link */}
          <NavbarItem className="hidden xs:flex sm:hidden md:flex">
            <Link href="/login" color="foreground">
              Login
            </Link>
          </NavbarItem>

          {/* Sign up button link */}
          <NavbarItem>
            <Button
              as={Link}
              href="/signup"
              className="font-bold"
              color="danger"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      {/* Mobile */}
      <NavbarMenu>
        {/* Home link */}
        <NavbarMenuItem>
          <Link href="/" className="w-full" color="foreground" size="lg">
            Home
          </Link>
        </NavbarMenuItem>

        {/* Movies link */}
        <NavbarMenuItem>
          <Link href="/movies" className="w-full" color="foreground" size="lg">
            Movies
          </Link>
        </NavbarMenuItem>

        {/* TV Shows link */}
        <NavbarMenuItem>
          <Link
            href="/tv-shows"
            className="w-full"
            color="foreground"
            size="lg"
          >
            TV Shows
          </Link>
        </NavbarMenuItem>

        {/* Top Rated link */}
        <NavbarMenuItem>
          <Link
            href="/top-rated"
            className="w-full"
            color="foreground"
            size="lg"
          >
            Top Rated
          </Link>
        </NavbarMenuItem>

        {/* Login link */}
        <NavbarMenuItem>
          <Link
            href="/login"
            className="w-full font-bold xs:hidden"
            color="foreground"
            size="lg"
          >
            Login
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
