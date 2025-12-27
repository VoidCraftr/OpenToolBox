"use client"

import { useState } from "react"
import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { ToolWrapper } from "@/components/tools/ToolWrapper"

export default function BoxShadowGeneratorPage() {
    const [hOffset, setHOffset] = useState([10])
    const [vOffset, setVOffset] = useState([10])
    const [blur, setBlur] = useState([20])
    const [spread, setSpread] = useState([5])
    const [color, setColor] = useState("#000000")
    const [opacity, setOpacity] = useState([0.3])
    const [inset, setInset] = useState(false)

    const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    const shadowValue = `${inset ? "inset " : ""}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${hexToRgba(color, opacity[0])}`
    const cssCode = `box-shadow: ${shadowValue};`

    return (
        <ToolWrapper
            title="Box Shadow Generator"
            description="Create beautiful CSS box shadows visually. Customize offset, blur, spread, `and color."
            adSlot="box-shadow-slot"
        >
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Controls */}
                <div className="space-y-6">
                    <Card className="p-6 space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between"><Label>Horizontal Offset</Label><span className="font-mono">{hOffset}px</span></div>
                            <Slider value={hOffset} onValueChange={setHOffset} min={-100} max={100} />

                            <div className="flex justify-between"><Label>Vertical Offset</Label><span className="font-mono">{vOffset}px</span></div>
                            <Slider value={vOffset} onValueChange={setVOffset} min={-100} max={100} />

                            <div className="flex justify-between"><Label>Blur Radius</Label><span className="font-mono">{blur}px</span></div>
                            <Slider value={blur} onValueChange={setBlur} min={0} max={100} />

                            <div className="flex justify-between"><Label>Spread Radius</Label><span className="font-mono">{spread}px</span></div>
                            <Slider value={spread} onValueChange={setSpread} min={-50} max={50} />

                            <div className="flex justify-between"><Label>Opacity</Label><span className="font-mono">{opacity}</span></div>
                            <Slider value={opacity} onValueChange={setOpacity} min={0} max={1} step={0.01} />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label>Shadow Color</Label>
                            <div className="flex gap-2">
                                <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-12 p-1" />
                                <Input value={color} onChange={(e) => setColor(e.target.value)} className="uppercase w-24" />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="inset" checked={inset} onChange={(e) => setInset(e.target.checked)} className="h-4 w-4" />
                            <Label htmlFor="inset">Inset</Label>
                        </div>
                    </Card>

                    <Card className="p-4 bg-muted/50 font-mono text-sm relative">
                        <code className="block break-all pr-10">{cssCode}</code>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute right-2 top-2 h-8 w-8"
                            onClick={() => navigator.clipboard.writeText(cssCode)}
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                    </Card>
                </div>

                {/* Preview */}
                <div className="flex items-center justify-center rounded-lg border bg-muted/20 min-h-[400px]">
                    <div
                        className="h-48 w-48 rounded-lg bg-white dark:bg-slate-800 transition-all duration-200 flex items-center justify-center font-bold text-muted-foreground"
                        style={{ boxShadow: shadowValue }}
                    >
                        Preview
                    </div>
                </div>
            </div>
        </ToolWrapper>
    )
}
