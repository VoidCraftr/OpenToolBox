"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Copy, RefreshCw } from "lucide-react"

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse"
type JustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"
type AlignItems = "flex-start" | "flex-end" | "center" | "baseline" | "stretch"
type FlexWrap = "nowrap" | "wrap" | "wrap-reverse"

export function FlexboxPlayground() {
    const [flexDirection, setFlexDirection] = useState<FlexDirection>("row")
    const [justifyContent, setJustifyContent] = useState<JustifyContent>("center")
    const [alignItems, setAlignItems] = useState<AlignItems>("center")
    const [flexWrap, setFlexWrap] = useState<FlexWrap>("nowrap")
    const [gap, setGap] = useState(10)
    const [itemCount, setItemCount] = useState(4)

    const codeSnippet = `
.container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${gap}px;
}`

    const handleCopy = () => {
        navigator.clipboard.writeText(codeSnippet.trim())
    }

    return (
        <div className="grid lg:grid-cols-3 gap-6">
            {/* Controls */}
            <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle className="text-lg">Flex Container Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>flex-direction</Label>
                        <Select value={flexDirection} onValueChange={(v) => setFlexDirection(v as FlexDirection)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="row">row</SelectItem>
                                <SelectItem value="row-reverse">row-reverse</SelectItem>
                                <SelectItem value="column">column</SelectItem>
                                <SelectItem value="column-reverse">column-reverse</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>justify-content</Label>
                        <Select value={justifyContent} onValueChange={(v) => setJustifyContent(v as JustifyContent)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="flex-start">flex-start</SelectItem>
                                <SelectItem value="flex-end">flex-end</SelectItem>
                                <SelectItem value="center">center</SelectItem>
                                <SelectItem value="space-between">space-between</SelectItem>
                                <SelectItem value="space-around">space-around</SelectItem>
                                <SelectItem value="space-evenly">space-evenly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>align-items</Label>
                        <Select value={alignItems} onValueChange={(v) => setAlignItems(v as AlignItems)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="flex-start">flex-start</SelectItem>
                                <SelectItem value="flex-end">flex-end</SelectItem>
                                <SelectItem value="center">center</SelectItem>
                                <SelectItem value="baseline">baseline</SelectItem>
                                <SelectItem value="stretch">stretch</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>flex-wrap</Label>
                        <Select value={flexWrap} onValueChange={(v) => setFlexWrap(v as FlexWrap)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="nowrap">nowrap</SelectItem>
                                <SelectItem value="wrap">wrap</SelectItem>
                                <SelectItem value="wrap-reverse">wrap-reverse</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <Label>gap ({gap}px)</Label>
                        </div>
                        <Slider value={[gap]} onValueChange={(v) => setGap(v[0])} max={50} step={1} />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <Label>Items ({itemCount})</Label>
                        </div>
                        <Slider value={[itemCount]} onValueChange={(v) => setItemCount(v[0])} min={1} max={12} step={1} />
                    </div>
                </CardContent>
            </Card>

            {/* Preview & Code */}
            <div className="lg:col-span-2 space-y-6">
                <Card className="min-h-[400px] flex flex-col">
                    <CardHeader className="pb-2 border-b">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Live Preview</CardTitle>
                    </CardHeader>
                    <div
                        className="flex-1 bg-muted/30 p-4 transition-all overflow-hidden"
                        style={{
                            display: 'flex',
                            flexDirection,
                            justifyContent,
                            alignItems,
                            flexWrap,
                            gap: `${gap}px`
                        }}
                    >
                        {Array.from({ length: itemCount }).map((_, i) => (
                            <div
                                key={i}
                                className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold shadow-sm transition-all hover:bg-blue-600 hover:scale-105"
                                style={{
                                    height: alignItems === 'stretch' ? 'auto' : undefined,
                                    minHeight: alignItems === 'stretch' ? '64px' : undefined
                                }}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="bg-zinc-950 text-zinc-50 border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between py-3">
                        <CardTitle className="text-sm font-mono text-zinc-400">CSS Output</CardTitle>
                        <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 w-8 p-0 text-zinc-400 hover:text-zinc-100">
                            <Copy className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <pre className="font-mono text-sm overflow-x-auto p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                            {codeSnippet.trim()}
                        </pre>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
