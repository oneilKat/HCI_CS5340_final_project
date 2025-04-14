export const avatarLink: Record<string, string> = {
    bear: "/avatars/bear.png",
    cat: "/avatars/cat.png",
    husky: "/avatars/husky.png",
    person: "/avatars/person.png",
    pig: "/avatars/pig.png",
    wizard: "/avatars/wizard.png"
};

export function getAvatarFromName(name: string | undefined): string {
    if (!name) {
        return avatarLink["person"];
    }
    return avatarLink[name] || avatarLink["person"];
}