import { Separator } from "@/components/ui/separator"
import { AdBanner } from "@/components/ads/AdBanner"

interface ToolWrapperProps {
    title: string
    description: string
    children: React.ReactNode
    adSlot?: string
}

export function ToolWrapper({
    title,
    description,
    children,
    adSlot = "1234567890", // Default test slot
}: ToolWrapperProps) {
    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div className="space-y-2 text-center md:text-left">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                    {title}
                </h1>
                <p className="text-lg text-muted-foreground">{description}</p>
            </div>

            <Separator />

            <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                <div className="min-w-0 space-y-6">
                    {children}
                </div>

                <aside className="hidden space-y-6 lg:block">
                    <div className="sticky top-20">
                        <AdBanner slot="sidebar-ad" className="min-h-[600px]" />
                    </div>
                </aside>
            </div>

            <div className="mt-12">
                <AdBanner slot="bottom-ad" />
            </div>
        </div>
    )
}
