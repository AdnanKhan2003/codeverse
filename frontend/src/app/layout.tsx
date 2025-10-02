import type { Metadata } from "next";
import { Poppins, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/Navbar/ConditionalNavbar/ConditionalNavbar";
import { Providers } from "@/lib/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CodeVerse",
  description: "Multi-Language Support Online Code Editor",
  icons: {
    icon: "/logos/codeverse_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        <Providers>
          <ConditionalNavbar />
          <main>{children}</main>
          <div id="modal__root"></div>
        </Providers>
      </body>
    </html>
  );
}
