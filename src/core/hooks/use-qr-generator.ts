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
import { generateQRCode, generateQRPreview } from "@/core/lib/qrcode";
import { useQRStore } from "@/core/store/qr-store";

const CONTENT_DEBOUNCE_MS = 150;
const OPTIONS_THROTTLE_MS = 50;

function hexToRgbaHex(hex: string): string {
	if (hex.length === 9 && hex.startsWith("#")) return hex;
	if (hex.length === 7 && hex.startsWith("#")) return `${hex}ff`;
	return hex;
}

export function useQRGenerator() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const abortRef = useRef(false);
	const isFirstMount = useRef(true);
	const generateRef = useRef<() => Promise<void>>(() => Promise.resolve());
	const optionsThrottleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const optionsLastRunRef = useRef(0);

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

	const buildOptions = useCallback(
		() => ({
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
		}),
		[
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
		],
	);

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
			const options = buildOptions();
			const result = await generateQRPreview(content.trim(), options);
			if (!abortRef.current) setQRCode(result);
		} catch (err) {
			if (!abortRef.current) setError("Error al generar el QR");
			console.error(err);
		} finally {
			if (!abortRef.current) setIsLoading(false);
		}
	}, [content, buildOptions, setQRCode, clearQRCode]);
	generateRef.current = generate;

	// Debounce solo para cambios de contenido (al escribir)
	useEffect(() => {
		if (!content?.trim()) {
			isFirstMount.current = false;
			clearQRCode();
			setError(null);
			return;
		}
		// En el primer montaje, el efecto de opciones genera; evitamos duplicado
		if (isFirstMount.current) {
			isFirstMount.current = false;
			return;
		}

		const timer = setTimeout(() => {
			startTransition(() => generate());
		}, CONTENT_DEBOUNCE_MS);

		return () => {
			clearTimeout(timer);
			abortRef.current = true;
		};
	}, [content, generate, clearQRCode]);

	// Throttle para colores/opciones: evita colas al arrastrar el selector
	// biome-ignore lint/correctness/useExhaustiveDependencies: deps intencionales
	useEffect(() => {
		if (!useQRStore.getState().content?.trim()) return;

		const run = () => {
			optionsLastRunRef.current = Date.now();
			abortRef.current = false;
			startTransition(() => generateRef.current());
		};

		const elapsed = Date.now() - optionsLastRunRef.current;
		if (elapsed >= OPTIONS_THROTTLE_MS || optionsLastRunRef.current === 0) {
			run();
		} else {
			optionsThrottleRef.current = setTimeout(
				run,
				OPTIONS_THROTTLE_MS - elapsed,
			);
		}

		return () => {
			if (optionsThrottleRef.current) {
				clearTimeout(optionsThrottleRef.current);
				optionsThrottleRef.current = null;
			}
			abortRef.current = true;
		};
	}, [
		colorDark,
		colorLight,
		width,
		margin,
		errorCorrectionLevel,
		imageFormat,
		quality,
		dotsType,
		cornersSquareType,
		cornersDotType,
		shape,
	]);

	const download = useCallback(async () => {
		if (!content?.trim()) return;
		const formatOption = IMAGE_FORMAT_OPTIONS.find(
			(f) => f.value === imageFormat,
		);
		const ext = formatOption?.extension ?? "png";
		try {
			const options = buildOptions();
			const dataUrl = await generateQRCode(content.trim(), options);
			const link = document.createElement("a");
			link.href = dataUrl;
			link.download = `qr.${ext}`;
			link.click();
		} catch (err) {
			setError("Error al generar el QR");
			console.error(err);
		}
	}, [content, imageFormat, buildOptions]);

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
