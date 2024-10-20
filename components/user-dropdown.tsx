"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "components/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Session } from "next-auth";
import { FaSignOutAlt } from "react-icons/fa";

export type UserDropdownProps = {
  user: Session["user"];
};

const UserDropdown: React.FC<UserDropdownProps> = (props) => {
  const { user } = props;
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:outline-none focus:outline-none select-none">
        <Avatar className="inline-flex aspect-square w-[36px] h-full select-none items-center justify-center overflow-hidden rounded-lg align-middle">
          <AvatarImage
            className="h-full w-full rounded-[inherit] object-cover"
            src={user?.image || user?.picture || ""}
            alt={`Avatar for ${user?.name}`}
          />
          <AvatarFallback className="flex h-full w-full items-center justify-center text-[15px] font-medium bg-muted-foreground rounded-[inherit]">
            {user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={5}
        align="end"
        className="dropdown-menu-content w-40 md:w-48 rounded border py-1 opacity-100 shadow-md transition duration-300"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground text-ellipsis overflow-hidden">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="dropdown-item hover:outline-none" asChild>
          <Link href="/account" passHref>
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="dropdown-item hover:outline-none" onClick={handleSignOut}>
          Sign out
          <DropdownMenuShortcut>
            <FaSignOutAlt />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
