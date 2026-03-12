"use client";

import Image from "next/image";
import { Button } from "@/core/components/ui/button";
import { Label } from "@/core/components/ui/label";
import { useQRGenerator } from "@/core/hooks";
import { useQRStore } from "@/core/store/qr-store";

export function QRPreview() {
	const { qrCode, download, resetAll, isLoading } = useQRGenerator();
	const { content } = useQRStore();

	const isEmpty = !content?.trim();
	const placeholderText = isEmpty
		? "Ingresa contenido para generar el QR"
		: "Generando...";

	return (
		<div className="flex w-full flex-col gap-4 min-h-64">
			<Label>Vista previa</Label>
			{!qrCode ? (
				<div
					className={`flex flex-1 items-center justify-center bg-muted text-muted-foreground text-sm text-center p-6 ${isLoading ? "animate-pulse" : ""}`}
				>
					{placeholderText}
				</div>
			) : (
				<div className="flex w-full flex-col gap-4">
					<div className="relative w-full aspect-square overflow-hidden bg-muted">
						<Image
							className="object-contain"
							src={qrCode}
							alt="Código QR generado"
							fill
							unoptimized
							sizes="320px"
						/>
					</div>
					<div className="flex flex-col sm:flex-row gap-2 w-full">
						<Button
							type="button"
							onClick={download}
							variant="default"
							className="flex-1"
						>
							Descargar QR
						</Button>
						<Button
							type="button"
							onClick={resetAll}
							variant="outline"
							className="flex-1"
						>
							Empezar de nuevo
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
