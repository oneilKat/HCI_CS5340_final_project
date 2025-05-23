import type { Metadata } from "next";
import { Suspense } from "react";

import Providers from "@/components/providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Next App Starter",
  description: "Next.js starter kit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👾</text></svg>"
        />
      </head>
      <body className="h-screen w-screen">
        <Providers>
          <main className="flex-grow overflow-auto bg-slate-100 bg-cover bg-repeat dark:bg-[url(/dark-bg.svg)]">
            <Suspense>{children}</Suspense>
          </main>
        </Providers>
      </body>
    </html>
  );
}
