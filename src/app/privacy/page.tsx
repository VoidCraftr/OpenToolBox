import { Separator } from "@/components/ui/separator"
import { Shield, Lock, Eye, Server } from "lucide-react"

export const metadata = {
    title: "Privacy Policy - OpenToolbox",
    description: "Our commitment to your privacy and data security.",
}

export default function PrivacyPage() {
    return (
        <div className="mx-auto max-w-3xl py-12 space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
                <p className="text-lg text-muted-foreground">
                    Last updated: December 2025
                </p>
            </div>

            {/* TL;DR Box */}
            <div className="rounded-xl border-2 border-blue-100 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-900/50 p-6 space-y-4">
                <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100">TL;DR Summary</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 text-sm text-blue-800 dark:text-blue-200">
                    <div className="flex items-start gap-2">
                        <Lock className="h-4 w-4 mt-0.5 opacity-70" />
                        <span>All processing happens in your browser.</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <Eye className="h-4 w-4 mt-0.5 opacity-70" />
                        <span>We do not track your personal inputs.</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <Server className="h-4 w-4 mt-0.5 opacity-70" />
                        <span>We do not sell your data.</span>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none prose-ul:list-disc prose-ul:pl-6 prose-li:marker:text-blue-500">
                <h3>1. Introduction</h3>
                <p>
                    OpenToolbox ("we", "us", or "our") operates the OpenToolbox website. We respect your privacy and are committed to protecting it through our compliance with this policy.
                </p>

                <h3>2. Information We Collect</h3>
                <p>
                    Because OpenToolbox is a client-side first application, we collect minimal data:
                </p>
                <ul>
                    <li><strong>Usage Data:</strong> We may use privacy-friendly analytics (like Vercel Analytics) to understand which tools are popular. This data is anonymized.</li>
                    <li><strong>No Input Data:</strong> The images you convert, the JSON you format, and the passwords you generate <strong>never leave your device</strong>. They are processed entirely within your browser's memory.</li>
                </ul>

                <h3>3. Cookies</h3>
                <p>
                    We use local storage (localStorage) to save your preferences, such as:
                </p>
                <ul>
                    <li>Dark/Light mode preference</li>
                    <li>Sidebar collapse state</li>
                    <li>"Pro" simulation toggle</li>
                </ul>
                <p>These are strictly necessary for the site to function as you expect.</p>

                <h3>4. Third-Party Services</h3>
                <p>
                    We may use third-party services for specific non-critical functions:
                </p>
                <ul>
                    <li><strong>GitHub:</strong> For hosting our open-source code.</li>
                    <li><strong>Vercel:</strong> For hosting the website infrastructure.</li>
                </ul>

                <h3>5. Contact Us</h3>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at <a href="mailto:satyam.agarwal.ai@gmail.com">satyam.agarwal.ai@gmail.com</a>.
                </p>
            </div>
        </div>
    )
}
