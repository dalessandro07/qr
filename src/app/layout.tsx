import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/core/components/footer";
import { APP_DESCRIPTION, APP_NAME } from "@/core/lib/constants";
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

export const metadata: Metadata = {
	title: APP_NAME,
	description: APP_DESCRIPTION,
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
				<div className="flex-1">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
