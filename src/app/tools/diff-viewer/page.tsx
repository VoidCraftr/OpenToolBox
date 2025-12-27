"use client"

import { useState } from "react"
import { diffChars, diffWords, diffLines, Change } from "diff"
import { RefreshCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"

export default function DiffViewerPage() {
    const [oldText, setOldText] = useState("")
    const [newText, setNewText] = useState("")
    const [mode, setMode] = useState("chars")
    const [diffs, setDiffs] = useState<Change[]>([])

    const compare = () => {
        let result: Change[] = []
        if (mode === "chars") result = diffChars(oldText, newText)
        if (mode === "words") result = diffWords(oldText, newText)
        if (mode === "lines") result = diffLines(oldText, newText)
        setDiffs(result)
    }

    return (
        <ToolWrapper
            title="Diff Viewer"
            description="Compare two blocks of text and highlight the differences."
            adSlot="diff-viewer-slot"
        >
            <div className="space-y-6">
                <div className="flex justify-end gap-4">
                    <Select value={mode} onValueChange={setMode}>
                        <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="chars">Characters</SelectItem>
                            <SelectItem value="words">Words</SelectItem>
                            <SelectItem value="lines">Lines</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={compare}>
                        <RefreshCcw className="mr-2 h-4 w-4" /> Compare
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Original Text</Label>
                        <Textarea
                            value={oldText}
                            onChange={(e) => setOldText(e.target.value)}
                            placeholder="Paste original text..."
                            className="font-mono h-[300px]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>New Text</Label>
                        <Textarea
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            placeholder="Paste new text..."
                            className="font-mono h-[300px]"
                        />
                    </div>
                </div>

                {diffs.length > 0 && (
                    <div className="rounded-lg border bg-muted/30 p-4 font-mono text-sm whitespace-pre-wrap">
                        {diffs.map((part, i) => {
                            const color = part.added ? "bg-green-200 dark:bg-green-900/40 text-green-900 dark:text-green-100" :
                                part.removed ? "bg-red-200 dark:bg-red-900/40 text-red-900 dark:text-red-100 decoration-line-through" :
                                    "text-foreground"
                            return (
                                <span key={i} className={color}>
                                    {part.value}
                                </span>
                            )
                        })}
                    </div>
                )}
            </div>

            <ContentSection
                title="Text Diff Viewer Guide"
                description={`Compare two text files or code snippets to find differences. \n\nOur Diff Viewer highlights additions, deletions, and changes in real-time. It supports character-level, word-level, and line-level comparison modes.`}
                features={[
                    "Three Comparison Modes (Char, Word, Line)",
                    "Color-Coded Highlights",
                    "Side-by-Side Logic",
                    "Works with Code and Plain Text"
                ]}
                faq={[
                    {
                        question: "Which mode should I use?",
                        answer: "Use 'Lines' for code comparison, 'Words' for articles/essays, and 'Characters' for fixing typos or small strings."
                    },
                    {
                        question: "Is my code safe?",
                        answer: "Yes. The diff calculation happens entirely in your browser using JavaScript. No code is sent to our servers."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
