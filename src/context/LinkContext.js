import { useReducer, createContext } from "react";
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
			return link !== action.payload 
		})
	}
	else if (action.type === CLEAR) {
		return []
	}

	return state;
}

export const LinkProvider = ({ children }) => {
	const [clientStorage, setClientStorage] = useLocalStorage("links", [])

	const [links, dispatch] = useReducer(reducer, clientStorage);

	const addLink = (link) => {
		setClientStorage([...clientStorage, link])
		dispatch({
			type: LINK_ADD,
			payload: link
		});
	};

	const removeLink = (link) => {

		const filtered = clientStorage.filter(clientLink => {
			return link !== clientLink
		})

		setClientStorage([...filtered])
		dispatch({
			type: LINK_REMOVE,
			payload: link
		});
	};

	const clearLinks = () => {
		setClientStorage([])
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