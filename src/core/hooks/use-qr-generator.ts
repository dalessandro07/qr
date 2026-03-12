import {
	startTransition,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import {
	IMAGE_FORMAT_OPTIONS,
	MARGIN_MAX,
	MARGIN_MIN,
	QUALITY_MAX,
	QUALITY_MIN,
	WIDTH_MAX,
	WIDTH_MIN,
} from "@/core/lib/constants/qrcode-options";
import { generateQRCode } from "@/core/lib/qrcode";
import { useQRStore } from "@/core/store/qr-store";

const DEBOUNCE_MS = 150;

function hexToRgbaHex(hex: string): string {
	if (hex.length === 9 && hex.startsWith("#")) return hex;
	if (hex.length === 7 && hex.startsWith("#")) return `${hex}ff`;
	return hex;
}

export function useQRGenerator() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const abortRef = useRef(false);

	const {
		content,
		width,
		margin,
		errorCorrectionLevel,
		colorDark,
		colorLight,
		imageFormat,
		quality,
		dotsType,
		cornersSquareType,
		cornersDotType,
		shape,
		qrCode,
		setQRCode,
		clearQRCode,
		resetAll,
	} = useQRStore();

	const generate = useCallback(async () => {
		if (!content?.trim()) {
			setError(null);
			clearQRCode();
			return;
		}

		setError(null);
		setIsLoading(true);
		abortRef.current = false;
		try {
			const options = {
				width: Math.min(Math.max(width, WIDTH_MIN), WIDTH_MAX),
				margin: Math.min(Math.max(margin, MARGIN_MIN), MARGIN_MAX),
				errorCorrectionLevel,
				color: {
					dark: hexToRgbaHex(colorDark),
					light: hexToRgbaHex(colorLight),
				},
				type: imageFormat,
				quality:
					imageFormat !== "image/png"
						? Math.min(Math.max(quality, QUALITY_MIN), QUALITY_MAX) / 100
						: undefined,
				dotsType,
				cornersSquareType,
				cornersDotType,
				shape,
			};
			const result = await generateQRCode(content.trim(), options);
			if (!abortRef.current) setQRCode(result);
		} catch (err) {
			if (!abortRef.current) setError("Error al generar el QR");
			console.error(err);
		} finally {
			if (!abortRef.current) setIsLoading(false);
		}
	}, [
		content,
		width,
		margin,
		errorCorrectionLevel,
		colorDark,
		colorLight,
		imageFormat,
		quality,
		dotsType,
		cornersSquareType,
		cornersDotType,
		shape,
		setQRCode,
		clearQRCode,
	]);

	useEffect(() => {
		if (!content?.trim()) {
			clearQRCode();
			setError(null);
			return;
		}

		const timer = setTimeout(() => {
			startTransition(() => {
				generate();
			});
		}, DEBOUNCE_MS);

		return () => {
			clearTimeout(timer);
			abortRef.current = true;
		};
	}, [content, generate, clearQRCode]);

	const download = useCallback(() => {
		if (!qrCode) return;
		const formatOption = IMAGE_FORMAT_OPTIONS.find(
			(f) => f.value === imageFormat,
		);
		const ext = formatOption?.extension ?? "png";
		const link = document.createElement("a");
		link.href = qrCode;
		link.download = `qr.${ext}`;
		link.click();
	}, [qrCode, imageFormat]);

	return {
		isLoading,
		error,
		qrCode,
		generate,
		download,
		clearQRCode,
		resetAll,
	};
}
