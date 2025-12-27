export const metadata = {
    title: "Terms of Service - Nexus Tools",
    description: "Terms and Conditions for using Nexus Tools.",
}

export default function TermsPage() {
    return (
        <div className="mx-auto max-w-3xl py-8">
            <div className="prose dark:prose-invert max-w-none">
                <h1>Terms of Service</h1>
                <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

                <h2>1. Terms</h2>
                <p>
                    By accessing this Website, accessible from https://nexus-tools.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws.
                    If you disagree with any of these terms, you are prohibited from accessing this site.
                </p>

                <h2>2. Use License</h2>
                <p>
                    Permission is granted to temporarily download one copy of the materials on Nexus Tools's Website for personal, non-commercial transitory viewing only.
                </p>

                <h2>3. Disclaimer</h2>
                <p>
                    All the materials on Nexus Tools’s Website are provided "as is". Nexus Tools makes no warranties, may it be expressed or implied, therefore negates all other warranties.
                    Furthermore, Nexus Tools does not make any representations concerning the accuracy or likely results of the use of the materials on its Website or otherwise relating to such materials or on any sites linked to this Website.
                </p>

                <h2>4. Limitations</h2>
                <p>
                    Nexus Tools or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on Nexus Tools’s Website, even if Nexus Tools or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage.
                </p>
            </div>
        </div>
    )
}
