import { APP_DESCRIPTION, APP_NAME, APP_URL } from "@/core/lib/constants";

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "WebApplication",
	name: APP_NAME,
	description: APP_DESCRIPTION,
	url: APP_URL,
	applicationCategory: "UtilitiesApplication",
	offers: {
		"@type": "Offer",
		price: "0",
		priceCurrency: "USD",
	},
};

export function JsonLd() {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
}
