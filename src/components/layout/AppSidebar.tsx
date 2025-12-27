"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package2, Search, PanelLeftClose, PanelLeftOpen } from "lucide-react"

import { categories, tools } from "@/config/tools"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Dispatch, SetStateAction } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AppSidebarProps {
    isCollapsed: boolean
    setIsCollapsed: Dispatch<SetStateAction<boolean>>
}

export function AppSidebar({ isCollapsed, setIsCollapsed }: AppSidebarProps) {
    const pathname = usePathname()

    return (
        <TooltipProvider delayDuration={0}>
            <div
                className={cn(
                    "hidden border-r bg-muted/10 md:flex h-screen flex-col fixed left-0 top-0 overflow-hidden transition-all duration-300 ease-in-out z-40 bg-background",
                    isCollapsed ? "w-[60px]" : "w-64 lg:w-72"
                )}
            >
                <div className={cn("flex h-14 items-center border-b px-4 lg:h-[60px] bg-background", isCollapsed ? "justify-center px-2" : "px-6")}>
                    {!isCollapsed && (
                        <Link href="/" className="flex items-center gap-2 font-semibold truncate">
                            <Package2 className="h-6 w-6 shrink-0" />
                            <span className="">OpenToolbox</span>
                        </Link>
                    )}
                    {isCollapsed && (
                        <Link href="/" className="flex items-center justify-center">
                            <Package2 className="h-6 w-6 shrink-0" />
                        </Link>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn("ml-auto h-8 w-8 text-muted-foreground", isCollapsed && "hidden")}
                        onClick={() => setIsCollapsed(true)}
                    >
                        <PanelLeftClose className="h-4 w-4" />
                    </Button>
                </div>
                {/* 14 is 3.5rem (56px) - lg is 60px */}
                <ScrollArea className="h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-60px)]">
                    <div className="flex flex-col gap-2 p-2">
                        {isCollapsed && (
                            <div className="flex flex-col gap-2 items-center pt-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => setIsCollapsed(false)}
                                >
                                    <PanelLeftOpen className="h-4 w-4" />
                                </Button>
                                {categories.map(cat => (
                                    <div key={cat.id} className="pt-2">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="p-2 text-muted-foreground hover:text-foreground cursor-default">
                                                    <cat.icon className="h-4 w-4" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="right">
                                                {cat.label}
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                ))}
                            </div>
                        )}

                        {!isCollapsed && (
                            <>
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
                            </>
                        )}
                    </div>
                </ScrollArea>
            </div>
        </TooltipProvider>
    )
}
