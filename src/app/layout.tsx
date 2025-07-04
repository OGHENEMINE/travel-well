import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Toaster } from "sonner";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Travel wellness",
  description: "Your number 1 travel paddy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased grid grid-rows-[auto_1fr_auto] min-h-screen bg-neutral-100 text-muted`}
      >
        <ReactQueryProvider>
          <Navbar />
          <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row py-4 lg:py-10 gap-4 lg:gap-16 px-4 lg:px-0">
            <Sidebar />
            <main className="flex-1 min-w-0">{children}</main>
          </div>
          <footer className="text-center font-bold py-4 px-4">
            Travel well &copy; 2025. All rights reserved.{" "}
          </footer>
          <Toaster position="top-right" richColors />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
