import { Shield, Zap, Palette, Code2, Lock, Smartphone } from "lucide-react"
import { BuyMeCoffee } from "@/components/common/BuyMeCoffee"

export const metadata = {
    title: "About Us - OpenToolbox",
    description: "Learn more about OpenToolbox and our mission to provide free, secure developer utilities.",
}

const features = [
    {
        icon: Shield,
        title: "Privacy First",
        description: "We strictly prioritize client-side processing. Your data (images, code, passwords) rarely leaves your browser."
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Built with Next.js 14 and optimized for Web Vitals. No bloat, no trackers, just pure utility."
    },
    {
        icon: Palette,
        title: "Modern Design",
        description: "Tools shouldn't look like they were built in 1999. We use clean, modern aesthetics for a better experience."
    },
]

export default function AboutPage() {
    return (
        <div className="space-y-24 py-12 md:py-20">
            {/* Hero Section */}
            <section className="mx-auto max-w-4xl text-center space-y-6">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    Open Source & Free Forever
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Developer tools, reimagined.
                </h1>
                <p className="mx-auto max-w-2xl text-xl text-muted-foreground leading-relaxed">
                    OpenToolbox was born from a simple frustration: developer tools should be beautiful, fast, and respect your privacy.
                    We were tired of ad-ridden sites that upload your data just to format JSON.
                </p>
            </section>

            {/* Values Grid */}
            <section className="mx-auto max-w-6xl px-4">
                <div className="grid gap-8 md:grid-cols-3">
                    {features.map((feature, i) => (
                        <div key={i} className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-muted/40 border hover:bg-muted/60 transition-colors">
                            <div className="p-3 rounded-xl bg-background border shadow-sm">
                                <feature.icon className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Who is this for */}
            <section className="mx-auto max-w-3xl space-y-12">
                <div className="space-y-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tight">Built for Everyone</h2>
                    <p className="text-lg text-muted-foreground">
                        Whether you are debugging an API, optimizing assets, or just generating a password.
                    </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                        <Code2 className="mt-1 h-5 w-5 text-blue-500" />
                        <div>
                            <h4 className="font-semibold">Software Engineers</h4>
                            <p className="text-sm text-muted-foreground">Format JSON, SQL, and decode JWTs without fear of data leaks.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                        <Palette className="mt-1 h-5 w-5 text-purple-500" />
                        <div>
                            <h4 className="font-semibold">Designers</h4>
                            <p className="text-sm text-muted-foreground">Generate CSS gradients, box-shadows, and optimize images.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                        <Lock className="mt-1 h-5 w-5 text-green-500" />
                        <div>
                            <h4 className="font-semibold">Privacy Advocates</h4>
                            <p className="text-sm text-muted-foreground">Generate secure passwords and UUIDs entirely offline.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                        <Smartphone className="mt-1 h-5 w-5 text-orange-500" />
                        <div>
                            <h4 className="font-semibold">Mobile Developers</h4>
                            <p className="text-sm text-muted-foreground">Test deep links and generate QR codes for app downloads.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Buy Me Coffee */}
            <div className="mx-auto max-w-3xl px-4">
                <BuyMeCoffee />
            </div>
        </div>
    )
}
