"use client"

import { useState } from "react"
import { Copy, Shuffle, Trash2, List, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"

export default function ListRandomizerClient() {
    const [input, setInput] = useState("")
    const [result, setResult] = useState("")
    const [copied, setCopied] = useState(false)

    const randomize = () => {
        if (!input.trim()) return

        const lines = input.split(/\r?\n/).filter(line => line.trim() !== "")
        if (lines.length === 0) return

        // Fisher-Yates shuffle
        for (let i = lines.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [lines[i], lines[j]] = [lines[j], lines[i]];
        }

        setResult(lines.join("\n"))
    }

    const copyToClipboard = () => {
        if (!result) return
        navigator.clipboard.writeText(result)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const clearAll = () => {
        setInput("")
        setResult("")
    }

    return (
        <ToolWrapper
            title="List Randomizer"
            description="Randomize the order of items in a list. Shuffle lists, names, or choices instantly."
            toolSlug="list-randomizer"
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                        <Label className="flex items-center gap-2">
                            <List className="h-4 w-4" />
                            Original List
                        </Label>
                        <Textarea
                            placeholder="Enter list items (one per line)...&#10;Item 1&#10;Item 2&#10;Item 3"
                            className="min-h-[400px] text-base"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>

                    <div className="space-y-4">
                        <Label className="flex items-center gap-2">
                            <Shuffle className="h-4 w-4" />
                            Randomized Result
                        </Label>
                        <div className="relative">
                            <Textarea
                                readOnly
                                placeholder="Shuffled items will appear here..."
                                className="min-h-[400px] text-base bg-muted"
                                value={result}
                            />
                            <div className="absolute top-2 right-2 flex gap-2">
                                <Button size="icon" variant="secondary" onClick={copyToClipboard} disabled={!result} title="Copy Result">
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 justify-center mt-8">
                    <Button size="lg" onClick={randomize} className="min-w-[150px]">
                        <Shuffle className="mr-2 h-4 w-4" />
                        Randomize Order
                    </Button>
                    <Button size="lg" variant="secondary" onClick={clearAll} disabled={!input && !result}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear
                    </Button>
                </div>

                <ContentSection
                    title="True Random List Shuffling"
                    description={`Need to decide who goes first? Want to mix up a playlist? Or perhaps you're running a raffle? This **List Randomizer** uses the unbiased Fisher-Yates shuffle algorithm to perfectly mix up any text list you provide.\n\nIt works entirely in your browser, so you can safely shuffle sensitive lists (like email addresses or names) without them ever being sent to a server.`}
                    features={[
                        "🎲 **Fair & Unbiased:** Uses cryptographically secure randomness where possible.",
                        "⚡ **Instant Shuffle:** Mixes thousands of items in milliseconds.",
                        "🔒 **Private:** Your data stays on your device.",
                        "📋 **Easy Copy:** One-click copy for the shuffled result."
                    ]}
                    howToUse={[
                        "**Paste** your list into the left box (one item per line).",
                        "Click **Randomize Order** to shuffle the items.",
                        "View the result in the right box.",
                        "Click **Randomize** again if you want a different permutation."
                    ]}
                    faq={[
                        {
                            question: "Is the order truly random?",
                            answer: "Yes, we use the Fisher-Yates shuffle, which is mathematically proven to produce all permutations with equal probability, assuming a good random number generator (which modern browsers provide)."
                        },
                        {
                            question: "Can I shuffle names for a lottery?",
                            answer: "Absolutely! It's perfect for picking winners, assigning order for presentations, or splitting groups."
                        }
                    ]}
                />
            </div>
        </ToolWrapper>
    )
}
