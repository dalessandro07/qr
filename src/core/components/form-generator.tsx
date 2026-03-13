"use client";

import { QRPersonalizationPanel, QRPreview } from "@/core/components/qr";
import { useQRGenerator } from "@/core/hooks";
import { APP_DESCRIPTION, APP_NAME } from "@/core/lib/constants";

function FormGenerator() {
	const { error } = useQRGenerator();

	return (
		<main className="flex min-h-dvh flex-col px-4 py-6 sm:px-6 lg:px-8">
			<div className="flex w-full flex-1 flex-col lg:flex-row">
				<section className="flex flex-1 flex-col gap-6 py-6 lg:max-w-xl lg:border-r lg:border-border lg:pr-8">
					<header className="flex flex-col gap-1">
						<h1 className="text-xl font-semibold">{APP_NAME}</h1>
						<p className="text-sm text-muted-foreground">{APP_DESCRIPTION}</p>
					</header>
					<div className="flex flex-col gap-6">
						<QRPersonalizationPanel />

						{error && (
							<p className="text-sm text-destructive" role="alert">
								{error}
							</p>
						)}
					</div>
				</section>

				<aside className="flex w-full shrink-0 flex-col border-t border-border py-6 lg:sticky lg:top-6 lg:w-80 lg:self-start lg:border-t-0 lg:border-l lg:pl-8">
					<QRPreview />
				</aside>
			</div>
		</main>
	);
}

export default FormGenerator;
