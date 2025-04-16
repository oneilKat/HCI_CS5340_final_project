import { useState, useEffect } from "react";
import { quotes } from "@/lib/quotes";

export default function MotivationalQuote() {
    const [quote, setQuote] = useState<string>("");

    useEffect(() => {
        if (quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setQuote(quotes[randomIndex]);
        }
    }, []);

    if (!quote) return null;

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-xl font-semibold text-purple-600 mb-4">Today&apos;s Motivation! 🚀</h3>
            <blockquote className="text-lg italic text-gray-700 text-center px-4">
                “{quote}”
            </blockquote>
        </div>
    );
}