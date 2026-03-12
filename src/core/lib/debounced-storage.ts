const DEBOUNCE_MS = 500;

export function createDebouncedStorage(
	storage: Storage,
): Pick<Storage, "getItem" | "setItem" | "removeItem"> {
	let setItemTimeout: ReturnType<typeof setTimeout> | null = null;
	let pendingKey: string | null = null;
	let pendingValue: string | null = null;

	return {
		getItem: (key: string) => storage.getItem(key),
		removeItem: (key: string) => storage.removeItem(key),
		setItem: (key: string, value: string) => {
			pendingKey = key;
			pendingValue = value;

			if (setItemTimeout) clearTimeout(setItemTimeout);

			setItemTimeout = setTimeout(() => {
				if (pendingKey !== null && pendingValue !== null) {
					storage.setItem(pendingKey, pendingValue);
					pendingKey = null;
					pendingValue = null;
				}
				setItemTimeout = null;
			}, DEBOUNCE_MS);
		},
	};
}
