"use client"

import { useState } from "react"
import { Copy, Trash2, ArrowRightLeft, Link as LinkIcon, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"

export default function UrlEncoderClient() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [mode, setMode] = useState<"encode" | "decode">("encode")
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState(false)

    const handleProcess = () => {
        if (!input.trim()) return

        try {
            setError(false)
            if (mode === "encode") {
                // Use encodeURIComponent for full encoding
                setOutput(encodeURIComponent(input))
            } else {
                setOutput(decodeURIComponent(input))
            }
        } catch (error) {
            setError(true)
            setOutput("Error: Invalid URL string for decoding.")
        }
    }

    const copyToClipboard = () => {
        if (!output || error) return
        navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const clearAll = () => {
        setInput("")
        setOutput("")
        setError(false)
    }

    return (
        <ToolWrapper
            title="URL Encoder/Decoder"
            description="Encode special characters in URLs or decode encoded URLs. Handy for debugging web requests."
            toolSlug="url-encoder"
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <Tabs defaultValue="encode" onValueChange={(v) => { setMode(v as any); setInput(""); setOutput(""); setError(false); }} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="encode">Encoder (Decode &rarr; Encode)</TabsTrigger>
                        <TabsTrigger value="decode">Decoder (Encode &rarr; Decode)</TabsTrigger>
                    </TabsList>

                    <div className="grid gap-6">
                        <div className="space-y-4">
                            <Label>Input Text</Label>
                            <Textarea
                                placeholder={mode === "encode" ? "Enter text to encode (e.g. hello world)" : "Enter URL encoded text (e.g. hello%20world)"}
                                className="min-h-[150px] font-mono text-sm"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-4 justify-center">
                            <Button size="lg" onClick={handleProcess} className="min-w-[150px]">
                                <ArrowRightLeft className="mr-2 h-4 w-4" />
                                {mode === "encode" ? "Encode URL" : "Decode URL"}
                            </Button>
                            <Button size="lg" variant="secondary" onClick={clearAll} disabled={!input && !output}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Clear
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <Label>Result</Label>
                            <div className="relative">
                                <Textarea
                                    readOnly
                                    placeholder="Result will appear here..."
                                    className={`min-h-[150px] font-mono text-sm ${error ? "text-destructive" : "bg-muted"}`}
                                    value={output}
                                />
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <Button size="icon" variant="secondary" onClick={copyToClipboard} disabled={!output || error} title="Copy Result">
                                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Tabs>

                <ContentSection
                    title="URL and URI Encoding Explained"
                    description={`URL encoding (or Percent-encoding) is a mechanism for encoding information in a Uniform Resource Identifier (URI). Characters that are not allowed in a URL must be encoded. \n\nFor example, a space cannot be part of a URL, so it is encoded as \`%20\`. This tool allows you to easily encode a standard string into a valid URL format, or decode a messy URL back into readable text.`}
                    features={[
                        "🔗 **Standard Compliance:** Uses standard \`encodeURIComponent\` for maximum compatibility.",
                        "🛠️ **Two-Way Conversion:** Instantly switch between encoding and decoding.",
                        "🐞 **Debug Friendly:** Perfect for cleaning up query parameters or API calls."
                    ]}
                    howToUse={[
                        "Select **Encoder** to convert text into a URL-safe format.",
                        "Select **Decoder** to convert URL symbols (like %20) back to text.",
                        "Paste your string into the **Input** box.",
                        "Click the action button to process.",
                        "Copy the cleaned result."
                    ]}
                    faq={[
                        {
                            question: "What characters get encoded?",
                            answer: "Characters that have special meaning in URLs (like `/`, `?`, `&`, `#`) and characters that are not ASCII (like emojis or foreign letters) are replaced with a `%` followed by two hexadecimal digits."
                        },
                        {
                            question: "Why do I see %20 everywhere?",
                            answer: "`%20` is the URL-encoded value for a space character. Since URLs cannot contain actual spaces, browsers and servers use this code instead."
                        }
                    ]}
                />
            </div>
        </ToolWrapper>
    )
}
