"use client";

import { memo } from "react";
import { Label } from "@/core/components/ui/label";
import { Slider } from "@/core/components/ui/slider";
import { useThrottledCallback } from "@/core/hooks/use-throttled-callback";
import { WIDTH_MAX, WIDTH_MIN } from "@/core/lib/constants/qrcode-options";
import { useQRStore } from "@/core/store/qr-store";

const SLIDER_THROTTLE_MS = 80;

function sliderValue(
	val: number | readonly number[] | undefined,
	fallback: number,
) {
	return Array.isArray(val) ? val[0] : (val ?? fallback);
}

export const QRWidthSlider = memo(function QRWidthSlider() {
	const width = useQRStore((s) => s.width);
	const setWidth = useQRStore((s) => s.setWidth);
	const throttledSetWidth = useThrottledCallback(setWidth, SLIDER_THROTTLE_MS);

	return (
		<div className="flex flex-col gap-2">
			<Label>Tamaño (px): {width}</Label>
			<Slider
				value={[width]}
				onValueChange={(val) => throttledSetWidth(sliderValue(val, width))}
				min={WIDTH_MIN}
				max={WIDTH_MAX}
				className="w-full"
			/>
		</div>
	);
});
