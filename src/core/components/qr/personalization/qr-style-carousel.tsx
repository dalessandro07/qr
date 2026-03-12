"use client";

import Image from "next/image";
import React, { memo, useEffect, useState } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/core/components/ui/carousel";
import { Label } from "@/core/components/ui/label";
import type {
	CornerDotType,
	CornerSquareType,
	DotType,
	ShapeType,
} from "@/core/lib/constants/qrcode-options";
import { generateQRPreview } from "@/core/lib/qrcode";
import { useQRStore } from "@/core/store/qr-store";

const SAMPLE_DATA = "A";
const THUMBNAIL_SIZE = 96;

function hexToRgbaHex(hex: string): string {
	if (hex.length === 9 && hex.startsWith("#")) return hex;
	if (hex.length === 7 && hex.startsWith("#")) return `${hex}ff`;
	return hex;
}

type OptionType = "shape" | "dotsType" | "cornersSquareType" | "cornersDotType";

interface QRStyleCarouselProps<T extends string> {
	label: string;
	storeKey: OptionType;
	options: { value: T; label: string }[];
}

const SETTER_MAP = {
	shape: (s: ReturnType<typeof useQRStore.getState>) => s.setShape,
	dotsType: (s: ReturnType<typeof useQRStore.getState>) => s.setDotsType,
	cornersSquareType: (s: ReturnType<typeof useQRStore.getState>) =>
		s.setCornersSquareType,
	cornersDotType: (s: ReturnType<typeof useQRStore.getState>) =>
		s.setCornersDotType,
} as const;

export const QRStyleCarousel = memo(function QRStyleCarousel<
	T extends ShapeType | DotType | CornerSquareType | CornerDotType,
>({ label, storeKey, options }: QRStyleCarouselProps<T>) {
	const value = useQRStore((s) => s[storeKey]) as T;
	const colorDark = useQRStore((s) => s.colorDark);
	const colorLight = useQRStore((s) => s.colorLight);
	const shape = useQRStore((s) => s.shape);
	const dotsType = useQRStore((s) => s.dotsType);
	const cornersSquareType = useQRStore((s) => s.cornersSquareType);
	const cornersDotType = useQRStore((s) => s.cornersDotType);
	const errorCorrectionLevel = useQRStore((s) => s.errorCorrectionLevel);
	const [previews, setPreviews] = useState<Record<string, string>>({});

	useEffect(() => {
		let cancelled = false;
		const dark = hexToRgbaHex(colorDark);
		const light = hexToRgbaHex(colorLight);

		Promise.all(
			options.map(async (opt) => {
				const url = await generateQRPreview(SAMPLE_DATA, {
					color: { dark, light },
					errorCorrectionLevel,
					shape: storeKey === "shape" ? (opt.value as ShapeType) : shape,
					dotsType: storeKey === "dotsType" ? (opt.value as DotType) : dotsType,
					cornersSquareType:
						storeKey === "cornersSquareType"
							? (opt.value as CornerSquareType)
							: cornersSquareType,
					cornersDotType:
						storeKey === "cornersDotType"
							? (opt.value as CornerDotType)
							: cornersDotType,
				});
				return { value: opt.value, url };
			}),
		).then((results) => {
			if (cancelled) return;
			setPreviews(Object.fromEntries(results.map((r) => [r.value, r.url])));
		});

		return () => {
			cancelled = true;
		};
	}, [
		storeKey,
		options,
		colorDark,
		colorLight,
		shape,
		dotsType,
		cornersSquareType,
		cornersDotType,
		errorCorrectionLevel,
	]);

	const setter = SETTER_MAP[storeKey](useQRStore.getState()) as (v: T) => void;

	return (
		<div className="flex flex-col gap-2">
			<Label>{label}</Label>
			<Carousel opts={{ align: "start" }} className="w-full">
				<CarouselContent className="-ml-2">
					{options.map((opt) => {
						const preview = previews[opt.value];
						const isSelected = value === opt.value;

						return (
							<CarouselItem
								key={opt.value}
								className="basis-1/2 pl-2 sm:basis-1/3"
							>
								<button
									type="button"
									onClick={() => setter(opt.value as T)}
									className={`flex w-full flex-col items-center gap-1.5 rounded-lg border-2 p-2 transition-colors hover:bg-muted/50 ${
										isSelected
											? "border-primary bg-primary/5"
											: "border-transparent hover:border-border"
									}`}
									title={opt.label}
								>
									{preview ? (
										<div className="size-24 overflow-hidden rounded bg-white">
											<Image
												src={preview}
												alt={opt.label}
												width={THUMBNAIL_SIZE}
												height={THUMBNAIL_SIZE}
												className="size-24 object-contain"
												unoptimized
											/>
										</div>
									) : (
										<div className="size-24 animate-pulse rounded bg-muted" />
									)}
									<span className="text-xs text-muted-foreground line-clamp-1 max-w-20 text-center">
										{opt.label}
									</span>
								</button>
							</CarouselItem>
						);
					})}
				</CarouselContent>
				<CarouselPrevious className="-left-2 sm:-left-3" />
				<CarouselNext className="-right-2 sm:-right-3" />
			</Carousel>
		</div>
	);
}) as <T extends string>(props: QRStyleCarouselProps<T>) => React.ReactElement;
