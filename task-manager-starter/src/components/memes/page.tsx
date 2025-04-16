import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getMemes } from '@/utils/getMemes';

export default function MotivationalMeme() {
    const [selectedMeme, setSelectedMeme] = useState<string>('');

    useEffect(() => {
        const memes = getMemes();
        if (memes.length > 0) {
            const randomIndex = Math.floor(Math.random() * memes.length);
            setSelectedMeme(memes[randomIndex].image);
        }
    }, []);

    if (!selectedMeme) return null;

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-xl font-semibold text-purple-600 mb-4">Today's Motivation! 🚀</h3>
            <div className="relative w-full h-[300px]">
                <Image
                    src={selectedMeme}
                    alt="Motivational Meme"
                    fill
                    className="object-contain rounded-lg"
                    priority
                />
            </div>
        </div>
    );
}