"use client";

import { getAvatarFromName } from "@/lib/avatars";
import {
  Avatar,
  Button,
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  avatar: string;
  xp: number;
  role: string;
  verified: boolean;
}

export default function AuthButton({ minimal = true }: { minimal?: boolean }) {
  const { data, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  
      useEffect(() => {
          const fetchUser = async () => {
              const res = await fetch("/api/user");
              if (!res.ok) {
                  throw new Error("Failed to fetch user");
              }
              const data = await res.json();
              setUser(data);
          };
          fetchUser();
      }, []);
      const avatar = getAvatarFromName(user?.avatar);

  if (status === "loading") {
    return <CircularProgress />;
  }

  if (status === "authenticated") {
    const signOutClick = () =>
      signOut({
        callbackUrl: "/",
      });
    if (minimal) {
      return (
        <Button onPress={signOutClick} color="danger" variant="ghost">
          <IconBrandGoogle />
          Sign Out
        </Button>
      );
    }

    return (
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            showFallback={false}
            src={avatar || ""}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{data.user?.email}</p>
          </DropdownItem>
          <DropdownItem key="sign-out" color="danger" onPress={signOutClick}>
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  return (
    <Button
      onPress={() => signIn("google", { callbackUrl: "/profile" })}
      color="danger"
      variant="ghost"
    >
      <IconBrandGoogle />
      Sign In
    </Button>
  );
}
