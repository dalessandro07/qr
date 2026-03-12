import { useCallback, useRef } from "react";

/**
 * Throttles callback execution. Uses trailing invocation to ensure
 * the final value is applied when rapid updates stop.
 */
export function useThrottledCallback<
	T extends (...args: Parameters<T>) => void,
>(callback: T, delay: number): T {
	const lastRun = useRef(0);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const pendingArgsRef = useRef<Parameters<T> | null>(null);

	return useCallback(
		((...args: Parameters<T>) => {
			pendingArgsRef.current = args;
			const now = Date.now();
			const timeSinceLastRun = now - lastRun.current;

			const run = () => {
				lastRun.current = Date.now();
				const args = pendingArgsRef.current;
				if (args) {
					callback(...(args as Parameters<T>));
					pendingArgsRef.current = null;
				}
			};

			if (timeSinceLastRun >= delay) {
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current);
					timeoutRef.current = null;
				}
				run();
			} else if (!timeoutRef.current) {
				timeoutRef.current = setTimeout(() => {
					timeoutRef.current = null;
					run();
				}, delay - timeSinceLastRun);
			}
		}) as T,
		[callback, delay],
	);
}
