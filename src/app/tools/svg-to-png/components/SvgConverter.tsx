"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Download, ArrowRight, Image as ImageIcon } from "lucide-react"

export function SvgConverter() {
    const [svgFile, setSvgFile] = useState<File | null>(null)
    const [svgContent, setSvgContent] = useState<string | null>(null)
    const [scale, setScale] = useState(1)
    const [format, setFormat] = useState<"png" | "jpeg">("png")
    const [originalSize, setOriginalSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 })

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            if (file.type !== "image/svg+xml") {
                alert("Please upload a valid SVG file.")
                return
            }
            setSvgFile(file)

            const reader = new FileReader()
            reader.onload = (ev) => {
                if (ev.target?.result) {
                    setSvgContent(ev.target.result as string)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    // Render SVG to Canvas when content or scale changes
    useEffect(() => {
        if (!svgContent || !canvasRef.current) return

        const img = new Image()
        img.onload = () => {
            imgRef.current = img
            setOriginalSize({ width: img.width, height: img.height })
            drawCanvas(img, scale)
        }
        img.src = svgContent
    }, [svgContent, scale])

    const drawCanvas = (img: HTMLImageElement, scaleFactor: number) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const width = img.width * scaleFactor
        const height = img.height * scaleFactor

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Clear and set background if JPEG (since it doesn't support transparency)
        ctx.clearRect(0, 0, width, height)
        if (format === "jpeg") {
            ctx.fillStyle = "#ffffff"
            ctx.fillRect(0, 0, width, height)
        }

        ctx.drawImage(img, 0, 0, width, height)
    }

    // Re-draw if format changes (to handle transparency background)
    useEffect(() => {
        if (imgRef.current) {
            drawCanvas(imgRef.current, scale)
        }
    }, [format])


    const handleDownload = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const dataUrl = canvas.toDataURL(`image/${format}`, 1.0)
        const link = document.createElement("a")
        link.download = `converted-image.${format}`
        link.href = dataUrl
        link.click()
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Upload SVG</CardTitle>
                    <CardDescription>Select an SVG file to convert to PNG or JPG.</CardDescription>
                </CardHeader>
                <CardContent>
                    {!svgFile ? (
                        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg bg-muted/20">
                            <ImageIcon className="w-16 h-16 text-muted-foreground mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Upload SVG</h3>
                            <Input
                                type="file"
                                accept=".svg"
                                className="hidden"
                                id="svg-upload"
                                onChange={handleFileUpload}
                            />
                            <Button asChild>
                                <label htmlFor="svg-upload" className="cursor-pointer">
                                    <Upload className="w-4 h-4 mr-2" /> Select File
                                </label>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="flex flex-col items-center justify-center p-4 border rounded bg-[url('/grid-pattern.png')] bg-white dark:bg-black/20">
                                <h3 className="mb-2 text-sm font-medium text-muted-foreground">Original SVG Preview</h3>
                                <img src={svgContent || ""} alt="Preview" className="max-w-full max-h-[300px] object-contain" />
                                <Button variant="ghost" size="sm" onClick={() => { setSvgFile(null); setSvgContent(null); }} className="mt-4 text-red-500">
                                    Remove File
                                </Button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4 p-4 border rounded bg-card">
                                    <h3 className="font-semibold">Conversion Settings</h3>

                                    <div className="space-y-2">
                                        <Label>Format</Label>
                                        <div className="flex gap-2">
                                            <Button
                                                variant={format === 'png' ? 'default' : 'outline'}
                                                onClick={() => setFormat('png')}
                                                size="sm"
                                            >
                                                PNG (Transparent)
                                            </Button>
                                            <Button
                                                variant={format === 'jpeg' ? 'default' : 'outline'}
                                                onClick={() => setFormat('jpeg')}
                                                size="sm"
                                            >
                                                JPG (White bg)
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <Label>Scale Factor ({scale}x)</Label>
                                            <span className="text-xs text-muted-foreground">
                                                {Math.round(originalSize.width * scale)} x {Math.round(originalSize.height * scale)} px
                                            </span>
                                        </div>
                                        <Slider
                                            value={[scale]}
                                            onValueChange={(val) => setScale(val[0])}
                                            min={0.5}
                                            max={4}
                                            step={0.5}
                                        />
                                    </div>

                                    <Button onClick={handleDownload} className="w-full">
                                        <Download className="w-4 h-4 mr-2" /> Download Image
                                    </Button>
                                </div>

                                {/* Hidden canvas for processing */}
                                <div className="hidden">
                                    <canvas ref={canvasRef} />
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
