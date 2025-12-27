"use client"

import { useState, useEffect } from "react"
import { Copy, Trash2, Type } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToolWrapper } from "@/components/tools/ToolWrapper"

export default function WordCounterPage() {
    const [text, setText] = useState("")
    const [stats, setStats] = useState({
        words: 0,
        characters: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
    })

    useEffect(() => {
        const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length
        const characters = text.length
        const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).length - 1
        const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).length
        const readingTime = Math.ceil(words / 200)

        setStats({ words, characters, sentences, paragraphs, readingTime })
    }, [text])

    const handleCase = (type: "upper" | "lower" | "title") => {
        switch (type) {
            case "upper": setText(text.toUpperCase()); break;
            case "lower": setText(text.toLowerCase()); break;
            case "title":
                setText(text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
                break;
        }
    }

    return (
        <ToolWrapper
            title="Word & Character Counter"
            description="Calculate words, characters, sentences, and reading time in real-time."
            adSlot="word-counter-slot"
        >
            <div className="grid gap-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="p-4 pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Words</CardTitle></CardHeader>
                        <CardContent className="p-4 pt-0 text-2xl font-bold">{stats.words}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="p-4 pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Characters</CardTitle></CardHeader>
                        <CardContent className="p-4 pt-0 text-2xl font-bold">{stats.characters}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="p-4 pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Sentences</CardTitle></CardHeader>
                        <CardContent className="p-4 pt-0 text-2xl font-bold">{stats.sentences}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="p-4 pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Reading Time</CardTitle></CardHeader>
                        <CardContent className="p-4 pt-0 text-2xl font-bold">~{stats.readingTime} min</CardContent>
                    </Card>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleCase("upper")}>
                            <Type className="mr-2 h-4 w-4" /> UPPERCASE
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleCase("lower")}>
                            <Type className="mr-2 h-4 w-4" /> lowercase
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleCase("title")}>
                            <Type className="mr-2 h-4 w-4" /> Title Case
                        </Button>
                        <div className="flex-1" />
                        <Button variant="ghost" size="sm" onClick={() => setText("")} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Clear
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(text)}>
                            <Copy className="mr-2 h-4 w-4" /> Copy
                        </Button>
                    </div>

                    <Textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type or paste your text here..."
                        className="min-h-[400px] text-lg leading-relaxed p-6"
                    />
                </div>
            </div>

            <div className="prose dark:prose-invert max-w-none mt-10">
                <h2>About this Word Counter</h2>
                <p>
                    An essential tool for writers, students, and SEO professionals. Get instant statistics about your text structure.
                </p>
                <h3>How is reading time calculated?</h3>
                <p>
                    We estimate reading time based on an average reading speed of 200 words per minute.
                </p>
            </div>
        </ToolWrapper>
    )
}
