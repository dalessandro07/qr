import { ImageResponse } from "next/og";
import { APP_DESCRIPTION, APP_NAME } from "@/core/lib/constants";

export const alt = APP_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
	return new ImageResponse(
		<div
			style={{
				background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				padding: 48,
				fontFamily: "system-ui, sans-serif",
			}}
		>
			<div
				style={{
					fontSize: 72,
					fontWeight: "bold",
					color: "white",
					marginBottom: 24,
					letterSpacing: "-0.02em",
				}}
			>
				{APP_NAME}
			</div>
			<div
				style={{
					fontSize: 28,
					color: "rgba(255, 255, 255, 0.8)",
					textAlign: "center",
					maxWidth: 800,
				}}
			>
				{APP_DESCRIPTION}
			</div>
			<div
				style={{
					marginTop: 48,
					padding: "16px 32px",
					background: "rgba(255, 255, 255, 0.1)",
					borderRadius: 12,
					fontSize: 24,
					color: "white",
				}}
			>
				+QR
			</div>
		</div>,
		{ ...size },
	);
}
