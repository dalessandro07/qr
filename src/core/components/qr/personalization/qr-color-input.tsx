"use client";

import { memo } from "react";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { useQRStore } from "@/core/store/qr-store";

interface QRColorInputProps {
	label: string;
	storeKey: "colorDark" | "colorLight";
	placeholder: string;
}

export const QRColorInput = memo(function QRColorInput({
	label,
	storeKey,
	placeholder,
}: QRColorInputProps) {
	const value = useQRStore((s) => s[storeKey]);
	const store = useQRStore.getState();
	const setter =
		storeKey === "colorDark" ? store.setColorDark : store.setColorLight;

	return (
		<div className="flex flex-col gap-2">
			<Label>{label}</Label>
			<div className="flex gap-2 items-center">
				<Input
					type="color"
					value={value}
					onInput={(e) => setter(e.currentTarget.value)}
					onChange={(e) => setter(e.target.value)}
					className="w-14 h-9 p-1 cursor-pointer"
				/>
				<Input
					type="text"
					value={value}
					onChange={(e) => setter(e.target.value)}
					className="flex-1 font-mono text-sm"
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
});
