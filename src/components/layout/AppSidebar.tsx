"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package2, Search, Settings } from "lucide-react"

import { categories, tools } from "@/config/tools"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <div className="hidden border-r bg-muted/10 md:block md:w-64 lg:w-72 h-screen flex-col fixed left-0 top-0 overflow-hidden">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-background">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Package2 className="h-6 w-6" />
                    <span className="">Nexus Tools</span>
                </Link>
                <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                </Button>
            </div>

            <ScrollArea className="flex-1">
                <div className="flex flex-col gap-2 p-2">
                    <div className="py-2">
                        <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
                            Discover
                        </h2>
                        <div className="space-y-1">
                            <Link href="/tools">
                                <Button variant={pathname === "/tools" ? "secondary" : "ghost"} className="w-full justify-start font-normal">
                                    <span className="ml-2">All Tools</span>
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {categories.map((category) => (
                        <div key={category.id} className="py-2">
                            <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground uppercase flex items-center gap-2">
                                <category.icon className="h-3 w-3" />
                                {category.label}
                            </h2>
                            <div className="space-y-1">
                                {tools
                                    .filter(t => t.category === category.id)
                                    .map((tool) => (
                                        <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                                            <Button
                                                variant={pathname.includes(tool.slug) ? "secondary" : "ghost"}
                                                className={cn("w-full justify-start font-normal h-9", pathname.includes(tool.slug) && "bg-muted font-medium")}
                                            >
                                                <tool.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                                <span className="truncate">{tool.name}</span>
                                                {tool.isNew && <span className="ml-auto text-[10px] font-bold text-blue-500">NEW</span>}
                                            </Button>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <div className="border-t p-4">
                <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-muted-foreground">
                    <span className="text-xs">v2.0.0 (Pro)</span>
                </div>
            </div>
        </div>
    )
}
