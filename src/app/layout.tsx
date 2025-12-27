import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { AppSidebar } from "@/components/layout/AppSidebar";
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
  title: "Nexus Tools - Developer Utilities",
  description: "Free, fast, and secure developer tools including JSON formatters, image converters, and more.",
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
            <div className="relative flex min-h-screen">
              {/* Desktop Sidebar */}
              <AppSidebar />

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col md:pl-64 lg:pl-72 transition-all duration-300">
                <Navbar />
                <main className="flex-1 container py-6 max-w-7xl mx-auto">{children}</main>
                <Footer />
              </div>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
