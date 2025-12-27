"use client"

import { useState } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { Download, RefreshCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { ToolWrapper } from "@/components/tools/ToolWrapper"

export default function QrCodeGeneratorPage() {
    const [url, setUrl] = useState("https://voidcraftr.com")
    const [size, setSize] = useState([256])
    const [bgColor, setBgColor] = useState("#ffffff")
    const [fgColor, setFgColor] = useState("#000000")

    const handleDownload = () => {
        const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement
        if (canvas) {
            const pngUrl = canvas.toDataURL("image/png")
            const link = document.createElement("a")
            link.href = pngUrl
            link.download = "qrcode.png"
            link.click()
        }
    }

    return (
        <ToolWrapper
            title="QR Code Generator"
            description="Create customizable QR codes for links, text, and more. Download in high resolution."
            adSlot="qr-code-slot"
        >
            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label>Content (URL or Text)</Label>
                        <Input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Size (px)</Label>
                                <span className="font-mono text-sm">{size[0]}px</span>
                            </div>
                            <Slider value={size} onValueChange={setSize} min={128} max={1024} step={32} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Background Color</Label>
                                <div className="flex gap-2">
                                    <Input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-12 p-1" />
                                    <Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="uppercase" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Foreground Color</Label>
                                <div className="flex gap-2">
                                    <Input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-12 p-1" />
                                    <Input value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="uppercase" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-6 rounded-lg border bg-muted/20 p-8">
                    <Card className="p-4 bg-white inline-block">
                        <QRCodeCanvas
                            id="qr-canvas"
                            value={url}
                            size={size[0]}
                            bgColor={bgColor}
                            fgColor={fgColor}
                            level={"H"}
                            includeMargin={true}
                        />
                    </Card>

                    <Button onClick={handleDownload} size="lg" className="w-full max-w-xs">
                        <Download className="mr-2 h-4 w-4" /> Download PNG
                    </Button>
                </div>
            </div>

            <div className="prose dark:prose-invert max-w-none mt-10">
                <h2>About QR Code Generator</h2>
                <p>
                    Quick Response (QR) codes are two-dimensional barcodes that can store URLS, text, and other data.
                    They are widely used for sharing links, Wi-Fi passwords, and contact information.
                </p>
                <h3>Features</h3>
                <ul>
                    <li><strong>High Quality:</strong> Generate codes up to 1024px for print.</li>
                    <li><strong>Custom Colors:</strong> Match your brand identity.</li>
                    <li><strong>Privacy:</strong> Generation happens entirely in your browser.</li>
                </ul>
            </div>
        </ToolWrapper>
    )
}
