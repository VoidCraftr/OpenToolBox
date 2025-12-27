"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { Footer } from "@/components/common/Footer"
import { MobileNav } from "@/components/layout/MobileNav"
import { ModeToggle } from "@/components/common/ModeToggle"
import { Button } from "@/components/ui/button"
import { Coffee } from "lucide-react"

export function Shell({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <div className="relative flex min-h-screen">
            {/* Desktop Sidebar */}
            <AppSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            {/* Main Content Area */}
            <div
                className={cn(
                    "flex-1 flex flex-col transition-all duration-300 ease-in-out",
                    isCollapsed ? "md:pl-[60px]" : "md:pl-64 lg:pl-72"
                )}
            >
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-6">
                    <div className="md:hidden">
                        <MobileNav />
                    </div>
                    <div className="flex-1 flex justify-center">
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                            <Link
                                href="/tools"
                                className="transition-colors hover:text-foreground/80 text-foreground/60"
                            >
                                All Tools
                            </Link>
                            <Link
                                href="/about"
                                className="transition-colors hover:text-foreground/80 text-foreground/60"
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                className="transition-colors hover:text-foreground/80 text-foreground/60"
                            >
                                Contact
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-2">
                        <a
                            href="https://buymeacoffee.com/voidcraftr"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Button variant="outline" size="sm" className="hidden border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100 hover:text-orange-700 dark:border-orange-900/30 dark:bg-orange-950/20 dark:text-orange-400 dark:hover:bg-orange-950/40 md:flex">
                                <Coffee className="mr-2 h-4 w-4" />
                                Buy Coffee
                            </Button>
                        </a>
                        <div className="h-4 w-px bg-border mx-2 hidden md:block" />
                        <a
                            href="https://github.com/voidcraftr"
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <span className="sr-only">GitHub</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 6 2 7.8 2 1 2.2a13.6 13.6 0 0 0 3-12 1 \-3-5.2A11.5 11.5 0 0 0 10 2 11.5 11.5 0 0 0 4 7.2a5.2 5.2 0 0 0-1.3 5 13.6 13.6 0 0 0 3 12 2.2 2.2 0 0 1-2 1h-2" /><path d="M9 22v-4a4.8 4.8 0 0 0-1-3.5" /></svg>
                        </a>
                        <ModeToggle />
                    </div>
                </header>
                <main className="flex-1 container py-6 max-w-7xl mx-auto">{children}</main>
                <Footer />
            </div>
        </div>
    )
}
