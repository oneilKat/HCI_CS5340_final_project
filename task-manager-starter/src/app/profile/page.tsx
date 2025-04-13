import { Card, CardBody, User } from "@heroui/react";
import { getServerSession } from "next-auth/next";

import options from "@/config/auth";
import requireAuth from "@/utils/require-auth";
import TestXpButton from "@/components/test-xp-button/page";
import TestLevelbar from "@/components/level-bar/page";

export default async function Profile() {
  await requireAuth();
  const session = await getServerSession(options);

  return (
    <Card className="mx-auto mt-4 max-w-md">
      <CardBody>
        <User
          name={session?.user?.name}
          description={session?.user?.email}
          avatarProps={{
            showFallback: !session?.user?.image,
            src: session?.user?.image || "",
          }}
        />
        <TestLevelbar />
        <TestXpButton />
      </CardBody>
    </Card>
  );
}
