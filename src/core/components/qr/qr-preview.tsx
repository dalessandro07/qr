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
		<div className="flex min-h-0 w-full flex-1 flex-col gap-4">
			<Label>Vista previa</Label>
			{!qrCode ? (
				<div
					className={`flex min-h-48 flex-1 items-center justify-center bg-muted p-6 text-center text-sm text-muted-foreground ${isLoading ? "animate-pulse" : ""}`}
				>
					{placeholderText}
				</div>
			) : (
				<div className="flex min-h-0 flex-1 flex-col gap-4">
					<div className="relative w-full aspect-square min-w-0 overflow-hidden bg-muted">
						<Image
							className="object-contain"
							src={qrCode}
							alt="Código QR generado"
							fill
							quality={75}
							sizes="(min-width: 1024px) 672px, 100vw"
						/>
					</div>
					<div className="flex flex-col sm:flex-row gap-2 w-full">
						<Button
							type="button"
							onClick={download}
							variant="default"
							className="min-h-11 flex-1"
						>
							Descargar QR
						</Button>
						<Button
							type="button"
							onClick={resetAll}
							variant="outline"
							className="min-h-11 flex-1"
						>
							Empezar de nuevo
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
