"use client";

export default function TestXpButton() {
    const handleClick = async () => {
        const res = await fetch("/api/user/xp", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ xp: 10 }),
        });
        const data = await res.json();
        console.log(data);
    };

    return <button onClick={handleClick}>Add 10 XP</button>;
}