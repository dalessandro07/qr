"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { useQRStore } from "@/core/store/qr-store";

const STORE_DEBOUNCE_MS = 150;

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
	const storeValue = useQRStore((s) => s[storeKey]);
	const [localValue, setLocalValue] = useState(storeValue);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const lastFlushedRef = useRef(storeValue);
	const localValueRef = useRef(localValue);
	localValueRef.current = localValue;

	// Solo sincronizar cuando el store cambia externamente (ej. reset)
	useEffect(() => {
		if (storeValue !== lastFlushedRef.current) {
			lastFlushedRef.current = storeValue;
			setLocalValue(storeValue);
		}
	}, [storeValue]);

	const flushToStore = useCallback(
		(value: string) => {
			lastFlushedRef.current = value;
			const store = useQRStore.getState();
			const setter =
				storeKey === "colorDark" ? store.setColorDark : store.setColorLight;
			setter(value);
		},
		[storeKey],
	);

	const handleChange = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			const newValue = (e.target as HTMLInputElement).value;
			setLocalValue(newValue);

			if (debounceRef.current) clearTimeout(debounceRef.current);
			debounceRef.current = setTimeout(() => {
				flushToStore(newValue);
				debounceRef.current = null;
			}, STORE_DEBOUNCE_MS);
		},
		[flushToStore],
	);

	useEffect(
		() => () => {
			if (debounceRef.current) {
				clearTimeout(debounceRef.current);
				flushToStore(localValueRef.current);
			}
		},
		[flushToStore],
	);

	return (
		<div className="flex flex-col gap-2">
			<Label>{label}</Label>
			<div className="flex gap-2 items-center">
				<Input
					type="color"
					value={localValue}
					onInput={handleChange}
					onChange={handleChange}
					className="w-14 h-9 p-1 cursor-pointer"
				/>
				<Input
					type="text"
					value={localValue}
					onChange={handleChange}
					className="flex-1 font-mono text-sm"
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
});
