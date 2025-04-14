import { Card, CardBody, User } from "@heroui/react";
import { useEffect, useState } from "react";
import TestLevelbar from "../level-bar/page";
import TestXpButton from "../test-xp-button/page";
import { getAvatarFromName } from "@/lib/avatars";

interface User {
    name: string;
    email: string;
    avatar: string;
    xp: number;
    role: string;
    verified: boolean;
  }

export default function UserCard() {
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
    const name = user?.name;
    const email = user?.email;
    const avatar = getAvatarFromName(user?.avatar);
    const role = user?.role;
    const verified = user?.verified;
    
    return (
        <Card className="mx-auto mt-4 max-w-md">
      <CardBody>
        <User
          name={name}
          description={email}
          avatarProps={{
            showFallback: false,
            src: avatar || "",
          }}
        />
        <div className="text-sm font-semibold">ROLE: {role}</div>
        <div className="text-sm font-semibold">VERIFIED: {verified ? "Yes" : "No"}</div>
        <TestLevelbar />
        <TestXpButton />
      </CardBody>
    </Card>
    );
}