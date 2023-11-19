/* NextAuth imports */
import { signOut } from "next-auth/react";

/* NextUI imports */
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

/* Types imports */
import { type Session } from "next-auth";

export default function NavbarUserDropdown({
  user,
}: {
  user: Session["user"];
}) {
  /* Auth sign out handler */
  const handleLogOut = async () => {
    await signOut();
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          as="button"
          src={user.image ?? ""}
          color="primary"
          className="transition-transform"
        />
      </DropdownTrigger>

      <DropdownMenu aria-label="Profile Actions" variant="flat">
        {/* Profile page link */}
        <DropdownItem key="profile" href="/profile">
          Profile
        </DropdownItem>

        {/* Lists page link */}
        <DropdownItem key="profile-lists" href="/profile/lists">
          Lists
        </DropdownItem>

        {/* Log out button */}
        <DropdownItem
          key="logOut"
          onPress={handleLogOut}
          color="primary"
          className="text-primary"
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
