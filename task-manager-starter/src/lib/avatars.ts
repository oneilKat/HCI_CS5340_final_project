export const avatarLink: Record<string, string> = {
    bear: "/avatars/bear.png",
    cat: "/avatars/cat.png",
    husky: "/avatars/husky.png",
    person: "/avatars/person.png",
    pig: "/avatars/pig.png",
    wizard: "/avatars/wizard.png"
};

type AvatarOption = {
    name: string;
    image: string;
    xpRequired: number;
}

export const avatarOptions: AvatarOption[] = [
    { name: "person", image: "/avatars/person.png", xpRequired: 0},
    { name: "cat", image: "/avatars/cat.png", xpRequired: 100},
    { name: "husky", image: "/avatars/husky.png", xpRequired: 250},
    { name: "bear", image: "/avatars/bear.png", xpRequired: 450},
    { name: "pig", image: "/avatars/pig.png", xpRequired: 700},
    { name: "wizard", image: "/avatars/wizard.png", xpRequired: 1000},
];

export function getAvatarFromName(name: string | undefined): string {
    if (!name) {
        return avatarLink["person"];
    }
    return avatarLink[name] || avatarLink["person"];
}

export const handleAvatarClick = async (avatarName: string, unlocked: boolean) => {
    if (!unlocked) return;
  
    try {
      const res = await fetch("/api/user/avatar", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar: avatarName }),
      });
  
      if (!res.ok) throw new Error("Failed to update avatar");
  
      const data = await res.json();
      console.log("Avatar updated:", data.avatar);
  
      // Optional: toast or update UI state
    } catch (err) {
      console.error(err);
    }
  };