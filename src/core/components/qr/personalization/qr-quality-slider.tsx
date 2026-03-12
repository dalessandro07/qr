"use client";

import { memo } from "react";
import { Label } from "@/core/components/ui/label";
import { Slider } from "@/core/components/ui/slider";
import { QUALITY_MAX, QUALITY_MIN } from "@/core/lib/constants/qrcode-options";
import { useQRStore } from "@/core/store/qr-store";

function sliderValue(
	val: number | readonly number[] | undefined,
	fallback: number,
) {
	return Array.isArray(val) ? val[0] : (val ?? fallback);
}

export const QRQualitySlider = memo(function QRQualitySlider() {
	const quality = useQRStore((s) => s.quality);
	const imageFormat = useQRStore((s) => s.imageFormat);
	const setQuality = useQRStore((s) => s.setQuality);

	if (imageFormat === "image/png") return null;

	return (
		<div className="flex flex-col gap-2">
			<Label>Calidad: {quality}%</Label>
			<Slider
				value={[quality]}
				onValueChange={(val) => setQuality(sliderValue(val, quality))}
				min={QUALITY_MIN}
				max={QUALITY_MAX}
				className="w-full"
			/>
		</div>
	);
});
