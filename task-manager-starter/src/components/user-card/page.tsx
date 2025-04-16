import { Card, CardBody, User } from "@heroui/react";
import { useEffect, useState } from "react";
import { getAvatarFromName } from "@/lib/avatars";
import Levelbar from "../level-bar/page";
import Link from "next/link"; // Import Link for navigation

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
    <Card className="mx-auto mt-8 max-w-lg bg-white shadow-lg rounded-xl border border-gray-300">
      <CardBody className="p-8 space-y-6">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
            <img
              src={avatar || ""}
              alt={name || "User Avatar"}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">{name}</div>
            <div className="text-lg text-gray-600">{email}</div>
          </div>
        </div>
        <div className="text-lg font-semibold text-gray-700">ROLE: {role}</div>
        <div className="text-lg font-semibold text-gray-700">VERIFIED: {verified ? "Yes" : "No"}</div>

        <div className="mt-6">
          <Levelbar />
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/api/auth/signout"
            className="w-full py-3 text-center bg-red-700 text-white rounded-lg hover:bg-red-700 transition duration-200 ease-in-out"
          >
            Sign Out
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}