"use client"

import { useState } from "react"
import { Copy, Trash2, ShieldCheck, Minimize, Maximize } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function JsonFormatterPage() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [error, setError] = useState<string | null>(null)

    const handleFormat = () => {
        try {
            if (!input.trim()) return
            const parsed = JSON.parse(input)
            setOutput(JSON.stringify(parsed, null, 2))
            setError(null)
        } catch (err) {
            setError("Invalid JSON: " + (err as Error).message)
            setOutput("")
        }
    }

    const handleMinify = () => {
        try {
            if (!input.trim()) return
            const parsed = JSON.parse(input)
            setOutput(JSON.stringify(parsed))
            setError(null)
        } catch (err) {
            setError("Invalid JSON: " + (err as Error).message)
            setOutput("")
        }
    }

    const handleClear = () => {
        setInput("")
        setOutput("")
        setError(null)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(output)
    }

    return (
        <ToolWrapper
            title="JSON Formatter & Validator"
            description="Format, prettify, and validate your JSON data. Secure, client-side processing."
            adSlot="json-tool-slot"
        >
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Input JSON</h3>
                        <Button variant="ghost" size="sm" onClick={handleClear} className="h-8 px-2 text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Clear
                        </Button>
                    </div>
                    <Textarea
                        placeholder="Paste your JSON here..."
                        className="h-[400px] font-mono text-sm"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Output</h3>
                        <Button variant="outline" size="sm" onClick={handleCopy} disabled={!output} className="h-8 px-2">
                            <Copy className="mr-2 h-4 w-4" /> Copy
                        </Button>
                    </div>
                    <Textarea
                        readOnly
                        className="h-[400px] font-mono text-sm bg-muted"
                        value={output}
                        placeholder="Formatted JSON will appear here..."
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-4 py-4">
                <Button onClick={handleFormat}>
                    <Maximize className="mr-2 h-4 w-4" /> Format / Prettify
                </Button>
                <Button onClick={handleMinify} variant="secondary">
                    <Minimize className="mr-2 h-4 w-4" /> Minify
                </Button>
                <Button onClick={handleFormat} variant="outline" className="hidden">
                    <ShieldCheck className="mr-2 h-4 w-4" /> Validate
                </Button>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="prose dark:prose-invert max-w-none mt-10">
                <h2>How to use this JSON Formatter?</h2>
                <p>
                    Paste your JSON code into the input field on the left. Click "Format" to beautify the JSON with proper indentation, or "Minify" to remove all whitespace for a compact result.
                </p>
                <h3>Why use a JSON Formatter?</h3>
                <ul>
                    <li><strong>Readability:</strong> Makes complex JSON structures easy to read and understand.</li>
                    <li><strong>Debugging:</strong> Helps identify syntax errors in your JSON data.</li>
                    <li><strong>Validation:</strong> Ensures your JSON is RFC 8259 compliant.</li>
                </ul>
                <p>
                    This tool processes your data entirely in your browser. No data is sent to any server, ensuring your privacy and security.
                </p>
            </div>
        </ToolWrapper>
    )
}
