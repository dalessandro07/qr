import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/core/components/footer";
import { JsonLd } from "@/core/components/seo/json-ld";
import { TooltipProvider } from "@/core/components/ui/tooltip";
import {
	APP_DESCRIPTION,
	APP_KEYWORDS,
	APP_NAME,
	APP_URL,
} from "@/core/lib/constants";
import { cn } from "@/core/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#ffffff",
};

export const metadata: Metadata = {
	metadataBase: new URL(APP_URL),
	title: { default: APP_NAME, template: `%s | ${APP_NAME}` },
	description: APP_DESCRIPTION,
	keywords: APP_KEYWORDS,
	authors: [{ name: APP_NAME, url: APP_URL }],
	creator: APP_NAME,
	openGraph: {
		type: "website",
		locale: "es_ES",
		url: "/",
		siteName: APP_NAME,
		title: APP_NAME,
		description: APP_DESCRIPTION,
		images: [
			{
				url: "/opengraph-image",
				width: 1200,
				height: 630,
				alt: APP_NAME,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: APP_NAME,
		description: APP_DESCRIPTION,
		images: ["/opengraph-image"],
	},
	robots: { index: true, follow: true },
	alternates: { canonical: "/" },
	category: "technology",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es" className={cn("font-sans", inter.variable)}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} flex min-h-dvh flex-col antialiased`}
			>
				<JsonLd />
				<TooltipProvider>
					<div className="flex-1">{children}</div>
					<Footer />
				</TooltipProvider>
			</body>
		</html>
	);
}
