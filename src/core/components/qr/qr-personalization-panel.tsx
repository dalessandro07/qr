"use client";

import { memo } from "react";
import { QRContentInput } from "@/core/components/qr";
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
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/core/components/ui/tabs";
import {
	CORNERS_DOT_OPTIONS,
	CORNERS_SQUARE_OPTIONS,
	DOTS_TYPE_OPTIONS,
	ERROR_CORRECTION_OPTIONS,
	IMAGE_FORMAT_OPTIONS,
	SHAPE_OPTIONS,
} from "@/core/lib/constants/qrcode-options";

const ERROR_CORRECTION_DESCRIPTION =
	"Indica cuánto puede dañarse o ensuciarse el QR y seguir funcionando. Bajo (7%): suficiente para pantallas. Medio (15%): recomendado para uso general. Cuartil (25%) y Alto (30%): ideal para imprimir, etiquetas o cuando el QR puede rayarse o mancharse. A mayor nivel, el QR tendrá más detalles pero resistirá mejor el desgaste.";

const PersonalizationContent = memo(function PersonalizationContent() {
	return (
		<AccordionContent className="flex flex-col gap-4 pt-2">
			<QRContentInput />
			<Tabs defaultValue="size" className="w-full">
				<TabsList className="mb-4 flex w-full flex-wrap">
					<TabsTrigger value="size">Tamaño</TabsTrigger>
					<TabsTrigger value="style">Estilo</TabsTrigger>
					<TabsTrigger value="colors">Colores</TabsTrigger>
				</TabsList>

				<TabsContent value="size" className="flex flex-col gap-4">
					<QRSelectField
						label="Nivel de corrección de errores"
						description={ERROR_CORRECTION_DESCRIPTION}
						storeKey="errorCorrectionLevel"
						options={ERROR_CORRECTION_OPTIONS}
					/>
					<QRWidthSlider />
					<QRMarginSlider />
				</TabsContent>

				<TabsContent value="style" className="flex flex-col gap-4">
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
				</TabsContent>

				<TabsContent value="colors" className="flex flex-col gap-4">
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
				</TabsContent>
			</Tabs>
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
