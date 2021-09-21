import { useReducer, useEffect, createContext } from "react";
import useLocalStorage from "../useLocalStorage";

export const LinkContext = createContext();

const LINK_ADD = "LINK_ADD";
const LINK_REMOVE = "LINK_REMOVE";
const CLEAR = "CLEAR";


const reducer = (state = [], action) => {
	if (action.type === LINK_ADD) {
		return [...state, action.payload]
	}
	else if (action.type === LINK_REMOVE) {
		return state.filter(link => {
			return link.url !== action.payload
		})
	}
	else if (action.type === CLEAR) {
		return []
	}

	return state;
}

export const LinkProvider = ({ children }) => {
	const [storage, setStorage] = useLocalStorage("links", [])

	const [links, dispatch] = useReducer(reducer, storage);

	useEffect(() => {
		setStorage(links)
	}, [links, setStorage])

	const addLink = (link) => {
		dispatch({
			type: LINK_ADD,
			payload: link
		})

	};

	const removeLink = (link) => {
		dispatch({
			type: LINK_REMOVE,
			payload: link
		});
	};

	const clearLinks = () => {
		dispatch({
			type: CLEAR
		});
	}

	return (
		<LinkContext.Provider value={{ links, addLink, removeLink, clearLinks }}>
			{children}
		</LinkContext.Provider>
	); 
};