export const metadata = {
    title: "Privacy Policy - Nexus Tools",
    description: "Privacy Policy for Nexus Tools.",
}

export default function PrivacyPage() {
    return (
        <div className="mx-auto max-w-3xl py-8">
            <div className="prose dark:prose-invert max-w-none">
                <h1>Privacy Policy</h1>
                <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

                <p>
                    At Nexus Tools, accessible from https://nexus-tools.com, one of our main priorities is the privacy of our visitors.
                    This Privacy Policy document contains types of information that is collected and recorded by Nexus Tools and how we use it.
                </p>

                <h2>Consent</h2>
                <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

                <h2>Information We Collect</h2>
                <p>
                    Nexus Tools operates primarily as a client-side application. This means:
                </p>
                <ul>
                    <li><strong>Input Data:</strong> When you use tools like JSON Formatter or Image Converter, your data (code, images, files) is processed locally in your browser. We do NOT upload this data to our servers.</li>
                    <li><strong>Logs:</strong> Like any other website, we collect standard log files including IP addresses, browser type, ISP, date/time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.</li>
                </ul>

                <h2>Cookies and Web Beacons</h2>
                <p>
                    Nexus Tools uses 'cookies' to store information including visitors' preferences and the pages on the website that the visitor accessed or visited.
                    The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                </p>

                <h2>Google DoubleClick DART Cookie</h2>
                <p>
                    Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet.
                    However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</a>
                </p>

                <h2>Advertising Partners Privacy Policies</h2>
                <p>
                    You may consult this list to find the Privacy Policy for each of the advertising partners of Nexus Tools.
                </p>
                <p>
                    Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Nexus Tools, which are sent directly to users' browser.
                    They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
                </p>
                <p>
                    Note that Nexus Tools has no access to or control over these cookies that are used by third-party advertisers.
                </p>
            </div>
        </div>
    )
}
