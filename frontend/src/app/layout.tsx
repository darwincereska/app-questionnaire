import type { Metadata } from "next";
import "@/app/styles/globals.css";
import { APP_TITLE } from "@/app/consts";
import { NavigationBar } from "@/app/components/Navigation";
// import { StatusBar } from "@capacitor/status-bar";

export const metadata: Metadata = {
  title: APP_TITLE,
  description: "The water app"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavigationBar />
        <div className="h-14 md:h-8"/>
        <main className="px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
