"use client";

import { useSession } from "next-auth/react";

export default function TestAchievementButton() {
    const { data: session } = useSession();


    const handleClick = async () => {
        if (!session?.user?.email) {
            console.error("No user found");
            return;
        }
        const res = await fetch("/api/achievements", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "First Login!",
                description: "Logged in for the first time!",
                icon: "star",
                userEmail: session.user.email
            }),
        });
        const data = await res.json();
        console.log(data);
    };

    return <button onClick={handleClick}>Get an Achievement</button>;
}