"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Loader2, AlertCircle } from "lucide-react"
import { getSocialPreview, SocialPreviewData } from "@/app/actions/social-preview"

export function SocialPreview() {
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<SocialPreviewData | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handlePreview = async () => {
        if (!url) return
        setLoading(true)
        setError(null)
        setData(null)

        try {
            const result = await getSocialPreview(url)
            if (result) {
                setData(result)
            } else {
                setError("Failed to fetch preview data. Please check the URL.")
            }
        } catch (err) {
            setError("An error occurred while fetching the preview.")
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handlePreview()
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Enter URL to Preview</CardTitle>
                    <CardDescription>
                        Paste a link below to see how it looks on social media.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Input
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Button onClick={handlePreview} disabled={loading}>
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                            <span className="ml-2 hidden sm:inline">Check</span>
                        </Button>
                    </div>
                    {error && (
                        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md flex items-center gap-2 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}
                </CardContent>
            </Card>

            {data && (
                <div className="space-y-6">
                    <Tabs defaultValue="facebook" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="facebook">Facebook</TabsTrigger>
                            <TabsTrigger value="twitter">Twitter</TabsTrigger>
                            <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                            <TabsTrigger value="google">Google</TabsTrigger>
                        </TabsList>

                        {/* Facebook Preview */}
                        <TabsContent value="facebook" className="flex justify-center p-4 bg-gray-100 dark:bg-zinc-900 rounded-md mt-4">
                            <div className="w-[500px] max-w-full bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-lg overflow-hidden shadow-sm">
                                {data.image && (
                                    <div className="h-[260px] w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${data.image})` }} />
                                )}
                                <div className="p-3 bg-[#f0f2f5] dark:bg-zinc-900 border-t dark:border-zinc-700">
                                    <div className="uppercase text-xs text-stone-500 mb-1 truncate">{data.hostname}</div>
                                    <div className="font-bold text-[#1d2129] dark:text-zinc-200 text-base leading-5 mb-1 line-clamp-2">{data.title}</div>
                                    <div className="text-sm text-stone-500 line-clamp-1">{data.description}</div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Twitter Preview (Large Card) */}
                        <TabsContent value="twitter" className="flex justify-center p-4 bg-white dark:bg-black rounded-md mt-4 border">
                            <div className="w-[500px] max-w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800">
                                {data.image && (
                                    <div className="h-[260px] w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${data.image})` }}>
                                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-1 rounded">PROMOTED</div>
                                    </div>
                                )}
                                <div className="p-3 bg-white dark:bg-black">
                                    <div className="text-gray-500 dark:text-gray-400 text-sm truncate">{data.hostname}</div>
                                    <div className="text-gray-900 dark:text-gray-100 text-base font-medium leading-5 mt-1 line-clamp-2">{data.title}</div>
                                    <div className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-2">{data.description}</div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* LinkedIn Preview */}
                        <TabsContent value="linkedin" className="flex justify-center p-4 bg-[#f3f2ef] dark:bg-zinc-900 rounded-md mt-4">
                            <div className="w-[500px] max-w-full bg-white dark:bg-zinc-800 rounded shadow-sm overflow-hidden">
                                {data.image && (
                                    <div className="h-[260px] w-full bg-cover bg-center" style={{ backgroundImage: `url(${data.image})` }} />
                                )}
                                <div className="p-2 border-b dark:border-zinc-700">
                                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{data.title}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{data.hostname} • 1 min read</div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Google Search Preview */}
                        <TabsContent value="google" className="flex justify-center p-8 bg-white dark:bg-black rounded-md mt-4 border">
                            <div className="w-[600px] max-w-full font-sans">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center p-1">
                                        {/* Favicon placeholder */}
                                        <img src={data.favicon} className="w-4 h-4" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-[#202124] dark:text-[#dadce0]">{data.siteName || data.hostname}</span>
                                        <span className="text-xs text-[#5f6368] dark:text-[#bdc1c6] truncate">{data.url}</span>
                                    </div>
                                </div>
                                <div className="text-xl text-[#1a0dab] dark:text-[#8ab4f8] cursor-pointer hover:underline mb-1 truncate">{data.title}</div>
                                <div className="text-sm text-[#4d5156] dark:text-[#bdc1c6] line-clamp-2">{data.description}</div>
                            </div>
                        </TabsContent>

                    </Tabs>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">Meta Title</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <code className="text-xs bg-muted p-2 rounded block break-all">{data.title || "No title found"}</code>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">Meta Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <code className="text-xs bg-muted p-2 rounded block break-all">{data.description || "No description found"}</code>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}
