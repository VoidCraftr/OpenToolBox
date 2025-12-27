"use client"

import Link from "next/link"
import { tools } from "@/config/tools"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export function RelatedTools({ currentSlug }: { currentSlug: string }) {
    const currentTool = tools.find((t) => t.slug === currentSlug)

    if (!currentTool) return null

    // Find tools in same category, excluding current
    // We shuffle or just take the first 3 for now. 
    // Ideally we could have a "related" field in metadata, but category is a good proxy.
    const related = tools
        .filter((t) => t.category === currentTool.category && t.slug !== currentSlug)
        .slice(0, 3)

    if (related.length === 0) return null

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold tracking-tight">Recommended Tools</h3>
                <Link href="/tools" className="text-sm text-primary hover:underline flex items-center">
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                {related.map((tool) => (
                    <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group">
                        <Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1 border-muted bg-muted/30">
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg bg-background border shadow-sm group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                        <tool.icon className="h-5 w-5" />
                                    </div>
                                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                                        {tool.name}
                                    </CardTitle>
                                </div>
                                <CardDescription className="line-clamp-2 text-sm">
                                    {tool.description}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
