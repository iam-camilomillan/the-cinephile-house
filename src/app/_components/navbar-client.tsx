"use client";

/* React imports */
import { useState } from "react";

/* NextAuth imports */
import { signOut } from "next-auth/react";

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
  Input,
} from "@nextui-org/react";

/* Icons imports */
import { IconMovie, IconSearch } from "@tabler/icons-react";

/* Types imports */
import type { Session } from "next-auth";

export default function NavbarClient({ session }: { session: Session | null }) {
  /* Mobile menu state */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* Search state */
  const [searchInputValue, setSearchInputValue] = useState("");

  /* Handle log out  */
  const handleLogOut = async () => {
    await signOut();
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
            <IconMovie className="-rotate-45 text-primary" />
            <span className="font-bold">TheCinephileHouse</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop */}
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

      {/* Navigation authorization links */}
      <NavbarContent as="div" justify="end">
        <Input
          isClearable
          radius="lg"
          placeholder="Search movies or TV shows"
          startContent={<IconSearch />}
          classNames={{
            inputWrapper: "bg-neutral-900",
          }}
          value={searchInputValue}
          onValueChange={setSearchInputValue}
          className="hidden md:flex"
        />

        {session?.user ? (
          <Dropdown
            placement="bottom-end"
            classNames={{ content: "bg-neutral-900" }}
          >
            <DropdownTrigger>
              <Avatar
                as="button"
                src={session.user.image ?? ""}
                color="primary"
                size="sm"
                isBordered
                className="ring-primary transition-transform"
              />
            </DropdownTrigger>

            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="settings">
                <Link
                  href="/profile"
                  className="h-full w-full"
                  color="foreground"
                >
                  <span>Profile</span>
                </Link>
              </DropdownItem>

              <DropdownItem key="team_settings">
                <Link
                  href="/profile/lists"
                  className="h-full w-full"
                  color="foreground"
                >
                  <span>Lists</span>
                </Link>
              </DropdownItem>

              {/* Log out button */}
              <DropdownItem key="logout" color="primary">
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
        ) : (
          <>
            {/* Login link */}
            <NavbarItem className="hidden xs:flex sm:hidden md:flex">
              <Link href="/login" color="foreground">
                Login
              </Link>
            </NavbarItem>

            {/* Sign up button link */}
            <>
              <Button
                as={Link}
                href="/signup"
                color="primary"
                className="font-bold hover:bg-secondary hover:opacity-100"
              >
                Sign Up
              </Button>
            </>
          </>
        )}
      </NavbarContent>

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
