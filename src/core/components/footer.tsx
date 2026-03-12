import Link from "next/link";

export function Footer() {
	return (
		<footer className="mt-auto border-t bg-muted/30 py-4">
			<div className="container mx-auto flex flex-col items-center justify-center gap-1 px-4 text-center text-sm text-muted-foreground sm:flex-row sm:gap-2">
				<span>
					Desarrollado por{" "}
					<Link
						href="https://alessandrorios.com"
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium text-foreground underline-offset-4 hover:underline"
					>
						Alessandro Rios
					</Link>
				</span>
				<span className="hidden sm:inline" aria-hidden>
					·
				</span>
				<span>
					Código abierto en{" "}
					<Link
						href="https://github.com/dalessandro07/qr"
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium text-foreground underline-offset-4 hover:underline"
					>
						GitHub
					</Link>
				</span>
			</div>
		</footer>
	);
}
