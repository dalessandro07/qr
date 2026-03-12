"use client";

import { memo } from "react";
import {
	QRColorInput,
	QRMarginSlider,
	QRQualitySlider,
	QRSelectField,
	QRStyleCarousel,
	QRWidthSlider,
} from "@/core/components/qr/personalization";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/core/components/ui/accordion";
import {
	CORNERS_DOT_OPTIONS,
	CORNERS_SQUARE_OPTIONS,
	DOTS_TYPE_OPTIONS,
	ERROR_CORRECTION_OPTIONS,
	IMAGE_FORMAT_OPTIONS,
	SHAPE_OPTIONS,
} from "@/core/lib/constants/qrcode-options";

const PersonalizationContent = memo(function PersonalizationContent() {
	return (
		<AccordionContent className="flex flex-col gap-4 pt-2">
			<QRSelectField
				label="Nivel de corrección de errores"
				storeKey="errorCorrectionLevel"
				options={ERROR_CORRECTION_OPTIONS}
			/>
			<QRWidthSlider />
			<QRMarginSlider />
			<QRStyleCarousel
				label="Forma del QR"
				storeKey="shape"
				options={SHAPE_OPTIONS}
			/>
			<QRStyleCarousel
				label="Tipo de módulos"
				storeKey="dotsType"
				options={DOTS_TYPE_OPTIONS}
			/>
			<QRStyleCarousel
				label="Esquinas del QR"
				storeKey="cornersSquareType"
				options={CORNERS_SQUARE_OPTIONS}
			/>
			<QRStyleCarousel
				label="Puntos de las esquinas"
				storeKey="cornersDotType"
				options={CORNERS_DOT_OPTIONS}
			/>
			<QRColorInput
				label="Color oscuro (módulos)"
				storeKey="colorDark"
				placeholder="#000000"
			/>
			<QRColorInput
				label="Color claro (fondo)"
				storeKey="colorLight"
				placeholder="#ffffff"
			/>
			<QRSelectField
				label="Formato de imagen"
				storeKey="imageFormat"
				options={IMAGE_FORMAT_OPTIONS}
			/>
			<QRQualitySlider />
		</AccordionContent>
	);
});

export const QRPersonalizationPanel = memo(function QRPersonalizationPanel() {
	return (
		<Accordion defaultValue={["personalization"]}>
			<AccordionItem value="personalization">
				<AccordionTrigger>Personalización</AccordionTrigger>
				<PersonalizationContent />
			</AccordionItem>
		</Accordion>
	);
});
