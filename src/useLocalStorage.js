import { useState } from "react";

const useLocalStorage = (key, value) => {
	const [stored, setStored] = useState(() => {
		const item = localStorage.getItem(key)
		return item ? JSON.parse(item) : value
	})

	const set = (value) => {
		setStored(value)
		localStorage.setItem(key, JSON.stringify(value))
	}

	return [stored, set];
}

export default useLocalStorage;