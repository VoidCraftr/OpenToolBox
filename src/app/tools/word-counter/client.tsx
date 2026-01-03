"use client"

import { useState, useEffect } from "react"
import { Copy, Trash2, Type } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"

export default function WordCounterPage() {
    const [text, setText] = useState("")
    const [stats, setStats] = useState({
        words: 0,
        characters: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0,
        topKeywords: [] as { word: string, count: number }[]
    })

    useEffect(() => {
        const wordsArr = text.trim() === "" ? [] : text.trim().split(/\s+/)
        const words = wordsArr.length
        const characters = text.length
        const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).length - 1
        const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).length
        const readingTime = Math.ceil(words / 200)
        const speakingTime = Math.ceil(words / 130)

        // Keyword Density
        const frequency: Record<string, number> = {}
        const stopWords = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me'])

        wordsArr.forEach(w => {
            const clean = w.toLowerCase().replace(/[.,!?;:()]/g, "")
            if (clean.length > 2 && !stopWords.has(clean)) {
                frequency[clean] = (frequency[clean] || 0) + 1
            }
        })

        const topKeywords = Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([word, count]) => ({ word, count }))

        setStats({ words, characters, sentences, paragraphs, readingTime, speakingTime, topKeywords })
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
                <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
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
                    <Card>
                        <CardHeader className="p-4 pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Speaking Time</CardTitle></CardHeader>
                        <CardContent className="p-4 pt-0 text-2xl font-bold">~{stats.speakingTime} min</CardContent>
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

                    {stats.topKeywords.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Keyword Density</h3>
                            <div className="flex flex-wrap gap-2">
                                {stats.topKeywords.map((k) => (
                                    <div key={k.word} className="flex items-center bg-muted/50 rounded-full px-3 py-1 text-sm border">
                                        <span className="font-bold mr-2">{k.word}</span>
                                        <span className="text-muted-foreground text-xs">{k.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ContentSection
                title="Word & Character Counter Guide"
                description={`A real-time text analysis tool for writers, students, and SEO professionals. \n\nInstantly calculate word count, character count, sentence count, and estimated reading time. Perfect for checking essay lengths, social media post limits (Twitter/X, LinkedIn), or blog post optimization.`}
                features={[
                    "Real-time Counting",
                    "Reading Time Estimation",
                    "Paragraph & Sentence Analysis",
                    "Case Conversion (Upper/Lower/Title)"
                ]}
                faq={[
                    {
                        question: "How is reading time calculated?",
                        answer: "We assume an average reading speed of 200 words per minute (WPM), which is standard for most adults reading English text."
                    },
                    {
                        question: "Does it count spaces?",
                        answer: "The 'Characters' count includes spaces. If you need a count without spaces, you can use our advanced text analysis tools."
                    },
                    {
                        question: "Is my text saved?",
                        answer: "No. All analysis happens instantly in your browser's memory. Your text is cleared when you refresh the page."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
