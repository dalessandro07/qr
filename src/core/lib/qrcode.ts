import QRCodeStyling from "qr-code-styling";
import type {
	CornerDotType,
	CornerSquareType,
	DotType,
	QRCodeOptions,
	ShapeType,
} from "@/core/lib/constants/qrcode-options";
import { DEFAULT_QR_OPTIONS } from "@/core/lib/constants/qrcode-options";

function imageFormatToExtension(format: string): "png" | "jpeg" | "webp" {
	if (format === "image/jpeg") return "jpeg";
	if (format === "image/webp") return "webp";
	return "png";
}

function blobToDataUrl(blob: Blob): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
}

const PREVIEW_SIZE = 400;

export async function generateQRCode(
	data: string,
	options?: Partial<QRCodeOptions>,
) {
	const width = options?.width ?? DEFAULT_QR_OPTIONS.width ?? 400;
	const margin = options?.margin ?? DEFAULT_QR_OPTIONS.margin ?? 4;
	const colorDark =
		options?.color?.dark ?? DEFAULT_QR_OPTIONS.color?.dark ?? "#000000ff";
	const colorLight =
		options?.color?.light ?? DEFAULT_QR_OPTIONS.color?.light ?? "#ffffffff";
	const dotsType = (options?.dotsType ??
		DEFAULT_QR_OPTIONS.dotsType ??
		"square") as DotType;
	const cornersSquareType = (options?.cornersSquareType ??
		DEFAULT_QR_OPTIONS.cornersSquareType ??
		"square") as CornerSquareType;
	const cornersDotType = (options?.cornersDotType ??
		DEFAULT_QR_OPTIONS.cornersDotType ??
		"square") as CornerDotType;
	const shape = (options?.shape ??
		DEFAULT_QR_OPTIONS.shape ??
		"square") as ShapeType;
	const errorCorrectionLevel =
		options?.errorCorrectionLevel ??
		DEFAULT_QR_OPTIONS.errorCorrectionLevel ??
		"M";
	const imageFormat = options?.type ?? DEFAULT_QR_OPTIONS.type ?? "image/png";

	const qrCode = new QRCodeStyling({
		width: width as number,
		height: width as number,
		margin: margin as number,
		data,
		type: "canvas",
		shape,
		qrOptions: {
			errorCorrectionLevel,
		},
		dotsOptions: {
			color: colorDark,
			type: dotsType,
		},
		backgroundOptions: {
			color: colorLight,
		},
		cornersSquareOptions: {
			type: cornersSquareType,
			color: colorDark,
		},
		cornersDotOptions: {
			type: cornersDotType,
			color: colorDark,
		},
	});

	const extension = imageFormatToExtension(imageFormat);
	const blob = await qrCode.getRawData(extension);
	if (!blob) throw new Error("No se pudo generar el QR");

	const dataUrl = await blobToDataUrl(blob as Blob);
	return dataUrl;
}

export async function generateQRPreview(
	data: string,
	options: Partial<QRCodeOptions>,
): Promise<string> {
	return generateQRCode(data, {
		...options,
		width: PREVIEW_SIZE,
		margin: 2,
	});
}
