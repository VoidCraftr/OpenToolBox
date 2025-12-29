"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, RefreshCw, Trash2, Check } from "lucide-react"

export default function CaseConverter() {
    const [text, setText] = useState("")
    const [copied, setCopied] = useState(false)

    const updateText = (newText: string) => {
        setText(newText)
    }

    const toUpperCase = () => updateText(text.toUpperCase())
    const toLowerCase = () => updateText(text.toLowerCase())

    const toTitleCase = () => {
        updateText(
            text.toLowerCase().split(' ').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')
        )
    }

    const toSentenceCase = () => {
        const result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase())
        updateText(result)
    }

    const toAlternatingCase = () => {
        let result = ""
        for (let i = 0; i < text.length; i++) {
            result += i % 2 === 0 ? text[i].toLowerCase() : text[i].toUpperCase()
        }
        updateText(result)
    }

    const toInverseCase = () => {
        let result = ""
        for (let i = 0; i < text.length; i++) {
            const char = text[i]
            result += char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        }
        updateText(result)
    }

    const copyToClipboard = () => {
        if (!text) return
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const clearText = () => {
        setText("")
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Case Converter</h1>
                <p className="text-muted-foreground">
                    Easily convert text between different letter cases: uppercase, lowercase, title case, and more.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Input Text</CardTitle>
                    <CardDescription>
                        Type or paste your text below to convert it.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                        placeholder="Type something here..."
                        className="min-h-[200px] text-lg"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <Button variant="outline" onClick={toUpperCase}>UPPER CASE</Button>
                        <Button variant="outline" onClick={toLowerCase}>lower case</Button>
                        <Button variant="outline" onClick={toTitleCase}>Title Case</Button>
                        <Button variant="outline" onClick={toSentenceCase}>Sentence case</Button>
                        <Button variant="outline" onClick={toAlternatingCase}>aLtErNaTiNg cAsE</Button>
                        <Button variant="outline" onClick={toInverseCase}>iNVERSE cASE</Button>
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                        <Button onClick={copyToClipboard} className="flex-1" disabled={!text}>
                            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                            {copied ? "Copied!" : "Copy Result"}
                        </Button>
                        <Button variant="secondary" onClick={clearText} disabled={!text}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Clear
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
