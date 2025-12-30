import Link from "next/link"
import { ArrowRight } from "lucide-react"

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { categories, tools } from "@/config/tools"

export const metadata = {
    title: "All Developer Tools - OpenToolBox",
    description: "Browse our complete collection of developer utilities.",
}

export default function ToolsPage() {
    return (
        <ToolWrapper title="All Tools" description="Browse our complete collection of developer utilities." adSlot="tools-index">
            <div className="space-y-12">
                {categories.map((category) => {
                    const categoryTools = tools.filter(tool => tool.category === category.id)

                    if (categoryTools.length === 0) return null

                    return (
                        <div key={category.id} id={category.id} className="space-y-6">
                            <div className="flex items-center gap-2 border-b pb-2">
                                <category.icon className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">{category.label}</h2>
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {categoryTools.map((tool) => (
                                    <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                                        <Card className="hover:bg-muted/50 transition-colors h-full">
                                            <CardHeader>
                                                <CardTitle className="text-base flex items-center justify-between mb-2">
                                                    <span className="flex items-center gap-2">
                                                        <tool.icon className="h-4 w-4 text-muted-foreground" />
                                                        {tool.name}
                                                    </span>
                                                    {tool.isNew && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">NEW</span>}
                                                </CardTitle>
                                                <CardDescription className="line-clamp-2">{tool.description}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </ToolWrapper>
    )
}
