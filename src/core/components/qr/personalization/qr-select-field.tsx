"use client";

import { Info } from "lucide-react";
import React, { memo } from "react";
import { Label } from "@/core/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/core/components/ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/core/components/ui/tooltip";
import { useQRStore } from "@/core/store/qr-store";

interface QRSelectFieldProps<T extends string> {
	label: string;
	description?: string;
	storeKey:
		| "errorCorrectionLevel"
		| "shape"
		| "dotsType"
		| "cornersSquareType"
		| "cornersDotType"
		| "imageFormat";
	options: { value: T; label: string }[];
}

const SETTER_MAP = {
	errorCorrectionLevel: (s: ReturnType<typeof useQRStore.getState>) =>
		s.setErrorCorrectionLevel,
	shape: (s: ReturnType<typeof useQRStore.getState>) => s.setShape,
	dotsType: (s: ReturnType<typeof useQRStore.getState>) => s.setDotsType,
	cornersSquareType: (s: ReturnType<typeof useQRStore.getState>) =>
		s.setCornersSquareType,
	cornersDotType: (s: ReturnType<typeof useQRStore.getState>) =>
		s.setCornersDotType,
	imageFormat: (s: ReturnType<typeof useQRStore.getState>) => s.setImageFormat,
} as const;

export const QRSelectField = memo(function QRSelectField<T extends string>({
	label,
	description,
	storeKey,
	options,
}: QRSelectFieldProps<T>) {
	const value = useQRStore((s) => s[storeKey]) as T;

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-1.5">
				<Label>{label}</Label>
				{description && (
					<Tooltip>
						<TooltipTrigger
							className="cursor-help rounded p-0.5 text-muted-foreground hover:text-foreground"
							aria-label={description}
						>
							<Info className="size-4 shrink-0" />
						</TooltipTrigger>
						<TooltipContent side="top" className="max-w-xs text-balance">
							{description}
						</TooltipContent>
					</Tooltip>
				)}
			</div>
			<Select
				value={value}
				onValueChange={(v) =>
					(SETTER_MAP[storeKey](useQRStore.getState()) as (v: T) => void)(
						v as T,
					)
				}
			>
				<SelectTrigger className="w-full">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{options.map((opt) => (
						<SelectItem key={opt.value} value={opt.value}>
							{opt.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}) as <T extends string>(props: QRSelectFieldProps<T>) => React.ReactElement;
