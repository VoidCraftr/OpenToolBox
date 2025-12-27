import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { Shell } from "@/components/layout/Shell";
import { CommandMenu } from "@/components/common/CommandMenu";
import { AuthProvider } from "@/components/premium/AuthProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenToolBox - Free Online Developer & Security Tools",
  description: "A comprehensive collection of free, open-source, and secure developer tools. JSON Formatter, Image Converter, Password Generator, and more. 100% Client-side privacy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CommandMenu />
            <Shell>
              {children}
            </Shell>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
