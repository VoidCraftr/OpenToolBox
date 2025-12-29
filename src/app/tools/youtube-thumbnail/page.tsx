"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Download, Youtube, Loader2, Image as ImageIcon } from "lucide-react"

export default function YoutubeThumbnail() {
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [videoId, setVideoId] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const extractVideoId = (inputUrl: string) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
        const match = inputUrl.match(regex)
        return match ? match[1] : null
    }

    const handleFetch = () => {
        setError(null)
        setLoading(true)

        const id = extractVideoId(url)
        if (id) {
            setVideoId(id)
        } else {
            setError("Invalid YouTube URL. Please try again.")
            setVideoId(null)
        }
        setLoading(false)
    }

    const downloadImage = async (imageUrl: string, quality: string) => {
        try {
            const response = await fetch(imageUrl)
            const blob = await response.blob()
            const blobUrl = window.URL.createObjectURL(blob)

            const link = document.createElement("a")
            link.href = blobUrl
            link.download = `youtube-thumbnail-${videoId}-${quality}.jpg`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(blobUrl)
        } catch (e) {
            console.error("Download failed", e)
            // Fallback for cross-origin issues if simple fetch fails (though simple img download might be blocked usually you open in new tab)
            window.open(imageUrl, '_blank')
        }
    }

    const qualities = [
        { label: "Max Resolution (HD)", suffix: "maxresdefault" },
        { label: "High Quality (HQ)", suffix: "hqdefault" },
        { label: "Standard Quality (SD)", suffix: "sddefault" },
        { label: "Medium Quality", suffix: "mqdefault" },
    ]

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">YouTube Thumbnail Downloader</h1>
                <p className="text-muted-foreground">
                    Download high-quality thumbnails from any YouTube video.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Get Thumbnail</CardTitle>
                    <CardDescription>
                        Paste the YouTube video URL below to preview and download thumbnails.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="https://www.youtube.com/watch?v=..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleFetch()}
                        />
                        <Button onClick={handleFetch} disabled={!url || loading}>
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Youtube className="w-4 h-4 mr-2" />}
                            Get Thumbnail
                        </Button>
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {videoId && (
                <div className="grid gap-6 md:grid-cols-2">
                    {qualities.map((quality) => (
                        <Card key={quality.suffix}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center justify-between">
                                    {quality.label}
                                    <Button variant="outline" size="sm" onClick={() => downloadImage(`https://img.youtube.com/vi/${videoId}/${quality.suffix}.jpg`, quality.suffix)}>
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-muted rounded-md overflow-hidden relative border">
                                    <img
                                        src={`https://img.youtube.com/vi/${videoId}/${quality.suffix}.jpg`}
                                        alt={quality.label}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            // Fallback if maxres is not available (sometimes it isn't)
                                            if (quality.suffix === "maxresdefault") {
                                                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                            }
                                        }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
