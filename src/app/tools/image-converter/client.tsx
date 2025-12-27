"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, Download, Image as ImageIcon, RefreshCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

export default function ImageConverterClient() {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [format, setFormat] = useState("image/png")
    const [isConverting, setIsConverting] = useState(false)
    const [convertedUrl, setConvertedUrl] = useState<string | null>(null)

    const canvasRef = useRef<HTMLCanvasElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0]
            setFile(selectedFile)
            setConvertedUrl(null)

            const reader = new FileReader()
            reader.onload = (ev) => {
                setPreview(ev.target?.result as string)
            }
            reader.readAsDataURL(selectedFile)
        }
    }

    const handleConvert = () => {
        if (!file || !preview) return

        setIsConverting(true)
        const img = new Image()
        img.src = preview
        img.onload = () => {
            const canvas = canvasRef.current
            if (canvas) {
                canvas.width = img.width
                canvas.height = img.height
                const ctx = canvas.getContext("2d")
                if (ctx) {
                    ctx.drawImage(img, 0, 0)
                    const newUrl = canvas.toDataURL(format)
                    setConvertedUrl(newUrl)
                    setIsConverting(false)
                }
            }
        }
    }

    const handleDownload = () => {
        if (convertedUrl) {
            const link = document.createElement("a")
            link.download = `converted-image.${format.split("/")[1]}`
            link.href = convertedUrl
            link.click()
        }
    }

    return (
        <ToolWrapper
            title="Image Converter"
            description="Convert images between different formats securely."
            toolSlug="image-converter"
            adSlot="image-converter-slot"
        >
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <div className="rounded-lg border border-dashed p-8 text-center hover:bg-muted/50 transition-colors">
                        <Label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <span className="text-lg font-medium">Click to upload image</span>
                            <span className="text-sm text-muted-foreground">Supports JPG, PNG, WebP</span>
                        </Label>
                        <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    {preview && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
                            <img
                                src={preview}
                                alt="Preview"
                                className="h-full w-full object-contain"
                            />
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label>Target Format</Label>
                        <Select value={format} onValueChange={setFormat}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="image/png">PNG</SelectItem>
                                <SelectItem value="image/jpeg">JPEG</SelectItem>
                                <SelectItem value="image/webp">WebP</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button onClick={handleConvert} disabled={!file || isConverting} className="w-full">
                        {isConverting ? (
                            <>
                                <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                                Converting...
                            </>
                        ) : (
                            <>
                                <RefreshCcw className="mr-2 h-4 w-4" />
                                Convert Now
                            </>
                        )}
                    </Button>

                    {convertedUrl && (
                        <div className="rounded-md border p-4 bg-muted/50 text-center space-y-4">
                            <p className="text-sm font-medium text-green-600 dark:text-green-400">Conversion Successful!</p>
                            <Button onClick={handleDownload} variant="outline" className="w-full">
                                <Download className="mr-2 h-4 w-4" /> Download Image
                            </Button>
                        </div>
                    )}

                    <canvas ref={canvasRef} className="hidden" />
                </div>
            </div>

            <ContentSection
                title="Image Converter Guide"
                description={`Convert images instantly in your browser without uploading files to any server. \n\nOur tool uses advanced HTML5 Canvas technology to read, process, and convert your images locally. This ensures 100% privacy and lightning-fast speeds compared to traditional server-side converters.`}
                features={[
                    "Supports PNG, JPEG, and WebP",
                    "Zero Server Uploads (Privacy Focused)",
                    "No File Size Limits",
                    "Instant Browser-based Conversion"
                ]}
                faq={[
                    {
                        question: "Does this tool support transparent PNGs?",
                        answer: "Yes! If you convert to PNG or WebP, transparency is preserved. Converting to JPEG will replace transparent areas with a white background."
                    },
                    {
                        question: "Why convert to WebP?",
                        answer: "WebP images are typically 25-34% smaller than comparable JPEG and PNG images, making your website load faster."
                    },
                    {
                        question: "Is there a daily limit?",
                        answer: "No. Since the conversion happens on your own device, there are no artificial limits. Convert as many images as you need."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
