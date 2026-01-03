"use client"

import { useState, useRef, ChangeEvent } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Download, Upload, Image as ImageIcon, RefreshCcw } from "lucide-react"

export default function ImageResizer() {
    const [image, setImage] = useState<string | null>(null)
    const [originalDimensions, setOriginalDimensions] = useState<{ width: number, height: number } | null>(null)
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const [lockAspectRatio, setLockAspectRatio] = useState(true)
    const [percentage, setPercentage] = useState(100)
    const [fileType, setFileType] = useState("image/jpeg")

    const fileInputRef = useRef<HTMLInputElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                const img = new Image()
                img.onload = () => {
                    setOriginalDimensions({ width: img.width, height: img.height })
                    setWidth(img.width)
                    setHeight(img.height)
                    setImage(event.target?.result as string)
                    setFileType(file.type)
                }
                img.src = event.target?.result as string
            }
            reader.readAsDataURL(file)
        }
    }

    const handleWidthChange = (val: number) => {
        setWidth(val)
        if (lockAspectRatio && originalDimensions) {
            const ratio = originalDimensions.height / originalDimensions.width
            setHeight(Math.round(val * ratio))
        }
    }

    const handleHeightChange = (val: number) => {
        setHeight(val)
        if (lockAspectRatio && originalDimensions) {
            const ratio = originalDimensions.width / originalDimensions.height
            setWidth(Math.round(val * ratio))
        }
    }

    const handlePercentageChange = (val: number[]) => {
        const p = val[0]
        setPercentage(p)
        if (originalDimensions) {
            setWidth(Math.round(originalDimensions.width * (p / 100)))
            setHeight(Math.round(originalDimensions.height * (p / 100)))
        }
    }

    const downloadResized = () => {
        if (!image || !canvasRef.current) return

        const canvas = canvasRef.current
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")

        const img = new Image()
        img.onload = () => {
            if (ctx) {
                // Better quality resizing
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";
                ctx.drawImage(img, 0, 0, width, height)

                const link = document.createElement("a")
                link.download = `resized-image.${fileType.split('/')[1]}`
                link.href = canvas.toDataURL(fileType, 0.9)
                link.click()
            }
        }
        img.src = image
    }

    const reset = () => {
        setImage(null)
        setOriginalDimensions(null)
        setWidth(0)
        setHeight(0)
        setPercentage(100)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Image Resizer</h1>
                <p className="text-muted-foreground">
                    Resize your images online by pixel dimensions or percentage.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-[1fr_300px]">
                {/* Main Preview Area */}
                <Card className="min-h-[400px] flex flex-col">
                    <CardHeader>
                        <CardTitle>Image Preview</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex items-center justify-center p-6 bg-muted/20 border-t">
                        {!image ? (
                            <div className="text-center space-y-4">
                                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">Upload an image to start</h3>
                                    <p className="text-sm text-muted-foreground">Supports JPG, PNG, WEBP</p>
                                </div>
                                <Button onClick={() => fileInputRef.current?.click()}>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Select Image
                                </Button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </div>
                        ) : (
                            <div className="relative max-w-full max-h-[500px] overflow-hidden rounded-md shadow-sm border bg-[url('/transparent-bg.png')]">
                                {/* We keep the original image in view, but the download logic uses canvas */}
                                <img src={image} alt="Preview" className="max-w-full max-h-full object-contain mx-auto" style={{ width: `${width}px`, maxWidth: '100%' }} />
                                <canvas ref={canvasRef} className="hidden" />
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Sidebar Controls */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Resize Options</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label>Dimensions</Label>
                                    <div className="flex items-center gap-2">
                                        <Switch
                                            id="aspect-ratio"
                                            checked={lockAspectRatio}
                                            onCheckedChange={setLockAspectRatio}
                                        />
                                        <Label htmlFor="aspect-ratio" className="text-xs font-normal text-muted-foreground">Lock Ratio</Label>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <Label className="text-xs text-muted-foreground">Width (px)</Label>
                                        <Input
                                            type="number"
                                            value={width}
                                            onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                                            disabled={!image}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs text-muted-foreground">Height (px)</Label>
                                        <Input
                                            type="number"
                                            value={height}
                                            onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                                            disabled={!image}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Label>Scale Percentage</Label>
                                    <span className="text-sm text-muted-foreground">{percentage}%</span>
                                </div>
                                <Slider
                                    value={[percentage]}
                                    onValueChange={handlePercentageChange}
                                    min={1}
                                    max={200}
                                    step={1}
                                    disabled={!image}
                                />
                            </div>

                            {image && originalDimensions && (
                                <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
                                    <div className="flex justify-between">
                                        <span>Original:</span>
                                        <span>{originalDimensions.width} x {originalDimensions.height}</span>
                                    </div>
                                    <div className="flex justify-between font-medium text-foreground">
                                        <span>New:</span>
                                        <span>{width} x {height}</span>
                                    </div>
                                </div>
                            )}

                            <Button className="w-full" onClick={downloadResized} disabled={!image}>
                                <Download className="w-4 h-4 mr-2" />
                                Download Resized
                            </Button>

                            {image && (
                                <Button variant="ghost" className="w-full" onClick={reset}>
                                    <RefreshCcw className="w-4 h-4 mr-2" />
                                    Start Over
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
