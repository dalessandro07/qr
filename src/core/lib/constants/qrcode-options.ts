export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";
export type ImageFormat = "image/png" | "image/jpeg" | "image/webp";

export type DotType =
	| "square"
	| "rounded"
	| "dots"
	| "classy"
	| "classy-rounded"
	| "extra-rounded";
export type CornerSquareType =
	| "square"
	| "dot"
	| "extra-rounded"
	| "rounded"
	| "dots"
	| "classy"
	| "classy-rounded";
export type CornerDotType =
	| "square"
	| "dot"
	| "rounded"
	| "dots"
	| "classy"
	| "classy-rounded"
	| "extra-rounded";
export type ShapeType = "square" | "circle";

export interface QRCodeOptions {
	errorCorrectionLevel?: ErrorCorrectionLevel;
	margin?: number;
	width?: number;
	color?: {
		dark?: string;
		light?: string;
	};
	type?: ImageFormat;
	quality?: number;
	dotsType?: DotType;
	cornersSquareType?: CornerSquareType;
	cornersDotType?: CornerDotType;
	shape?: ShapeType;
}

export const DEFAULT_QR_OPTIONS: QRCodeOptions = {
	errorCorrectionLevel: "M",
	margin: 4,
	width: 400,
	color: {
		dark: "#000000ff",
		light: "#ffffffff",
	},
	type: "image/png",
	quality: 0.92,
	dotsType: "square",
	cornersSquareType: "square",
	cornersDotType: "square",
	shape: "square",
};

export const DOTS_TYPE_OPTIONS: { value: DotType; label: string }[] = [
	{ value: "square", label: "Cuadrado" },
	{ value: "rounded", label: "Redondeado" },
	{ value: "dots", label: "Puntos" },
	{ value: "classy", label: "Clásico" },
	{ value: "classy-rounded", label: "Clásico redondeado" },
	{ value: "extra-rounded", label: "Extra redondeado" },
];

export const CORNERS_SQUARE_OPTIONS: {
	value: CornerSquareType;
	label: string;
}[] = [
	{ value: "square", label: "Cuadrado" },
	{ value: "dot", label: "Punto" },
	{ value: "extra-rounded", label: "Extra redondeado" },
	{ value: "rounded", label: "Redondeado" },
	{ value: "dots", label: "Puntos" },
	{ value: "classy", label: "Clásico" },
	{ value: "classy-rounded", label: "Clásico redondeado" },
];

export const CORNERS_DOT_OPTIONS: {
	value: CornerDotType;
	label: string;
}[] = [
	{ value: "square", label: "Cuadrado" },
	{ value: "dot", label: "Punto" },
	{ value: "rounded", label: "Redondeado" },
	{ value: "dots", label: "Puntos" },
	{ value: "classy", label: "Clásico" },
	{ value: "classy-rounded", label: "Clásico redondeado" },
	{ value: "extra-rounded", label: "Extra redondeado" },
];

export const SHAPE_OPTIONS: { value: ShapeType; label: string }[] = [
	{ value: "square", label: "Cuadrado" },
	{ value: "circle", label: "Círculo" },
];

export const ERROR_CORRECTION_OPTIONS: {
	value: ErrorCorrectionLevel;
	label: string;
}[] = [
	{ value: "L", label: "Bajo (~7%)" },
	{ value: "M", label: "Medio (~15%)" },
	{ value: "Q", label: "Cuartil (~25%)" },
	{ value: "H", label: "Alto (~30%)" },
];

export const IMAGE_FORMAT_OPTIONS: {
	value: ImageFormat;
	label: string;
	extension: string;
}[] = [
	{ value: "image/png", label: "PNG", extension: "png" },
	{ value: "image/jpeg", label: "JPEG", extension: "jpg" },
	{ value: "image/webp", label: "WebP", extension: "webp" },
];

export const WIDTH_MIN = 200;
export const WIDTH_MAX = 1200;
export const MARGIN_MIN = 0;
export const MARGIN_MAX = 20;
export const QUALITY_MIN = 0;
export const QUALITY_MAX = 100;
