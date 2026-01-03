"use client"

import { useState } from "react"
import { Copy, RefreshCw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"

const LOREM_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export default function LoremIpsumGeneratorClient() {
    const [count, setCount] = useState(3)
    const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs")
    const [startWithLorem, setStartWithLorem] = useState(true)
    const [output, setOutput] = useState("")
    const [copied, setCopied] = useState(false)

    const generate = () => {
        let result: string[] = []
        const words = LOREM_TEXT.replace(/[.,]/g, "").toLowerCase().split(" ")
        const sentences = LOREM_TEXT.match(/[^.!?]+[.!?]+/g) || []

        if (type === "words") {
            for (let i = 0; i < count; i++) {
                result.push(words[i % words.length])
            }
            let text = result.join(" ")
            if (startWithLorem && !text.toLowerCase().startsWith("lorem")) {
                text = "Lorem ipsum " + text
            }
            setOutput(text)
        } else if (type === "sentences") {
            for (let i = 0; i < count; i++) {
                result.push(sentences[i % sentences.length].trim())
            }
            setOutput(result.join(" "))
        } else {
            // Paragraphs
            for (let i = 0; i < count; i++) {
                result.push(LOREM_TEXT)
            }
            setOutput(result.join("\n\n"))
        }
    }

    // Initial generation
    useState(() => {
        generate()
    })

    const copyToClipboard = () => {
        if (!output) return
        navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolWrapper
            title="Lorem Ipsum Generator"
            description="Generate placeholder text for your designs. Paragraphs, sentences, or words."
            toolSlug="lorem-ipsum-generator"
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="grid gap-8 md:grid-cols-[300px_1fr]">
                    {/* Controls */}
                    <div className="space-y-6">
                        <div className="space-y-4 p-4 border rounded-lg bg-card">
                            <div className="space-y-2">
                                <Label>Generate</Label>
                                <RadioGroup defaultValue="paragraphs" onValueChange={(v) => setType(v as any)} className="flex flex-col gap-2">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="paragraphs" id="paragraphs" />
                                        <Label htmlFor="paragraphs">Paragraphs</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="sentences" id="sentences" />
                                        <Label htmlFor="sentences">Sentences</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="words" id="words" />
                                        <Label htmlFor="words">Words</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Label>Count: {count}</Label>
                                </div>
                                <Slider
                                    value={[count]}
                                    onValueChange={(v) => setCount(v[0])}
                                    min={1}
                                    max={type === "words" ? 100 : 20}
                                    step={1}
                                />
                            </div>

                            <div className="flex items-center space-x-2 py-2">
                                <Switch checked={startWithLorem} onCheckedChange={setStartWithLorem} id="start-lorem" />
                                <Label htmlFor="start-lorem">Start with "Lorem ipsum"</Label>
                            </div>

                            <Button onClick={generate} className="w-full">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Generate
                            </Button>
                        </div>
                    </div>

                    {/* Output */}
                    <div className="space-y-4">
                        <div className="relative">
                            <Textarea
                                readOnly
                                value={output}
                                className="min-h-[400px] text-lg leading-relaxed p-6"
                            />
                            <Button
                                size="icon"
                                variant="secondary"
                                className="absolute top-4 right-4"
                                onClick={copyToClipboard}
                            >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                </div>

                <ContentSection
                    title="Professional Placeholder Text"
                    description={`Lorem Ipsum is the standard placeholder text used in the printing and typesetting industry. It has been the industry's standard dummy text ever since the 1500s.\n\nDesigners use it to demonstrate the visual form of a document or a typeface without relying on meaningful content. `}
                    features={[
                        "📝 **Flexible Generation:** Create paragraphs, sentences, or individual words.",
                        "🔢 **Custom Count:** Adjust the amount of text to fit your layout perfectly.",
                        "🚀 **One-Click Copy:** Quickly grab the code for your project.",
                        "⚡ **Start with Lorem:** Optionally include the classic opening phrase."
                    ]}
                    howToUse={[
                        "Choose what to generate: **Paragraphs**, **Sentences**, or **Words**.",
                        "Use the **Slider** to select how many items you need.",
                        "Toggle **Start with Lorem ipsum** if you want the classic beginning.",
                        "Click **Generate** to create new text.",
                        "Click the **Copy** icon to use it in your design."
                    ]}
                    faq={[
                        {
                            question: "What does Lorem Ipsum mean?",
                            answer: "It is a scrambled version of a passage from Cicero's 'De Finibus Bonorum et Malorum', written in 45 BC. It roughly translates to 'There is no one who loves pain itself...'."
                        },
                        {
                            question: "Why do we use it?",
                            answer: "It has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
                        }
                    ]}
                />
            </div>
        </ToolWrapper>
    )
}
