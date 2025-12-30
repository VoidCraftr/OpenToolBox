"use server"

import * as cheerio from 'cheerio';

export interface SocialPreviewData {
    title: string;
    description: string;
    image: string;
    url: string;
    siteName: string;
    hostname: string;
    favicon: string;
}

export async function getSocialPreview(url: string): Promise<SocialPreviewData | null> {
    try {
        if (!url.startsWith('http')) {
            url = 'https://' + url;
        }

        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; SocialPreviewBot/1.0;)'
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch URL: ${res.status}`);
        }

        const html = await res.text();
        const $ = cheerio.load(html);

        const title = $('meta[property="og:title"]').attr('content') || $('title').text() || '';
        const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
        const image = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content') || '';
        const siteName = $('meta[property="og:site_name"]').attr('content') || '';
        const hostname = new URL(url).hostname;

        // Basic favicon attempt
        let favicon = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href') || '/favicon.ico';
        if (favicon && !favicon.startsWith('http')) {
            favicon = new URL(favicon, url).toString();
        }

        return {
            title,
            description,
            image,
            url,
            siteName,
            hostname,
            favicon
        };

    } catch (error) {
        console.error("Error fetching social preview:", error);
        return null; // Or throw if you want to handle it on client
    }
}
