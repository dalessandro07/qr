"use client";

import { memo } from "react";
import { Label } from "@/core/components/ui/label";
import { Textarea } from "@/core/components/ui/textarea";
import { useQRStore } from "@/core/store/qr-store";

export const QRContentInput = memo(function QRContentInput() {
	const content = useQRStore((s) => s.content);

	return (
		<div className="flex flex-col gap-2">
			<Label htmlFor="data-qr-code">Contenido</Label>
			<Textarea
				id="data-qr-code"
				name="data-qr-code"
				value={content}
				onChange={(e) => useQRStore.getState().setContent(e.target.value)}
				placeholder="Ingrese URL, texto, etc."
				className="min-h-24 resize-y"
				rows={3}
			/>
		</div>
	);
});
