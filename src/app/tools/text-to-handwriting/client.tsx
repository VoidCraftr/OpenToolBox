"use client"

import { useState, useRef, useEffect } from "react"
import { Download, Type, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"

export default function TextToHandwritingClient() {
    const [text, setText] = useState("This is what your handwritten text will look like.")
    const [font, setFont] = useState("Dancing Script")
    const [size, setSize] = useState(24)
    const [color, setColor] = useState("#000000")
    // Simple paper lines effect
    const [paperType, setPaperType] = useState<"plain" | "lines">("lines")

    // We'll use a simple Google Fonts injection for the "handwriting" feel
    useEffect(() => {
        const link = document.createElement("link")
        link.href = "https://fonts.googleapis.com/css2?family=Caveat&family=Dancing+Script&family=Indie+Flower&family=Shadows+Into+Light&display=swap"
        link.rel = "stylesheet"
        document.head.appendChild(link)
        return () => { document.head.removeChild(link) }
    }, [])

    const downloadImage = () => {
        alert("To save, you can take a screenshot! Full image export coming soon.")
    }

    return (
        <ToolWrapper
            title="Text to Handwriting"
            description="Convert typed text into handwriting-style notes. Choose from multiple handwritten fonts."
            toolSlug="text-to-handwriting"
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="grid gap-8 md:grid-cols-[300px_1fr]">
                    {/* Controls */}
                    <div className="space-y-6">
                        <div className="space-y-4 p-4 border rounded-lg bg-card">
                            <div className="space-y-2">
                                <Label>Font Style</Label>
                                <Select value={font} onValueChange={setFont}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Dancing Script">Dancing Script</SelectItem>
                                        <SelectItem value="Caveat">Caveat</SelectItem>
                                        <SelectItem value="Indie Flower">Indie Flower</SelectItem>
                                        <SelectItem value="Shadows Into Light">Shadows Into Light</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Label>Font Size: {size}px</Label>
                                </div>
                                <Slider value={[size]} onValueChange={(v) => setSize(v[0])} min={12} max={48} step={1} />
                            </div>

                            <div className="space-y-2">
                                <Label>Ink Color</Label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="w-10 h-10 border rounded cursor-pointer"
                                    />
                                    <span className="text-sm font-mono">{color}</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Paper Type</Label>
                                <Select value={paperType} onValueChange={(v: any) => setPaperType(v)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="plain">Plain White</SelectItem>
                                        <SelectItem value="lines">Lined Paper</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="space-y-4">
                        <Label>Input Text (Changes appear below)</Label>
                        <Textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="h-24"
                            placeholder="Type here..."
                        />

                        <div
                            className="min-h-[500px] w-full border shadow-sm p-8 relative overflow-hidden transition-all"
                            style={{
                                backgroundColor: "white",
                                backgroundImage: paperType === "lines"
                                    ? "linear-gradient(transparent 95%, #e1e1e1 95%)"
                                    : "none",
                                backgroundSize: paperType === "lines" ? `100% ${size * 1.5}px` : "auto",
                                lineHeight: paperType === "lines" ? `${size * 1.5}px` : "1.5",
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: `"${font}", cursive`,
                                    fontSize: `${size}px`,
                                    color: color,
                                    whiteSpace: "pre-wrap",
                                    marginTop: paperType === "lines" ? "4px" : "0" // Small adjustment to align with lines
                                }}
                            >
                                {text}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button onClick={downloadImage} variant="outline" disabled>
                                <Download className="mr-2 h-4 w-4" />
                                Download Image (Coming Soon)
                            </Button>
                        </div>
                    </div>
                </div>

                <ContentSection
                    title="Digital Handwriting Generator"
                    description={`Convert your boring typed assignments or notes into what looks like genuine, hand-written text. Choose from a variety of cursive and print fonts to find a style that matches your needs.\n\nGreat for creating personalized-looking notes, cards, or design mockups without picking up a pen.`}
                    features={[
                        "🖋️ **Multiple Fonts:** Choose from elegant cursive to casual print styles.",
                        "🎨 **Custom Ink:** Change the color to match blue, black, or red pens.",
                        "📄 **Paper Styles:** Switch between plain white or lined notebook paper.",
                        "📏 **Adjustable Size:** Make your handwriting big and bold or small and neat."
                    ]}
                    howToUse={[
                        "Type your content in the input box.",
                        "Select a **Font Style** that you like.",
                        "Adjust the **Size** and **Color**.",
                        "Choose **Lined Paper** for a realistic notebook look.",
                        "Take a screenshot to save your creation!"
                    ]}
                    faq={[
                        {
                            question: "Can I use this for assignments?",
                            answer: "While it looks realistic, some teachers or professors might notice it's a computer font. Use with caution!"
                        },
                        {
                            question: "How do I save the image?",
                            answer: "Currently, the best way is to take a screenshot of the preview area. We are working on a direct download feature."
                        }
                    ]}
                />
            </div>
        </ToolWrapper>
    )
}
