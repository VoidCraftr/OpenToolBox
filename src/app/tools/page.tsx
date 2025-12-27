import Link from "next/link"
import { ArrowRight, Code, FileImage, Lock, Type } from "lucide-react"

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ToolWrapper } from "@/components/tools/ToolWrapper"

export const metadata = {
    title: "All Developer Tools - OpenToolBox",
    description: "Browse our complete collection of developer utilities.",
}

export default function ToolsPage() {
    const categories = [
        {
            title: "Developer Tools",
            description: "JSON, JWT, SQL formatters and validators.",
            icon: Code,
            tools: [
                { name: "JSON Formatter", href: "/tools/json-formatter", description: "Format, minify, and validate JSON data." },
            ],
        },
        {
            title: "Image Tools",
            description: "Convert, resize, and optimize images.",
            icon: FileImage,
            tools: [
                { name: "Image Converter", href: "/tools/image-converter", description: "Convert images between JPG, PNG, and WebP formats." },
            ],
        },
        {
            title: "Security",
            description: "Generate passwords, hashes and more.",
            icon: Lock,
            tools: [
                { name: "Password Generator", href: "/tools/password-generator", description: "Generate strong, secure passwords." },
            ],
        },
        {
            title: "Text & Data",
            description: "Word count, lorem ipsum, case converter.",
            icon: Type,
            tools: [
                { name: "Word Counter", href: "/tools/word-counter", description: "Count words, characters, and sentences." },
            ],
        },
    ]

    return (
        <ToolWrapper title="All Tools" description="Browse our complete collection of developer utilities." adSlot="tools-index">
            <div className="grid gap-6 sm:grid-cols-2">
                {categories.map((category) => (
                    <div key={category.title} className="space-y-4">
                        <div className="flex items-center gap-2">
                            <category.icon className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-semibold">{category.title}</h2>
                        </div>
                        <div className="grid gap-4">
                            {category.tools.map((tool) => (
                                <Link key={tool.name} href={tool.href}>
                                    <Card className="hover:bg-muted/50 transition-colors">
                                        <CardHeader>
                                            <CardTitle className="text-base flex items-center justify-between">
                                                {tool.name}
                                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                            </CardTitle>
                                            <CardDescription>{tool.description}</CardDescription>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </ToolWrapper>
    )
}
