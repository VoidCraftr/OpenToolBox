export const metadata = {
    title: "About Us - Nexus Tools",
    description: "Learn more about Nexus Tools and our mission to provide free, secure developer utilities.",
}

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-3xl space-y-8 py-8">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl font-bold tracking-tight">About Nexus Tools</h1>
                <p className="text-xl text-muted-foreground">
                    Premium developer utilities, free for everyone.
                </p>
            </div>

            <div className="prose dark:prose-invert max-w-none">
                <p>
                    Nexus Tools was born from a simple idea: developer tools should be fast, beautiful, and respect your privacy.
                    We were tired of ad-ridden, slow, and ugly utility sites that upload your data to servers just to format a JSON file.
                </p>

                <h2>Our Mission</h2>
                <ul>
                    <li><strong>Privacy First:</strong> We prioritize client-side processing. Your data (images, code, passwords) rarely leaves your browser.</li>
                    <li><strong>Speed:</strong> Built with Next.js 14 and optimized for performance.</li>
                    <li><strong>Design:</strong> Tools shouldn't look like they were built in 1999. We use modern aesthetics for a better experience.</li>
                </ul>

                <h2>Who is this for?</h2>
                <p>
                    Whether you are a software engineer debugging an API, a designer optimizing assets, or just someone looking to generate a secure password, Nexus Tools is built for you.
                </p>
            </div>
        </div>
    )
}
