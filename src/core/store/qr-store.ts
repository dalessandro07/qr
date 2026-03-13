import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
	CornerDotType,
	CornerSquareType,
	DotType,
	ErrorCorrectionLevel,
	ImageFormat,
	ShapeType,
} from "@/core/lib/constants/qrcode-options";
import {
	DEFAULT_QR_OPTIONS,
	MARGIN_MAX,
	MARGIN_MIN,
	QUALITY_MAX,
	QUALITY_MIN,
	WIDTH_MAX,
	WIDTH_MIN,
} from "@/core/lib/constants/qrcode-options";
import { createDebouncedStorage } from "@/core/lib/debounced-storage";

export interface QRStoreState {
	content: string;
	width: number;
	margin: number;
	errorCorrectionLevel: ErrorCorrectionLevel;
	colorDark: string;
	colorLight: string;
	imageFormat: ImageFormat;
	quality: number;
	dotsType: DotType;
	cornersSquareType: CornerSquareType;
	cornersDotType: CornerDotType;
	shape: ShapeType;
	qrCode: string | null;
}

interface QRStoreActions {
	setContent: (content: string) => void;
	setWidth: (width: number) => void;
	setMargin: (margin: number) => void;
	setErrorCorrectionLevel: (level: ErrorCorrectionLevel) => void;
	setColorDark: (color: string) => void;
	setColorLight: (color: string) => void;
	setImageFormat: (format: ImageFormat) => void;
	setQuality: (quality: number) => void;
	setDotsType: (type: DotType) => void;
	setCornersSquareType: (type: CornerSquareType) => void;
	setCornersDotType: (type: CornerDotType) => void;
	setShape: (shape: ShapeType) => void;
	setQRCode: (qrCode: string | null) => void;
	clearQRCode: () => void;
	resetAll: () => void;
}

const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max);

export const useQRStore = create<QRStoreState & QRStoreActions>()(
	persist(
		(set) => ({
			content: "",
			width: (DEFAULT_QR_OPTIONS.width ?? 600) as number,
			margin: (DEFAULT_QR_OPTIONS.margin ?? 4) as number,
			errorCorrectionLevel: (DEFAULT_QR_OPTIONS.errorCorrectionLevel ??
				"M") as ErrorCorrectionLevel,
			colorDark: (DEFAULT_QR_OPTIONS.color?.dark ?? "#000000ff").slice(0, 7),
			colorLight: (DEFAULT_QR_OPTIONS.color?.light ?? "#ffffffff").slice(0, 7),
			imageFormat: (DEFAULT_QR_OPTIONS.type ?? "image/png") as ImageFormat,
			quality: Math.round((DEFAULT_QR_OPTIONS.quality ?? 0.92) * 100),
			dotsType: (DEFAULT_QR_OPTIONS.dotsType ?? "square") as DotType,
			cornersSquareType: (DEFAULT_QR_OPTIONS.cornersSquareType ??
				"square") as CornerSquareType,
			cornersDotType: (DEFAULT_QR_OPTIONS.cornersDotType ??
				"square") as CornerDotType,
			shape: (DEFAULT_QR_OPTIONS.shape ?? "square") as ShapeType,
			qrCode: null,

			setContent: (content) => set({ content }),
			setWidth: (width) =>
				set((s) => ({ width: clamp(width, WIDTH_MIN, WIDTH_MAX) })),
			setMargin: (margin) =>
				set((s) => ({ margin: clamp(margin, MARGIN_MIN, MARGIN_MAX) })),
			setErrorCorrectionLevel: (errorCorrectionLevel) =>
				set({ errorCorrectionLevel }),
			setColorDark: (colorDark) => set({ colorDark }),
			setColorLight: (colorLight) => set({ colorLight }),
			setImageFormat: (imageFormat) => set({ imageFormat }),
			setQuality: (quality) =>
				set((s) => ({
					quality: clamp(quality, QUALITY_MIN, QUALITY_MAX),
				})),
			setDotsType: (dotsType) => set({ dotsType }),
			setCornersSquareType: (cornersSquareType) => set({ cornersSquareType }),
			setCornersDotType: (cornersDotType) => set({ cornersDotType }),
			setShape: (shape) => set({ shape }),
			setQRCode: (qrCode) => set({ qrCode }),
			clearQRCode: () => set({ qrCode: null }),
			resetAll: () => {
				set({
					content: "",
					width: (DEFAULT_QR_OPTIONS.width ?? 600) as number,
					margin: (DEFAULT_QR_OPTIONS.margin ?? 4) as number,
					errorCorrectionLevel: (DEFAULT_QR_OPTIONS.errorCorrectionLevel ??
						"M") as ErrorCorrectionLevel,
					colorDark: (DEFAULT_QR_OPTIONS.color?.dark ?? "#000000ff").slice(
						0,
						7,
					),
					colorLight: (DEFAULT_QR_OPTIONS.color?.light ?? "#ffffffff").slice(
						0,
						7,
					),
					imageFormat: (DEFAULT_QR_OPTIONS.type ?? "image/png") as ImageFormat,
					quality: Math.round((DEFAULT_QR_OPTIONS.quality ?? 0.92) * 100),
					dotsType: (DEFAULT_QR_OPTIONS.dotsType ?? "square") as DotType,
					cornersSquareType: (DEFAULT_QR_OPTIONS.cornersSquareType ??
						"square") as CornerSquareType,
					cornersDotType: (DEFAULT_QR_OPTIONS.cornersDotType ??
						"square") as CornerDotType,
					shape: (DEFAULT_QR_OPTIONS.shape ?? "square") as ShapeType,
					qrCode: null,
				});
				if (typeof window !== "undefined") {
					window.localStorage.removeItem("qr-generator-storage");
				}
			},
		}),
		{
			name: "qr-generator-storage",
			storage: createJSONStorage(() =>
				typeof window !== "undefined"
					? createDebouncedStorage(window.localStorage)
					: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
			),
			partialize: (state) => ({
				content: state.content,
				width: state.width,
				margin: state.margin,
				errorCorrectionLevel: state.errorCorrectionLevel,
				colorDark: state.colorDark,
				colorLight: state.colorLight,
				imageFormat: state.imageFormat,
				quality: state.quality,
				dotsType: state.dotsType,
				cornersSquareType: state.cornersSquareType,
				cornersDotType: state.cornersDotType,
				shape: state.shape,
			}),
		},
	),
);
