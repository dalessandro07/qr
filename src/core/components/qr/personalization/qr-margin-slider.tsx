"use client";

import { memo } from "react";
import { Label } from "@/core/components/ui/label";
import { Slider } from "@/core/components/ui/slider";
import { useThrottledCallback } from "@/core/hooks/use-throttled-callback";
import { MARGIN_MAX, MARGIN_MIN } from "@/core/lib/constants/qrcode-options";
import { useQRStore } from "@/core/store/qr-store";

const SLIDER_THROTTLE_MS = 80;

function sliderValue(
	val: number | readonly number[] | undefined,
	fallback: number,
) {
	return Array.isArray(val) ? val[0] : (val ?? fallback);
}

export const QRMarginSlider = memo(function QRMarginSlider() {
	const margin = useQRStore((s) => s.margin);
	const setMargin = useQRStore((s) => s.setMargin);
	const throttledSetMargin = useThrottledCallback(
		setMargin,
		SLIDER_THROTTLE_MS,
	);

	return (
		<div className="flex flex-col gap-2">
			<Label>Margen: {margin}</Label>
			<Slider
				value={[margin]}
				onValueChange={(val) => throttledSetMargin(sliderValue(val, margin))}
				min={MARGIN_MIN}
				max={MARGIN_MAX}
				className="w-full"
			/>
		</div>
	);
});
